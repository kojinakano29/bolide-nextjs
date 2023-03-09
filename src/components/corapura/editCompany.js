import styles from '@/styles/corapura/components/editor.module.scss'
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import { CompanyContext } from '@/pages/corapura/editor/company/[id]';
import Container from './Layout/container';
import { Loader } from '@/components/corapura';
import { socialNetworkingService } from '@/lib/corapura/constants';

const EditCompanyForm = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const {
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
  } = useContext(CompanyContext)

  const [preview, setPreview] = useState()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: "onChange",
  })

  const onLoadDefault = async () => {
    if (type === "business_information") {
      setValue("infoTitle", editData.title)
      setValue("infoLink", editData.link)
    } else if (type === "office") {
      setValue("officeTitle", editData.title)
      setValue("officeCategory", editData.category)
      setValue("officeContent", editData.content)
    } else if (type === "president") {
      setValue("presidentTitle", editData.title)
      setValue("presidentTxt", editData.top_text)
      setValue("presidentContent", editData.content)
      setPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${editData.thumbs}`)
    } else if (type === "item") {
      setValue("itemTitle", editData.title)
      setValue("itemCategory", editData.category)
      setPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${editData.thumbs}`)
    } else if (type === "sust") {
      setValue("sustTitle", editData.title)
      setPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${editData.thumbs}`)
    } else if (type === "card") {
      setValue("cardTitle", editData.title)
      setPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${editData.thumbs}`)
    } else if (type === "coupon") {
      setValue("couponTitle", editData.title)
      setValue("couponLimit", editData.limit)
      setPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${editData.thumbs}`)
    } else if (type === "like") {
      setValue("likeTitle", editData.title)
      setValue("likeTxt", editData.text)
      setPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${editData.thumbs}`)
    } else if (type === "sns") {
      setValue("snsName", editData.name)
      setValue("snsUrl", editData.url)
    }
  }

  useEffect(() => {
    if (!disabled) {
      onLoadDefault()
    }
  }, [disabled])

  const onSubmitBusinessInformation = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/corapura/businessinformation/update/${targetId}`, {
      c_profile_id: profile.id,
      title: data.infoTitle,
      link: data.infoLink
    }).then((res) => {
      // console.log(res)
      setInfos(res.data)
      alert("編集しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("編集できませんでした。")
    })

    await setDisabled(false)
  }

  const onSubmitOffice = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/corapura/office/update/${targetId}`, {
      c_profile_id: profile.id,
      title: data.officeTitle,
      category: data.officeCategory,
      content: data.officeContent,
    }).then((res) => {
      // console.log(res)
      setOffices(res.data)
      alert("編集しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("編集できませんでした。")
    })

    await setDisabled(false)
  }

  const onSubmitPresident = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    const datas = {
      c_profile_id: profile.id,
      title: data.presidentTitle,
      top_text: data.presidentTxt,
      content: data.presidentContent,
      thumbs: data.presidentThumbs && data.presidentThumbs?.length !== 0 ? data.presidentThumbs[0] : editData.thumbs,
    }

    const params = new FormData();
    Object.keys(datas).forEach(function(key) {
      params.append(key, this[key])
    }, datas)

    await axios.post(`/api/corapura/president/update/${targetId}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      // console.log(res)
      setPresidents(res.data)
      alert("編集しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("編集できませんでした。")
    })

    await setDisabled(false)
  }

  const onSubmitItem = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    const datas = {
      c_profile_id: profile.id,
      title: data.itemTitle,
      category: data.itemCategory,
      thumbs: data.itemThumbs && data.itemThumbs?.length !== 0 ? data.itemThumbs[0] : editData.thumbs,
    }

    const params = new FormData();
    Object.keys(datas).forEach(function(key) {
      params.append(key, this[key])
    }, datas)

    await axios.post(`/api/corapura/item/update/${targetId}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      // console.log(res)
      setItems(res.data)
      alert("編集しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("編集できませんでした。")
    })

    await setDisabled(false)
  }

  const onSubmitSust = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    const datas = {
      c_profile_id: profile.id,
      title: data.sustTitle,
      thumbs: data.sustThumbs && data.sustThumbs?.length !== 0 ? data.sustThumbs[0] : editData.thumbs,
    }

    const params = new FormData();
    Object.keys(datas).forEach(function(key) {
      params.append(key, this[key])
    }, datas)

    await axios.post(`/api/corapura/sust/update/${targetId}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      // console.log(res)
      setSusts(res.data)
      alert("編集しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("編集できませんでした。")
    })

    await setDisabled(false)
  }

  const onSubmitCard = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    const datas = {
      c_profile_id: profile.id,
      title: data.cardTitle,
      thumbs: data.cardThumbs && data.cardThumbs?.length !== 0 ? data.cardThumbs[0] : editData.thumbs,
    }

    const params = new FormData();
    Object.keys(datas).forEach(function(key) {
      params.append(key, this[key])
    }, datas)

    await axios.post(`/api/corapura/card/update/${targetId}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      // console.log(res)
      setCards(res.data)
      alert("編集しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("編集できませんでした。")
    })

    await setDisabled(false)
  }

  const onSubmitCoupon = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    const datas = {
      c_profile_id: profile.id,
      title: data.couponTitle,
      limit: data.couponLimit,
      thumbs: data.couponThumbs && data.couponThumbs?.length !== 0 ? data.couponThumbs[0] : editData.thumbs,
    }

    const params = new FormData();
    Object.keys(datas).forEach(function(key) {
      params.append(key, this[key])
    }, datas)

    await axios.post(`/api/corapura/coupon/update/${targetId}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      // console.log(res)
      setCoupons(res.data)
      alert("編集しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("編集できませんでした。")
    })

    await setDisabled(false)
  }

  const onSubmitLike = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    const datas = {
      c_profile_id: profile.id,
      title: data.likeTitle,
      text: data.likeTxt,
      thumbs: data.likeThumbs && data.likeThumbs?.length !== 0 ? data.likeThumbs[0] : editData.thumbs,
    }

    const params = new FormData();
    Object.keys(datas).forEach(function(key) {
      params.append(key, this[key])
    }, datas)

    await axios.post(`/api/corapura/like/update/${targetId}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      // console.log(res)
      setLikes(res.data)
      alert("編集しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("編集できませんでした。")
    })

    await setDisabled(false)
  }

  const onSubmitSns = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/corapura/mypage/c_company_social/update/${targetId}`, {
      c_company_profile_id: option.id,
      name: data.snsName,
      url: data.snsUrl,
    }).then((res) => {
      // console.log(res)
      setSns(res.data)
      alert("編集しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("編集できませんでした。")
    })

    await setDisabled(false)
  }

  const handleChangeFile = useCallback((e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview(window.URL.createObjectURL(files[0]))
    } else {
      setPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${editData.thumbs}`)
    }
  }, [setPreview])

  return (
    <section className={styles.popupArea} onClick={() => handleClickCreate(type)}>
      <Container small900>
        <div className={styles.popupBox} onClick={(e) => e.stopPropagation()}>
          <h4 className={styles.midashi}>
            {type === "sns" ? "SNSリンク先" : null}
            {type === "business_information" ? "ニュース/イベント" : null}
            {type === "office" ? "事務所・店舗" : null}
            {type === "president" ? "プレジデント/リーダー" : null}
            {type === "item" ? "NFT/製品・商品・特許・技術" : null}
            {type === "sust" ? "SDGs" : null}
            {type === "card" ? "名刺" : null}
            {type === "coupon" ? "クーポン" : null}
            {type === "like" ? "スポンサー・マスコット" : null}
            編集
          </h4>
          {disabled ? <Loader /> :
            <article className={styles.formArea}>
              {/* SNS */}
              {type === "sns" ?
                <form onSubmit={handleSubmit(onSubmitSns)}>
                  <dl>
                    <dt>
                      <label htmlFor="snsName">SNS名</label>
                    </dt>
                    <dd>
                      <select {...register("snsName")}>
                        {socialNetworkingService.map((name, index) => (
                          <option value={name} key={index}>{name}</option>
                        ))}
                      </select>
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="snsUrl">リンク先</label>
                    </dt>
                    <dd>
                      <input
                        type="url"
                        id="snsUrl"
                        {...register("snsUrl", {required: true})}
                      />
                      {errors.snsUrl && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* SNS */}

              {/* ニュース/イベント編集 */}
              {type === "business_information" ?
                <form onSubmit={handleSubmit(onSubmitBusinessInformation)}>
                  <dl>
                    <dt>
                      <label htmlFor="infoTitle">記事タイトル</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="infoTitle"
                        {...register("infoTitle", {required: true})}
                      />
                      {errors.infoTitle && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="infoLink">リンク先</label>
                    </dt>
                    <dd>
                      <input
                        type="url"
                        id="infoLink"
                        {...register("infoLink", {required: true})}
                        placeholder="https://example.com/"
                      />
                      {errors.infoLink && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* ニュース/イベント編集 */}

              {/* 事務所・店舗編集 */}
              {type === "office" ?
                <form onSubmit={handleSubmit(onSubmitOffice)}>
                  <dl>
                    <dt>
                      <label htmlFor="officeTitle">事務所・店舗名</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="officeTitle"
                        {...register("officeTitle", {required: true})}
                      />
                      {errors.officeTitle && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="officeCategory">業種</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="officeCategory"
                        {...register("officeCategory", {required: true})}
                      />
                      {errors.officeCategory && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="officeContent">住所</label>
                    </dt>
                    <dd>
                      <textarea
                        id="officeContent"
                        {...register("officeContent", {required: true})}
                        placeholder={`〒000-0000
  ○○県○○市○○区○○
  TEL:000-0000-0000`}
                      ></textarea>
                      {errors.officeContent && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* 事務所・店舗編集 */}

              {/* プレジデント/リーダー編集 */}
              {type === "president" ?
                <form onSubmit={handleSubmit(onSubmitPresident)}>
                  <dl>
                    <dt>
                      <label htmlFor="presidentTitle">タイトル</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="presidentTitle"
                        {...register("presidentTitle", {required: true})}
                      />
                      {errors.presidentTitle && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="presidentTxt">文章</label>
                    </dt>
                    <dd>
                      <textarea id="presidentTxt" {...register("presidentTxt", {required: true})}></textarea>
                      {errors.presidentTxt && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="presidentContent">詳細文章</label>
                    </dt>
                    <dd>
                      <textarea id="presidentContent" {...register("presidentContent", {required: true})}></textarea>
                      {errors.presidentContent && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="presidentThumbs">写真</label>
                    </dt>
                    <dd>
                      <div className={styles.imgBox}>
                        {preview ? <img src={preview} alt="" /> : <div className={styles.imgNone}></div>}
                      </div>
                      <input
                        type="file"
                        id="presidentThumbs"
                        accept="image/*"
                        {...register("presidentThumbs")}
                        onChange={handleChangeFile}
                      />
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* プレジデント/リーダー編集 */}

              {/* NFT/製品・商品・特許・技術編集 */}
              {type === "item" ?
                <form onSubmit={handleSubmit(onSubmitItem)}>
                  <dl>
                    <dt>
                      <label htmlFor="itemTitle">タイトル</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="itemTitle"
                        {...register("itemTitle", {required: true})}
                      />
                      {errors.itemTitle && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>業種</dt>
                    <dd>
                      <select {...register("itemCategory")}>
                        <option value="製品">製品</option>
                        <option value="商品">商品</option>
                        <option value="特許">特許</option>
                        <option value="技術">技術</option>
                      </select>
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="itemThumbs">写真</label>
                    </dt>
                    <dd>
                      <div className={styles.imgBox}>
                        {preview ? <img src={preview} alt="" /> : <div className={styles.imgNone}></div>}
                      </div>
                      <input
                        type="file"
                        id="itemThumbs"
                        accept="image/*"
                        {...register("itemThumbs")}
                        onChange={handleChangeFile}
                      />
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* NFT/製品・商品・特許・技術編集 */}

              {/* SDGs */}
              {type === "sust" ?
                <form onSubmit={handleSubmit(onSubmitSust)}>
                  <dl>
                    <dt>
                      <label htmlFor="sustTitle">タイトル</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="sustTitle"
                        {...register("sustTitle", {required: true})}
                      />
                      {errors.sustTitle && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="sustThumbs">写真</label>
                    </dt>
                    <dd>
                      <div className={styles.imgBox}>
                        {preview ? <img src={preview} alt="" /> : <div className={styles.imgNone}></div>}
                      </div>
                      <input
                        type="file"
                        id="sustThumbs"
                        accept="image/*"
                        {...register("sustThumbs")}
                        onChange={handleChangeFile}
                      />
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* SDGs */}

              {/* 名刺 */}
              {type === "card" ?
                <form onSubmit={handleSubmit(onSubmitCard)}>
                  <dl>
                    <dt>
                      <label htmlFor="cardTitle">タイトル</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="cardTitle"
                        {...register("cardTitle", {required: true})}
                      />
                      {errors.cardTitle && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="cardThumbs">写真</label>
                    </dt>
                    <dd>
                      <div className={styles.imgBox}>
                        {preview ? <img src={preview} alt="" /> : <div className={styles.imgNone}></div>}
                      </div>
                      <p className={styles.reco_size}>推奨画像サイズ：352×208</p>
                      <input
                        type="file"
                        id="cardThumbs"
                        accept="image/*"
                        {...register("cardThumbs")}
                        onChange={handleChangeFile}
                      />
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* 名刺 */}

              {/* クーポン編集 */}
              {type === "coupon" ?
                <form onSubmit={handleSubmit(onSubmitCoupon)}>
                  <dl>
                    <dt>
                      <label htmlFor="couponTitle">タイトル</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="couponTitle"
                        {...register("couponTitle", {required: true})}
                      />
                      {errors.couponTitle && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="couponLimit">期限</label>
                    </dt>
                    <dd>
                      <input
                        type="date"
                        id="couponLimit"
                        {...register("couponLimit", {required: true})}
                      />
                      {errors.couponLimit && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="couponThumbs">写真</label>
                    </dt>
                    <dd>
                      <div className={styles.imgBox}>
                        {preview ? <img src={preview} alt="" /> : <div className={styles.imgNone}></div>}
                      </div>
                      <p className={styles.reco_size}>推奨画像サイズ：352×198</p>
                      <input
                        type="file"
                        id="couponThumbs"
                        accept="image/*"
                        {...register("couponThumbs")}
                        onChange={handleChangeFile}
                      />
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* クーポン編集 */}

              {/* スポンサー・マスコット編集 */}
              {type === "like" ?
                <form onSubmit={handleSubmit(onSubmitLike)}>
                  <dl>
                    <dt>
                      <label htmlFor="likeTitle">タイトル</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="likeTitle"
                        {...register("likeTitle", {required: true})}
                      />
                      {errors.likeTitle && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="likeTxt">紹介文</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="likeTxt"
                        {...register("likeTxt", {required: true})}
                      />
                      {errors.likeTxt && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="likeThumbs">写真</label>
                    </dt>
                    <dd>
                      <div className={styles.imgBox}>
                        {preview ? <img src={preview} alt="" /> : <div className={styles.imgNone}></div>}
                      </div>
                      <p className={styles.reco_size}>推奨画像サイズ：198×198</p>
                      <input
                        type="file"
                        id="likeThumbs"
                        accept="image/*"
                        {...register("likeThumbs")}
                        onChange={handleChangeFile}
                      />
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* スポンサー・マスコット編集 */}
            </article>
          }
        </div>
      </Container>
    </section>
  );
}

export default EditCompanyForm;