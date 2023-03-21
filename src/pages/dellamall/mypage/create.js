import styles from '@/styles/dellamall/components/adminForm.module.scss'
import Container from "@/components/dellamall/Layouts/container";
import PageLayoutDellamall from "@/components/Layouts/PageLayoutDellamall";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Loader } from '@/components/dellamall';

const CreateMypage = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'dellamall'})
  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
  })
  const [preview, setPreview] = useState()

  const loginCheck = useCallback(async () => {
    await csrf()

    await axios.post('/api/d_profile_get', {
      id: user?.id,
    }).then((res) => {
      // console.log(res)
      if (res.data) {
        router.push(`/dellamall/mypage/${user?.id}`)
      }
    }).catch((e) => {
      console.error(e)
    })
  }, [user])

  useEffect(() => {
    if (user) {
      loginCheck()
    }
  }, [user])

  const handleChangeFile = useCallback((e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview(window.URL.createObjectURL(files[0]))
    } else {
      setPreview("")
    }
  }, [])

  const onMypageCreate = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post('/api/dellamall/mypage/store', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      // console.log(res)
      alert("マイページを作成しました。")
      router.push(`/dellamall/mypage/${user?.id}`)
    }).catch((e) => {
      console.error(e)
      alert("マイページの作成に失敗しました。")
    })

    await setDisabled(false)
  }, [setDisabled, user])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    setDisabled(true)

    onMypageCreate({
      user_id: user?.id,
      nicename: data.nicename,
      thumbs: data.thumbs[0],
      profile: data.profile
    })
  }, [setDisabled, onMypageCreate, user])

  return (
    <section className="cont1">
      <Container small900>
        <h2 className="ttl2">マイページ作成</h2>
        {user ?
          <form onSubmit={handleSubmit(onSubmit)}>
            <article className={styles.adminForm}>
              <dl>
                <dt>
                  <label htmlFor="nicename">ニックネーム</label>
                </dt>
                <dd>
                  <input
                    type="text"
                    id="nicename"
                    {...register("nicename", { required: true })}
                    placeholder="ニックネーム"
                  />
                  {errors.nicename && <p className={styles.error}>必須項目を入力してください</p>}
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="thumbs">プロフィール画像</label>
                </dt>
                <dd className={styles.profileThumbs}>
                  <div className={styles.imgBox}>
                    {preview ? <img src={preview} alt="プレビュー画像" /> : <div className={styles.imgNone}>プロフィール画像</div>}
                  </div>
                  <label htmlFor="thumbs" className={`${styles.thumbsBox} hoverEffect`}>
                    画像を選択する
                    <input
                      type="file"
                      id="thumbs"
                      accept="image/*"
                      {...register("thumbs")}
                      onChange={handleChangeFile}
                    />
                  </label>
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="profile">自己紹介</label>
                </dt>
                <dd>
                  <textarea
                    id="profile"
                    {...register("profile")}
                    placeholder=""
                  ></textarea>
                </dd>
              </dl>
            </article>
            <button
              className={`${styles.btn} hoverEffect`}
              disabled={disabled}
            >作成</button>
          </form>
        : <Loader />}
      </Container>
    </section>
  );
}

export default CreateMypage;

CreateMypage.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}