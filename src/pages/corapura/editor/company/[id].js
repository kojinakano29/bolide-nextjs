import styles from '@/styles/corapura/components/editor.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '@/components/corapura/Layout/container';
import { CreateCompanyForm, EditCompanyForm, Loader } from '@/components/corapura';
import axios from '@/lib/axios';
import { zips } from '@/lib/corapura/constants';

export const CompanyContext = createContext()

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/mypage/edit/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const EditCompany = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const profile = posts.c_profile
  const option = posts.c_profile_option
  const tags = profile.c_tags.map((tag) => {
    return tag.name
  })
  const tagStr = tags.join(',')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth'})
  const [disabled, setDisabled] = useState(false)
  const [popup, setPopup] = useState(false)
  const [mode, setMode] = useState("")
  const [type, setType] = useState("")
  const [targetId, setTargetId] = useState()
  const [sns, setSns] = useState(option.c_company_socials)
  const [infos, setInfos] = useState(posts.c_business_informations)
  const [offices, setOffices] = useState(posts.c_offices)
  const [presidents, setPresidents] = useState(posts.c_president)
  const [items, setItems] = useState(posts.c_items)
  const [susts, setSusts] = useState(posts.c_susts)
  const [cards, setCards] = useState(posts.c_cards)
  const [coupons, setCoupons] = useState(posts.c_coupons)
  const [likes, setLikes] = useState(posts.c_likes)
  const [editData, setEditData] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nicename: profile.nicename,
      title: profile.title,
      tag: tagStr,
      zip: profile.zip,
      profile: profile.profile,
      president: option.president,
      maked: option.maked,
      jojo: option.jojo,
      capital: option.capital,
      zipcode: option.zipcode,
      address: option.address,
      tel: option.tel,
      site_url: option.site_url,
      shop_url: option.shop_url,
    },
    mode: "onChange",
  })
  const [preview1, setPreview1] = useState(profile.image1 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image1}` : "")
  const [preview2, setPreview2] = useState(profile.image2 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image2}` : "")
  const [preview3, setPreview3] = useState(profile.image3 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image3}` : "")
  const [previewIcon, setPreviewIcon] = useState(profile.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.thumbs}` : "")

  const previews = [
    preview1,
    preview2,
    preview3,
  ]

  const onLoadCheck = useCallback(async (message, redirect) => {
    alert(message)
    router.push({
      pathname: redirect,
    })

  }, [])

  useEffect(() => {
    if (user && user?.account_type !== 1) {
      if (user?.id !== profile.id) {
        onLoadCheck("このページの閲覧権限がありません。", "/corapura")
      }
    }

    if (user && !user?.c_profile_id) {
      onLoadCheck("プロフィールを作成してください。", `/corapura/editor/create`)
    }
  }, [user])

  const handleChangeImage = useCallback(async (e, num) => {
    const { files } = e.target
    if (files[0]) {
      if (num === 1) {
        setPreview1(window.URL.createObjectURL(files[0]))
      } else if (num === 2) {
        setPreview2(window.URL.createObjectURL(files[0]))
      } else if (num === 3) {
        setPreview3(window.URL.createObjectURL(files[0]))
      } else if (num === 4) {
        setPreviewIcon(window.URL.createObjectURL(files[0]))
      }
    } else {
      if (num === 1) {
        setPreview1("")
      } else if (num === 2) {
        setPreview2("")
      } else if (num === 3) {
        setPreview3("")
      } else if (num === 4) {
        setPreviewIcon("")
      }
    }
  }, [setPreview1, setPreview2, setPreview3, setPreviewIcon])

  const onProfileUpdate = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post(`/api/corapura/mypage/update/${profile.id}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log(res)
    }).catch((e) => {
      console.error(e)
      alert("プロフィールの編集に失敗しました。")
    })
  }, [profile])

  const onCompanyProfileUpdate = useCallback(async (data) => {
    await csrf

    await axios.post(`/api/corapura/mypage/c_company_profile/update/${option.id}`, data)
    .then((res) => {
      // console.log(res)
      alert("プロフィールを編集しました。")
      router.reload()
    }).catch((e) => {
      console.error(e)
    })
  }, [option])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    setDisabled(true)

    await onProfileUpdate({
      user_id: user?.id,
      nicename: data.nicename,
      title: data.title,
      tag: data.tag,
      zip: data.zip,
      profile: data.profile,
      image1: data.image1.length !== 0 ? data.image1[0] : profile.image1,
      image2: data.image2.length !== 0 ? data.image2[0] : profile.image2,
      image3: data.image3.length !== 0 ? data.image3[0] : profile.image3,
      thumbs: data.thumbs.length !== 0 ? data.thumbs[0] : profile.thumbs,
    })

    await onCompanyProfileUpdate({
      c_profile_id: profile.id,
      president: data.president,
      maked: data.maked,
      jojo: data.jojo,
      capital: data.capital,
      zipcode: data.zipcode,
      address: data.address,
      tel: data.tel,
      site_url: data.site_url,
      shop_url: data.shop_url,
    })

    await setDisabled(false)
  }, [setDisabled, onProfileUpdate, onCompanyProfileUpdate, user, profile])

  const handleClickCreate = async (type) => {
    setMode("create")
    setPopup(prevState => !prevState)
    setType(type)
  }

  const handleClickEdit = async (type, id) => {
    setMode("edit")
    setPopup(prevState => !prevState)
    setType(type)
    setTargetId(id)

    if (disabled) return
    setDisabled(true)
    await csrf()

    if (type === "business_information") {
      await axios.post(`/api/corapura/businessinformation/edit/${id}`)
      .then((res) => {
        // console.log(res)
        setEditData(res.data)
      }).catch(e => console.error(e))
    } else if (type === "office") {
      await axios.post(`/api/corapura/office/edit/${id}`)
      .then((res) => {
        // console.log(res.data)
        setEditData(res.data)
      }).catch(e => console.error(e))
    } else if (type === "president") {
      await axios.post(`/api/corapura/president/edit/${id}`)
      .then((res) => {
        // console.log(res.data)
        setEditData(res.data)
      }).catch(e => console.error(e))
    } else if (type === "item") {
      await axios.post(`/api/corapura/item/edit/${id}`)
      .then((res) => {
        // console.log(res.data)
        setEditData(res.data)
      }).catch(e => console.error(e))
    } else if (type === "sust") {
      await axios.post(`/api/corapura/sust/edit/${id}`)
      .then((res) => {
        // console.log(res.data)
        setEditData(res.data)
      }).catch(e => console.error(e))
    } else if (type === "card") {
      await axios.post(`/api/corapura/card/edit/${id}`)
      .then((res) => {
        // console.log(res.data)
        setEditData(res.data)
      }).catch(e => console.error(e))
    } else if (type === "coupon") {
      await axios.post(`/api/corapura/coupon/edit/${id}`)
      .then((res) => {
        // console.log(res.data)
        setEditData(res.data)
      }).catch(e => console.error(e))
    } else if (type === "like") {
      await axios.post(`/api/corapura/like/edit/${id}`)
      .then((res) => {
        // console.log(res.data)
        setEditData(res.data)
      }).catch(e => console.error(e))
    } else if (type === "sns") {
      await axios.post(`/api/corapura/mypage/c_company_social/edit/${id}`)
      .then((res) => {
        // console.log(res)
        setEditData(res.data)
      }).catch(e => console.error(e))
    }

    await setDisabled(false)
  }

  const handleClickDelete = async (type, id) => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    if (type === "business_information") {
      await axios.delete(`/api/corapura/businessinformation/delete`, {
        data: {
          c_business_information_id: id,
          c_profile_id: profile.id,
        }
      }).then((res) => {
        // console.log(res)
        alert("削除しました。")
        setInfos(res.data)
      }).catch((e) => {
        console.error(e)
        alert("削除できませんでした。")
      })
    } else if (type === "office") {
      await axios.delete(`/api/corapura/office/delete`, {
        data: {
          c_office_id: id,
          c_profile_id: profile.id,
        }
      }).then((res) => {
        // console.log(res)
        alert("削除しました。")
        setOffices(res.data)
      }).catch((e) => {
        console.error(e)
        alert("削除できませんでした。")
      })
    } else if (type === "president") {
      await axios.delete(`/api/corapura/president/delete`, {
        data: {
          c_president_id: id,
          c_profile_id: profile.id,
        }
      }).then((res) => {
        // console.log(res)
        alert("削除しました。")
        setPresidents(res.data)
      }).catch((e) => {
        console.error(e)
        alert("削除できませんでした。")
      })
    } else if (type === "item") {
      await axios.delete(`/api/corapura/item/delete`, {
        data: {
          c_item_id: id,
          c_profile_id: profile.id,
        }
      }).then((res) => {
        // console.log(res)
        alert("削除しました。")
        setItems(res.data)
      }).catch((e) => {
        console.error(e)
        alert("削除できませんでした。")
      })
    } else if (type === "sust") {
      await axios.delete(`/api/corapura/sust/delete`, {
        data: {
          c_sust_id: id,
          c_profile_id: profile.id,
        }
      }).then((res) => {
        // console.log(res)
        alert("削除しました。")
        setSusts(res.data)
      }).catch((e) => {
        console.error(e)
        alert("削除できませんでした。")
      })
    } else if (type === "card") {
      await axios.delete(`/api/corapura/card/delete`, {
        data: {
          c_card_id: id,
          c_profile_id: profile.id,
        }
      }).then((res) => {
        // console.log(res)
        alert("削除しました。")
        setCards(res.data)
      }).catch((e) => {
        console.error(e)
        alert("削除できませんでした。")
      })
    } else if (type === "coupon") {
      await axios.delete(`/api/corapura/coupon/delete`, {
        data: {
          c_coupon_id: id,
          c_profile_id: profile.id,
        }
      }).then((res) => {
        // console.log(res)
        alert("削除しました。")
        setCoupons(res.data)
      }).catch((e) => {
        console.error(e)
        alert("削除できませんでした。")
      })
    } else if (type === "like") {
      await axios.delete(`/api/corapura/like/delete`, {
        data: {
          c_like_id: id,
          c_profile_id: profile.id,
        }
      }).then((res) => {
        // console.log(res)
        alert("削除しました。")
        setLikes(res.data)
      }).catch((e) => {
        console.error(e)
        alert("削除できませんでした。")
      })
    } else if (type === "sns") {
      await axios.delete(`api/corapura/mypage/c_company_social/delete`, {
        data: {
          c_company_social_id: id,
          c_profile_id: profile.id,
        }
      }).then((res) => {
        // console.log(res)
        alert("削除しました。")
        setSns(res.data)
      }).catch((e) => {
        console.error(e)
        alert("削除できませんでした。")
      })
    }

    await setDisabled(false)
  }

  return (
    <>
      <section className="cont1">
        <Container small>
          {user ?
            <form onSubmit={handleSubmit(onSubmit)}>
              <article className={styles.profileFlex}>
                <div className={styles.profileLeft}>
                  {previews.map((preview, index) => (
                    <div key={index}>
                      <div className={styles.imgBox} key={index}>
                        {preview ? <img src={preview} alt="" /> : null}
                      </div>
                      <label className={`hoverEffect ${styles.fileBtn}`}>
                        ファイルから画像を選択
                        <span>アップロード</span>
                        <input
                          type="file"
                          accept="image/*"
                          {...register(`image${index+1}`)}
                          onChange={(e) => handleChangeImage(e, index+1)}
                        />
                      </label>
                    </div>
                  ))}
                </div>
                <div className={styles.profileRight}>
                  <div className={styles.iconFlex}>
                    <div className={styles.iconBox}>
                      {previewIcon ? <img src={previewIcon} alt="" /> : null}
                    </div>
                    <label className={`hoverEffect ${styles.fileBtn}`}>
                      ファイルから画像を選択
                      <span>アップロード</span>
                      <input
                        type="file"
                        accept="image/*"
                        {...register("thumbs")}
                        onChange={(e) => handleChangeImage(e, 4)}
                        />
                    </label>
                  </div>
                  <dl>
                    <dt>
                      <label htmlFor="nicename">企業名を入力ください</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="nicename"
                        {...register("nicename", {required: true})}
                      />
                      {errors.nicename && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="title">業種を入力ください</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="title"
                        {...register("title", {required: true})}
                      />
                      {errors.title && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="tag">業種に合ったタグを入力ください</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="tag"
                        {...register("tag", {required: true})}
                      />
                      {errors.tag && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="profile">事業内容を入力ください</label>
                    </dt>
                    <dd>
                      <textarea id="profile" {...register("profile", {required: true})}></textarea>
                      {errors.profile && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="president">代表者</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="president"
                        {...register("president")}
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="maked">設立</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="maked"
                        {...register("maked")}
                        placeholder="昭和0年0月"
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>上場・非上場</dt>
                    <dd>
                      <select {...register("jojo")}>
                        <option value="非上場">非上場</option>
                        <option value="上場">上場</option>
                      </select>
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="capital">資本金</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="capital"
                        {...register("capital")}
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>本社所在地</dt>
                    <dd>
                      <select {...register("zip")}>
                        {zips.map((zip, index) => (
                          <option value={zip} key={index}>{zip}</option>
                        ))}
                      </select>
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="zipcode">郵便番号</label>
                    </dt>
                    <dd>
                      <input
                        type="number"
                        id="zipcode"
                        {...register("zipcode")}
                        placeholder="0000000"
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="address">住所</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="address"
                        {...register("address")}
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="tel">電話番号</label>
                    </dt>
                    <dd>
                      <input
                        type="tel"
                        id="tel"
                        {...register("tel")}
                        placeholder="00000000000"
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="site_url">コーポレートサイトURL</label>
                    </dt>
                    <dd>
                      <input
                        type="url"
                        id="site_url"
                        {...register("site_url")}
                        placeholder="https://example.com"
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="shop_url">ECサイトURL</label>
                    </dt>
                    <dd>
                      <input
                        type="url"
                        id="shop_url"
                        {...register("shop_url")}
                        placeholder="https://example.com"
                      />
                    </dd>
                  </dl>
                </div>
              </article>
              <div className={styles.submitFlex}>
                <button
                  className={`${styles.submitBtn} hoverEffect`}
                  disabled={disabled}
                >編集</button>
              </div>
            </form>
          : <Loader />}
        </Container>
      </section>

      {user ?
        <section className={styles.editorArea}>
          <Container small>
            <div className={styles.editorBox}>
              <div className={styles.ttlFlex}>
                <h4 className={styles.ttl2}>SNSリンク先</h4>
                <button
                  type="button"
                  className={`${styles.btn} hoverEffect`}
                  onClick={() => handleClickCreate("sns")}
                >新規作成</button>
              </div>
              <article className={styles.listBox}>
                {sns?.map((sns, index) => (
                  <div className={styles.list} key={index}>
                    <p className={styles.txt}>{sns.name}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={`${styles.btn} hoverEffect`}
                        onClick={() => handleClickEdit("sns", sns.id)}
                      >編集</button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleClickDelete("sns", sns.id)}
                      >削除</button>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <div className={styles.editorBox}>
              <div className={styles.ttlFlex}>
                <h4 className={styles.ttl2}>ビジネスインフォメーション</h4>
                <button
                  type="button"
                  className={`${styles.btn} hoverEffect`}
                  onClick={() => handleClickCreate("business_information")}
                >新規作成</button>
              </div>
              <article className={styles.listBox}>
                {infos?.map((info, index) => (
                  <div className={styles.list} key={index}>
                    <p className={styles.txt}>{info.title}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={`${styles.btn} hoverEffect`}
                        onClick={() => handleClickEdit("business_information", info.id)}
                      >編集</button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleClickDelete("business_information", info.id)}
                      >削除</button>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <div className={styles.editorBox}>
              <div className={styles.ttlFlex}>
                <h4 className={styles.ttl2}>事務所・店舗</h4>
                <button
                  type="button"
                  className={`${styles.btn} hoverEffect`}
                  onClick={() => handleClickCreate("office")}
                >新規作成</button>
              </div>
              <article className={styles.listBox}>
                {offices?.map((office, index) => (
                  <div className={styles.list} key={index}>
                    <p className={styles.txt}>{office.title}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={`${styles.btn} hoverEffect`}
                        onClick={() => handleClickEdit("office", office.id)}
                      >編集</button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleClickDelete("office", office.id)}
                      >削除</button>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <div className={styles.editorBox}>
              <div className={styles.ttlFlex}>
                <h4 className={styles.ttl2}>プレジデント</h4>
                {presidents.length === 0 ?
                  <button
                    type="button"
                    className={`${styles.btn} hoverEffect`}
                    onClick={() => handleClickCreate("president")}
                  >新規作成</button>
                : null}
              </div>
              <article className={styles.listBox}>
                {presidents?.map((president, index) => (
                  <div className={styles.list} key={index}>
                    <p className={styles.txt}>{president.title}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={`${styles.btn} hoverEffect`}
                        onClick={() => handleClickEdit("president", president.id)}
                      >編集</button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleClickDelete("president", president.id)}
                      >削除</button>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <div className={styles.editorBox}>
              <div className={styles.ttlFlex}>
                <h4 className={styles.ttl2}>NFT/製品・商品・特許・技術</h4>
                <button
                  type="button"
                  className={`${styles.btn} hoverEffect`}
                  onClick={() => handleClickCreate("item")}
                >新規作成</button>
              </div>
              <article className={styles.listBox}>
                {items?.map((item, index) => (
                  <div className={styles.list} key={index}>
                    <p className={styles.txt}>{item.title}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={`${styles.btn} hoverEffect`}
                        onClick={() => handleClickEdit("item", item.id)}
                      >編集</button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleClickDelete("item", item.id)}
                      >削除</button>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <div className={styles.editorBox}>
              <div className={styles.ttlFlex}>
                <h4 className={styles.ttl2}>SDGs</h4>
                <button
                  type="button"
                  className={`${styles.btn} hoverEffect`}
                  onClick={() => handleClickCreate("sust")}
                >新規作成</button>
              </div>
              <article className={styles.listBox}>
                {susts?.map((sust, index) => (
                  <div className={styles.list} key={index}>
                    <p className={styles.txt}>{sust.title}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={`${styles.btn} hoverEffect`}
                        onClick={() => handleClickEdit("sust", sust.id)}
                      >編集</button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleClickDelete("sust", sust.id)}
                      >削除</button>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <div className={styles.editorBox}>
              <div className={styles.ttlFlex}>
                <h4 className={styles.ttl2}>名刺</h4>
                <button
                  type="button"
                  className={`${styles.btn} hoverEffect`}
                  onClick={() => handleClickCreate("card")}
                >新規作成</button>
              </div>
              <article className={styles.listBox}>
                {cards?.map((card, index) => (
                  <div className={styles.list} key={index}>
                    <p className={styles.txt}>{card.title}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={`${styles.btn} hoverEffect`}
                        onClick={() => handleClickEdit("card", card.id)}
                      >編集</button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleClickDelete("card", card.id)}
                      >削除</button>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <div className={styles.editorBox}>
              <div className={styles.ttlFlex}>
                <h4 className={styles.ttl2}>クーポン</h4>
                <button
                  type="button"
                  className={`${styles.btn} hoverEffect`}
                  onClick={() => handleClickCreate("coupon")}
                >新規作成</button>
              </div>
              <article className={styles.listBox}>
                {coupons?.map((coupon, index) => (
                  <div className={styles.list} key={index}>
                    <p className={styles.txt}>{coupon.title}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={`${styles.btn} hoverEffect`}
                        onClick={() => handleClickEdit("coupon", coupon.id)}
                      >編集</button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleClickDelete("coupon", coupon.id)}
                      >削除</button>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <div className={styles.editorBox}>
              <div className={styles.ttlFlex}>
                <h4 className={styles.ttl2}>スポンサー・マスコット</h4>
                <button
                  type="button"
                  className={`${styles.btn} hoverEffect`}
                  onClick={() => handleClickCreate("like")}
                >新規作成</button>
              </div>
              <article className={styles.listBox}>
                {likes?.map((like, index) => (
                  <div className={styles.list} key={index}>
                    <p className={styles.txt}>{like.title}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={`${styles.btn} hoverEffect`}
                        onClick={() => handleClickEdit("like", like.id)}
                      >編集</button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleClickDelete("like", like.id)}
                      >削除</button>
                    </div>
                  </div>
                ))}
              </article>
            </div>
          </Container>
        </section>
      : null}

      {popup ?
        <CompanyContext.Provider value={{
          profile,
          option,
          type,
          targetId,
          setSns,
          setInfos,
          setOffices,
          setPresidents,
          setItems,
          setSusts,
          setCards,
          setCoupons,
          setLikes,
          handleClickCreate,
          handleClickEdit,
          disabled,
          setDisabled,
          editData,
          setEditData,
        }}>
          {mode === "create" ? <CreateCompanyForm /> : <EditCompanyForm />}
        </CompanyContext.Provider>
      : null}
    </>
  );
}

export default EditCompany;

EditCompany.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}