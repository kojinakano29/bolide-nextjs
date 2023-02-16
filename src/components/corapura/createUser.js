import styles from '@/styles/corapura/components/editor.module.scss'
import { useCallback, useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import Container from './Layout/container';
import { UserContext } from '@/pages/corapura/editor/user/[id]';
import { socialNetworkingService } from '@/lib/corapura/constants';

const CreateUserForm = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const {
    profile,
    option,
    type,
    targetId,
    setSns,
    setCards,
    setLikes,
    handleClickCreate,
    handleClickEdit,
    disabled,
    setDisabled,
    editData,
    setEditData,
  } = useContext(UserContext)

  const [preview, setPreview] = useState()
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
  })

  const onSubmitSns = async (data) => {
    // console.log(data)
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/corapura/mypage/c_user_social/store`, {
      c_user_profile_id: option.id,
      name: data.snsName,
      url: data.snsUrl,
      follower: data.snsFollower,
    }).then((res) => {
      // console.log(res)
      setSns(res.data)
      alert("作成しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("作成できませんでした。")
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
      thumbs: data.cardThumbs[0],
    }

    const params = new FormData();
    Object.keys(datas).forEach(function(key) {
      params.append(key, this[key])
    }, datas)

    await axios.post(`/api/corapura/card/store`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      // console.log(res)
      setCards(res.data)
      alert("作成しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("作成できませんでした。")
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
      thumbs: data.likeThumbs[0],
    }

    const params = new FormData();
    Object.keys(datas).forEach(function(key) {
      params.append(key, this[key])
    }, datas)

    await axios.post(`/api/corapura/like/store`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      // console.log(res)
      setLikes(res.data)
      alert("作成しました。")
      handleClickCreate(type)
    }).catch((e) => {
      console.error(e)
      alert("作成できませんでした。")
    })

    await setDisabled(false)
  }

  const handleChangeFile = useCallback((e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview(window.URL.createObjectURL(files[0]))
    } else {
      setPreview("")
    }
  }, [setPreview])

  return (
    <section className={styles.popupArea} onClick={() => handleClickCreate(type)}>
      <Container small900>
        <div className={styles.popupBox} onClick={(e) => e.stopPropagation()}>
          <h4 className={styles.midashi}>
            {type === "sns" ? "SNSリンク先" : null}
            {type === "card" ? "名刺" : null}
            {type === "like" ? "推し活・ホビー" : null}
            作成
          </h4>
          <article className={styles.formArea}>
            {/* SNS */}
            {type === "sns" ?
              <form onSubmit={handleSubmit(onSubmitSns)}>
                <dl>
                  <dt>SNS名</dt>
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
                <dl>
                  <dt>
                    <label htmlFor="snsFollower">フォロワー数</label>
                  </dt>
                  <dd>
                    <input
                      type="text"
                      id="snsFollower"
                      {...register("snsFollower", {required: true})}
                    />
                    {errors.snsFollower && <p className={styles.error}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <button className={`${styles.btn} hoverEffect`}>作成</button>
              </form>
            : null}
            {/* SNS */}

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
                    <input
                      type="file"
                      id="cardThumbs"
                      accept="image/*"
                      {...register("cardThumbs", {required: true})}
                      onChange={handleChangeFile}
                    />
                    {errors.cardThumbs && <p className={styles.error}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <button className={`${styles.btn} hoverEffect`}>作成</button>
              </form>
            : null}
            {/* 名刺 */}

            {/* 推し活・ホビー作成 */}
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
                    <input
                      type="file"
                      id="likeThumbs"
                      accept="image/*"
                      {...register("likeThumbs", {required: true})}
                      onChange={handleChangeFile}
                    />
                    {errors.likeThumbs && <p className={styles.error}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <button className={`${styles.btn} hoverEffect`}>作成</button>
              </form>
            : null}
            {/* 推し活・ホビー作成 */}
          </article>
        </div>
      </Container>
    </section>
  );
}

export default CreateUserForm;