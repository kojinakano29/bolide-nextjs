import styles from '@/styles/dellamall/components/adminForm.module.scss'
import { OfficialContext } from "@/pages/dellamall/admin/shop/official/[id]";
import { useCallback, useContext, useEffect, useState } from "react";
import Container from './Layouts/container';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import { Loader } from '@/components/dellamall';

const EditOfficial = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const {
    shop,
    type,
    setOverviews,
    setCoupons,
    setSocials,
    setInfos,
    setInstagram,
    setItems,
    handleClickCreate,
    handleClickEdit,
    disabled,
    setDisabled,
    setEditData,
    editData,
  } = useContext(OfficialContext)

  const [preview, setPreview] = useState()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: "onChange",
  })

  const onLoadDefault = async () => {
    if (type === "overview") {
      setValue("overviewItem", editData.title)
      setValue("overviewContent", editData.content)
    } else if (type === "coupon") {
      setValue("couponContent", editData.title)
      setValue("couponPrice", editData.content)
      setValue("couponLimit", editData.limit)
    } else if (type === "info") {
      setValue("infoDate", editData.title)
      setValue("infoContent", editData.content)
    } else if (type === "instagram") {
      setValue("instagramAccount", editData.account_name)
      setValue("instagramUser", editData.user_name)
      setValue("instagramToken", editData.api_token)
    } else if (type === "item") {
      setValue("itemName", editData.title)
      setValue("itemPrice", editData.price)
      setPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${editData.thumbs}`)
    }
  }

  useEffect(() => {
    if (!disabled) {
      onLoadDefault()
    }
  }, [disabled])

  const onSubmitOverview = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/dellamall/d_overviews/update/${editData.id}`, {
      title: data.overviewItem,
      content: data.overviewContent
    }).then((res) => {
      // console.log(res)
      setOverviews(res.data)
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

    await axios.post(`/api/dellamall/d_coupons/update/${editData.id}`, {
      title: data.couponContent,
      content: data.couponPrice,
      limit: data.couponLimit,
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

  const onSubmitSocial = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/dellamall/d_socials/update/${editData.id}`, {
      name: data.socialName,
      link: data.socialUrl,
      description: data.socialDescription,
    }).then((res) => {
      // console.log(res)
      setSocials(res.data)
      alert("編集しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("編集できませんでした。")
    })

    await setDisabled(false)
  }

  const onSubmitInfo = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/dellamall/d_infos/update/${editData.id}`, {
      title: data.infoDate,
      content: data.infoContent,
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

  const onSubmitInstagram = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/dellamall/d_insta/update/${editData.id}`, {
      account_name: data.instagramAccount,
      user_name: data.instagramUser,
      api_token: data.instagramToken,
    }).then((res) => {
      // console.log(res)
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
      title: data.itemName,
      price: data.itemPrice,
      thumbs: data.itemImage && data.itemImage?.length !== 0 ? data.itemImage[0] : editData.thumbs,
    }

    const params = new FormData();
    Object.keys(datas).forEach(function(key) {
      params.append(key, this[key])
    }, datas)

    await axios.post(`/api/dellamall/d_items/update/${editData.id}`, params, {
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
            {type === "overview" ? "ショップ情報" : null}
            {type === "coupon" ? "クーポン情報" : null}
            {type === "social" ? "オンラインサロン情報" : null}
            {type === "info" ? "お知らせ" : null}
            {type === "instagram" ? "Instagram連携" : null}
            {type === "item" ? "商品情報" : null}
            編集
          </h4>
          {disabled ? <Loader /> :
            <article className={styles.formArea}>
              {/* ショップ情報編集 */}
              {type === "overview" ?
                <form onSubmit={handleSubmit(onSubmitOverview)}>
                  <dl>
                    <dt>
                      <label htmlFor="overviewItem">項目</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="overviewItem"
                        {...register("overviewItem", {required: true})}
                        placeholder="お問い合わせ先"
                      />
                      {errors.overviewItem && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="overviewContent">内容を入力</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="overviewContent"
                        {...register("overviewContent", {required: true})}
                        placeholder="080‐1111‐2222/xxxyyy@gmail.com"
                      />
                      {errors.overviewContent && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* ショップ情報編集 */}

              {/* クーポン編集 */}
              {type === "coupon" ?
                <form onSubmit={handleSubmit(onSubmitCoupon)}>
                  <dl>
                    <dt>
                      <label htmlFor="couponContent">クーポン内容</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="couponContent"
                        {...register("couponContent", {required: true})}
                        placeholder="例：ショップ内全品100円引き！"
                      />
                      {errors.couponContent && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="couponPrice">割引内訳</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="couponPrice"
                        {...register("couponPrice", {required: true})}
                        placeholder="100円"
                      />
                      {errors.couponPrice && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="couponLimit">有効期限</label>
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
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* クーポン編集 */}

              {/* オンラインサロン編集 */}
              {type === "social" ?
                <form onSubmit={handleSubmit(onSubmitSocial)}>
                  <dl>
                    <dt>
                      <label htmlFor="socialUrl">サロンURL</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="socialUrl"
                        {...register("socialUrl", {required: true})}
                        placeholder="コラプラで掲載済みのオンラインサロンのリンク先を入力してください"
                      />
                      {errors.socialUrl && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="socialName">サロン名</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="socialName"
                        {...register("socialName", {required: true})}
                        placeholder="例：アコースティック講座"
                      />
                      {errors.socialName && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="socialDescription">サロン内容・説明文</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="socialDescription"
                        {...register("socialDescription", {required: true})}
                        placeholder="サロンの説明を記入してください！"
                      />
                      {errors.socialDescription && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* オンラインサロン編集 */}

              {/* お知らせ */}
              {type === "info" ?
                <form onSubmit={handleSubmit(onSubmitInfo)}>
                  <dl>
                    <dt>
                      <label htmlFor="infoDate">日付</label>
                    </dt>
                    <dd>
                      <input
                        type="date"
                        id="infoDate"
                        {...register("infoDate", {required: true})}
                      />
                      {errors.infoDate && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="infoContent">お知らせ内容</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="infoContent"
                        {...register("infoContent", {required: true})}
                        placeholder="例：新着商品が入荷しました！"
                      />
                      {errors.infoContent && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* お知らせ */}

              {/* Instagram連携 */}
              {type === "instagram" ?
                <form onSubmit={handleSubmit(onSubmitInstagram)}>
                  <dl>
                    <dt>
                      <label htmlFor="instagramAccount">アカウント名</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="instagramAccount"
                        {...register("instagramAccount", {required: true})}
                      />
                      {errors.instagramAccount && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="instagramUser">ユーザ名</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="instagramUser"
                        {...register("instagramUser", {required: true})}
                      />
                      {errors.instagramUser && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="instagramToken">APIトークン</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="instagramToken"
                        {...register("instagramToken", {required: true})}
                      />
                      {errors.instagramToken && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* Instagram連携 */}

              {/* 商品情報編集 */}
              {type === "item" ?
                <form onSubmit={handleSubmit(onSubmitItem)}>
                  <dl>
                    <dt>
                      <label htmlFor="itemName">商品名</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="itemName"
                        {...register("itemName", {required: true})}
                        placeholder="花柄フレアスカート"
                      />
                      {errors.itemName && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="itemPrice">価格</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="itemPrice"
                        {...register("itemPrice", {required: true})}
                        placeholder="2,800(税込)"
                      />
                      {errors.itemPrice && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="itemImage">商品画像</label>
                    </dt>
                    <dd>
                      <div className={styles.imgBox}>
                        {preview ? <img src={preview} alt="" /> : <div className={styles.imgNone}>商品写真を入れてください</div>}
                      </div>
                      <input
                        type="file"
                        id="itemImage"
                        accept="image/*"
                        {...register("itemImage")}
                        onChange={handleChangeFile}
                      />
                      {errors.itemImage && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <button className={`${styles.btn} hoverEffect`}>編集</button>
                </form>
              : null}
              {/* 商品情報編集 */}
            </article>
          }
        </div>
      </Container>
    </section>
  );
}

export default EditOfficial;