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
    defaultValues: {},
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

  const onLoadCheck = useCallback(async () => {
    alert("このページの閲覧権限がありません。")
    router.push({
      pathname: '/corapura',
    })
  }, [])

  useEffect(() => {
    if (user && user?.account_type !== 1) {
      onLoadCheck()
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
      console.log(res)
      alert("プロフィールを作成しました。")
      // router.push({
      //   pathname: '/corapura',
      // })
    }).catch((e) => {
      console.error(e)
      alert("プロフィールの作成に失敗しました。")
    })

    await setDisabled(false)
  }, [setDisabled])

  const onSubmit = useCallback(async (data) => {
    console.log(data)
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
                  <div className={styles.imgBox} key={index}>
                    {preview ? <img src={preview} alt="" /> : <div className={styles.imgNone}></div>}
                    <label>
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
                <div className={styles.iconflex}>
                  <div className={styles.iconBox}>
                    {previewIcon ? <img src={previewIcon} alt="" /> : <div className={styles.imgNone}></div>}
                  </div>
                  <label>
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
                    <label htmlFor="profile">事業内容を入力ください</label>
                  </dt>
                  <dd>
                    <textarea id="profile" {...register("profile", {required: true})}></textarea>
                    {errors.profile && <p className={styles.error}>必須項目を入力してください</p>}
                  </dd>
                </dl>
              </div>
            </article>
            <button className={styles.submitBtn} disabled={disabled}>作成</button>
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