import styles from '@/styles/liondor/components/mypage.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Container from '@/components/Layouts/container';
import PageLayout from '@/components/Layouts/PageLayout';
import { MypageSide, PageTitle } from '@/components/liondor';
import { zip } from '@/lib/liondor/constants'
import thumb from '@/images/liondor/common/mypage.png'
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/mypage/edit/${params.profile_id}`)
  const data = await res.json()

  return {
    props: {
        posts: data
    }
  }
}

const MypageEdit = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { user } = useAuth({middleware: 'auth'})
  const router = useRouter()

  const profile = posts.l_profile
  const bookmark = posts.l_bookmark
  const present = posts.l_present

  const [disabled, setDisabled] = useState(false)
  const [defaultThumb, setDefaultThumb] = useState(profile.thumbs)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: profile.nicename,
      sex: profile.sex,
      zipcode: profile.zipcode,
      zip: profile.zip,
      other_address: profile.other_address,
      age: profile.age,
      work_type: profile.work_type,
      industry: profile.industry,
      occupation: profile.occupation,
    }
  })

  useEffect(() => {
    onLoadCheck()
  }, [user])

  const onLoadCheck = () => {
    const userIdStr = String(user?.l_profile_id)
    const routerStr = String(router.query.profile_id)
    if (user && userIdStr !== routerStr) {
      router.push("/liondor/mypage/create")
    }
  }

  const onPostForm = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post(`/api/liondor/mypage/update/${posts.l_profile_id}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log(res)
      alert("更新しました。")
      setDisabled(false)
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  const onSubmit = useCallback((data) => {
    // console.log(data)
    setDisabled(true)

    onPostForm({
      user_id: user.id,
      nicename: data.name,
      thumbs: defaultThumb,
      sex: data.sex,
      zipcode: data.zipcode,
      zip: data.zip,
      other_address: data.other_address,
      age: data.age,
      work_type: data.work_type,
      industry: data.industry,
      occupation: data.occupation,
    })
  }, [onPostForm, user, defaultThumb])

  const defaultThumbsPreview = `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.thumbs}`
  const [preview, setPreview] = useState(defaultThumbsPreview)
  const handleChangeFile = useCallback((e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview(window.URL.createObjectURL(files[0]))
      setDefaultThumb(files[0])
    } else {
      setPreview(thumb.src)
      setDefaultThumb(profile.thumbs)
    }
  }, [])

  return (
    <section className="cont1">
      <PageTitle title="MY PAGE" ivy />
      <Container small>
        <div className={styles.mypageFlex}>
          <article className={styles.mypageForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <dl className={styles.dl}>
                <dt>写真</dt>
                <dd className={styles.thumbArea}>
                  <div className={styles.thumbBox}>
                    <img src={preview} alt="" />
                  </div>
                  <label>
                    変更する
                    <input id="thumbs" type="file" accept="image/*" {...register("thumbs")} onChange={handleChangeFile} />
                  </label>
                </dd>
              </dl>
              <dl className={styles.dl}>
                <dt>
                  <label htmlFor="name">ニックネーム</label>
                </dt>
                <dd className={styles.nameArea}>
                  <input type="text" id="name" {...register("name", { required: true })} />
                  {errors.name && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                </dd>
              </dl>
              <dl className={styles.dl}>
                <dt>性別</dt>
                <dd className={styles.radioArea}>
                  <label>
                    <input type="radio" value="0" {...register("sex", {required: true})} />
                    女性
                  </label>
                  <label>
                    <input type="radio" value="1" {...register("sex", {required: true})} />
                    男性
                  </label>
                  {errors.sex && <p className={`red ${styles.error}`}>必須項目を選択してください</p>}
                </dd>
              </dl>
              <dl className={styles.dl}>
                <dt>住所</dt>
                <dd>
                  <dl className={styles.inDl}>
                    <dt>
                      <label htmlFor="zipcode">郵便番号</label>
                    </dt>
                    <dd className={styles.zipArea}>
                    <input type="text" id="zipcode" {...register("zipcode", { required: true })} />
                    {errors.zipcode && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl className={styles.inDl}>
                    <dt>都道府県</dt>
                    <dd className={styles.zipArea}>
                      <select {...register("zip")}>
                        {zip.map((zip, index) => (
                          <option value={zip} key={index}>{zip}</option>
                        ))}
                      </select>
                    </dd>
                  </dl>
                  <dl className={styles.inDl}>
                    <dt>
                      <label htmlFor="address">それ以降の住所</label>
                    </dt>
                    <dd className={styles.addressArea}>
                      <input type="text" id="address" {...register("other_address", { required: true })} />
                      {errors.other_address && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                </dd>
              </dl>
              <dl className={styles.dl}>
                <dt>
                  <label htmlFor="age">年齢</label>
                </dt>
                <dd className={styles.ageArea}>
                  <input type="number" id="age" {...register("age", { required: true })} />
                  {errors.age && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                </dd>
              </dl>
              <dl className={styles.dl}>
                <dt>就業形態</dt>
                <dd className={styles.workArea}>
                  <select {...register("work_type")}>
                    <option value="正社員">正社員</option>
                  </select>
                </dd>
              </dl>
              <dl className={styles.dl}>
                <dt>業種</dt>
                <dd className={styles.industryArea}>
                  <select {...register("industry")}>
                    <option value="学術研究、専門技術サービス業">学術研究、専門技術サービス業</option>
                  </select>
                </dd>
              </dl>
              <dl className={styles.dl}>
                <dt>職種</dt>
                <dd className={styles.occupationArea}>
                  <select {...register("occupation")}>
                    <option value="電気通信事業">電気通信事業</option>
                  </select>
                </dd>
              </dl>
              <button className="btn3" disabled={disabled}>変更を保存する</button>
            </form>
          </article>
          <article className={styles.sideBox}>
            <div className={styles.sideWrap}>
              <MypageSide posts={bookmark} en="SAVED" jp="保存した記事" />
            </div>
            <div className={styles.sideWrap}>
              <MypageSide posts={present} en="PRESENT" jp="応募したプレゼント" present />
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}

export default MypageEdit;

MypageEdit.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}