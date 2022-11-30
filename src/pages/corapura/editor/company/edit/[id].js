import styles from '@/styles/corapura/components/editor.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '@/components/corapura/Layout/container';
import { Loader } from '@/components/corapura';
import axios from '@/lib/axios';
import { zips } from '@/lib/corapura/constants';

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
  console.log(posts)
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
  const [preview1, setPreview1] = useState(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image1}`)
  const [preview2, setPreview2] = useState(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image2}`)
  const [preview3, setPreview3] = useState(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image3}`)
  const [previewIcon, setPreviewIcon] = useState(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.thumbs}`)

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
      onLoadCheck("このページの閲覧権限がありません。", "/corapura")
    }

    if (user && !user?.c_profile_id) {
      onLoadCheck("プロフィールを作成してください。", `/corapura/editor/company/create`)
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
  }, [setPreview1, setPreview2, setPreview3])

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
      console.log(res)
      alert("プロフィールを作成しました。")
      router.reload()
    }).catch((e) => {
      console.error(e)
      alert("プロフィールの作成に失敗しました。")
    })
  }, [profile])

  const onCompanyProfileUpdate = useCallback(async (data) => {
    await csrf

    await axios.post(`/api/corapura/mypage/c_company_profile/update/${option.id}`, data)
    .then((res) => {
      console.log(res)
    }).catch((e) => {
      console.error(e)
    })
  }, [option])

  const onSubmit = useCallback(async (data) => {
    console.log(data)
    setDisabled(true)

    onProfileUpdate({
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

    onCompanyProfileUpdate({
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

  return (
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
  );
}

export default EditCompany;

EditCompany.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}