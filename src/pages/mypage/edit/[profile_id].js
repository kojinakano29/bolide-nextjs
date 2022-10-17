import styles from '@/styles/components/mypage.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Container from '@/components/Layouts/container';
import PageLayout from '@/components/Layouts/PageLayout';
import { PageTitle } from '@/components';
import { zip } from '@/lib/constants'
import profile from '@/images/common/mypage.png'

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
  console.log(posts)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      // name: user !== null ? userData?.nicename : "",
      // thumbs: user !== null ? userData?.thumbs : "",
      // sex: user !== null ? userData?.sex : "",
      // zipcode: user !== null ? userData?.zipcode : "",
      // zip: user !== null ? userData?.zip : "",
      // other_address: user !== null ? userData?.other_address : "",
      // age: user !== null ? userData?.age : "",
      // work_type: user !== null ? userData?.work_type : "",
      // industry: user !== null ? userData?.industry : "",
      // occupation: user !== null ? userData?.occupation : "",
    }
  })

  const onPostForm = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post('/api/liondor/mypage/store', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  const onSubmit = useCallback((data) => {
    console.log(data)

    onPostForm({
      user_id: 3,
      nicename: data.name,
      thumbs: data.thumbs[0],
      sex: data.sex,
      zipcode: data.zipcode,
      zip: data.zip,
      other_address: data.other_address,
      age: data.age,
      work_type: data.work_type,
      industry: data.industry,
      occupation: data.occupation,
    })
  }, [onPostForm])

  const [preview, setPreview] = useState(profile.src)
  const handleChangeFile = useCallback((e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview(window.URL.createObjectURL(files[0]))
    } else {
      setPreview(profile.src)
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
                <dt>
                  <label htmlFor="thumbs">写真</label>
                </dt>
                <dd className={styles.thumbArea}>
                  <img src={preview} alt="" />
                  <input id="thumbs" type="file" accept="image/*" {...register("thumbs")} onChange={handleChangeFile} />
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
              <button className="btn3">新規作成</button>
            </form>
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