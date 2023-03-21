import styles from '@/styles/liondor/components/mypage.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Container from '@/components/liondor/Layouts/container';
import PageLayoutLiondor from '@/components/Layouts/PageLayoutLiondor';
import { PageTitle } from '@/components/liondor';
import { industries, occupations, workTypes, zip } from '@/lib/liondor/constants'
import thumb from '@/images/liondor/common/mypage.webp'
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';

const MypageCreate = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'liondor'})

  useEffect(() => {
    onLoadCheck()
  }, [user])

  const onLoadCheck = () => {
    if (user?.l_profile_id) {
      router.push({
        pathname: '/liondor/mypage/edit/[profid]',
        query: { profid: user?.l_profile_id }
      })
    }
  }

  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

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
      // console.log(res)
      alert("マイページを作成しました。")
      router.push({
        pathname: '/liondor/mypage/edit/[pid]',
        query: { pid: res.data.id }
      })
    })
    .catch((e) => {
      console.error(e)
    })

    setDisabled(false)
  }, [])

  const onSubmit = useCallback((data) => {
    // console.log(data)
    setDisabled(true)

    onPostForm({
      user_id: user?.id,
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
  }, [onPostForm, user])

  const [preview, setPreview] = useState(thumb.src)
  const handleChangeFile = useCallback((e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview(window.URL.createObjectURL(files[0]))
    } else {
      setPreview(thumb.src)
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
                    <img src={preview} alt="プレビュー画像" />
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
                  <input type="text" id="age" {...register("age", { required: true })} />
                  {errors.age && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                </dd>
              </dl>
              <dl className={styles.dl}>
                <dt>就業形態</dt>
                <dd className={styles.workArea}>
                  <select {...register("work_type")}>
                    {workTypes.map((type, index) => (
                      <option value={type} key={index}>{type}</option>
                    ))}
                  </select>
                </dd>
              </dl>
              <dl className={styles.dl}>
                <dt>業種</dt>
                <dd className={styles.industryArea}>
                  <select {...register("industry")}>
                    {industries.map((industry, index) => (
                      <option value={industry} key={index}>{industry}</option>
                    ))}
                  </select>
                </dd>
              </dl>
              <dl className={styles.dl}>
                <dt>職種</dt>
                <dd className={styles.occupationArea}>
                  <select {...register("occupation")}>
                    {occupations.map((occupation, index) => (
                      <option value={occupation} key={index}>{occupation}</option>
                    ))}
                  </select>
                </dd>
              </dl>
              <button className="btn3" disabled={disabled}>新規作成</button>
            </form>
          </article>
        </div>
      </Container>
    </section>
  );
}

export default MypageCreate;

MypageCreate.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}