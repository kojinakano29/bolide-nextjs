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

const CreateCompany = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth'})
  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
  })
  const [preview1, setPreview1] = useState()
  const [preview2, setPreview2] = useState()
  const [preview3, setPreview3] = useState()
  const [previewIcon, setPreviewIcon] = useState()

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
    if (user && user?.c_profile_id && user?.account_type === 1) {
      onLoadCheck("すでにプロフィールを作成済みです。", `/corapura/editor/company/${user?.c_profile_id}`)
    } else if (user && user?.c_profile_id && user?.account_type === 0) {
      onLoadCheck("すでにプロフィールを作成済みです。", `/corapura/editor/user/${user?.c_profile_id}`)
    }
  }, [user])

  const handleChangeImage = useCallback(async (e, num) => {
    const { files } = e.currentTarget
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

  const onProfileCreate = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post('/api/corapura/mypage/store', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log(res)
      alert("プロフィールを作成しました。")
      if (user?.account_type === 0) {
        router.push({
          pathname: '/corapura/editor/user/[profId]',
          query: { profId: res.data.id }
        })
      } else if (user?.account_type === 1) {
        router.push({
          pathname: '/corapura/editor/company/[profId]',
          query: { profId: res.data.id }
        })
      }
    }).catch((e) => {
      console.error(e)
      alert("プロフィールの作成に失敗しました。")
    })

    await setDisabled(false)
  }, [user, setDisabled])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    setDisabled(true)

    onProfileCreate({
      user_id: user?.id,
      nicename: data.nicename,
      title: data.title,
      tag: data.tag,
      zip: data.zip,
      profile: data.profile,
      image1: data.image1[0],
      image2: data.image2[0],
      image3: data.image3[0],
      thumbs: data.thumbs[0],
    })
  }, [setDisabled, onProfileCreate, user])

  return (
    <section className="cont1">
      <Container small>
        {user ?
          <form onSubmit={handleSubmit(onSubmit)}>
            <article className={styles.profileFlex}>
              <div className={styles.profileLeft}>
                {previews.map((preview, index) => (
                  <div key={index}>
                    <div className={`
                      ${styles.imgBox}
                      ${user?.account_type === 0 ? styles.user : null}
                    `} key={index}>
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
                    <label htmlFor="nicename">{user?.account_type === 0 ? "ニックネーム" : "企業名"}を入力ください</label>
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
                    <label htmlFor="title">{user?.account_type === 0 ? "キャッチコピー" : "業種"}を入力ください</label>
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
                    <label htmlFor="tag">{user?.account_type === 0 ? "活動" : "業種"}に合ったタグを入力ください</label>
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
                  <dt>都道府県</dt>
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
                    <label htmlFor="profile">{user?.account_type === 0 ? "自己紹介" : "事業内容"}を入力ください</label>
                  </dt>
                  <dd>
                    <textarea id="profile" {...register("profile", {required: true})}></textarea>
                    {errors.profile && <p className={styles.error}>必須項目を入力してください</p>}
                  </dd>
                </dl>
              </div>
            </article>
            <div className={styles.submitFlex}>
              <button
                className={`${styles.submitBtn} hoverEffect`}
                disabled={disabled}
              >作成</button>
            </div>
          </form>
        : <Loader />}
      </Container>
    </section>
  );
}

export default CreateCompany;

CreateCompany.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}