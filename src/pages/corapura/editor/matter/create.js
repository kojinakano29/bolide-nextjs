import styles from '@/styles/corapura/components/editor.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import Container from '@/components/corapura/Layout/container';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import { Loader, PostEditor } from '@/components/corapura';

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/post/create`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const CreateMatter = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'corapura'})
  const [disabled, setDisabled] = useState(false)
  const [selector, setSelector] = useState(parseInt(1))
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onChange",
  })
  const [preview, setPreview] = useState()
  const [editorContent, setEditorContent] = useState()
  const cats = posts.cat

  const onMatterCreate = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post(`/api/corapura/post/store`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      // console.log(res)
      alert("案件を作成しました。")
      router.push({
        pathname: '/corapura/editor/matter/[matterId]',
        query: { matterId: res.data.id },
      })
    }).catch((e) => {
      console.error(e)
    })

    await setDisabled(false)
  }, [setDisabled])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    setDisabled(true)

    onMatterCreate({
      user_id: user?.id,
      title: data.title,
      state: data.state,
      c_cat_id: data.c_cat_id,
      date: data?.date ? data.date : null,
      limite_date: data?.limite_date ? data.limite_date : null,
      reward: data?.reward ? data.reward : null,
      hope_reward: data?.hope_reward ? data.hope_reward : null,
      number_of_people: data?.number_of_people ? data.number_of_people : null,
      recruitment_quota: data?.recruitment_quota ? data.recruitment_quota : null,
      speciality: data?.speciality ? data.speciality : null,
      suporter: data?.suporter ? data.suporter : null,
      amount_of_suport: data?.amount_of_suport ? data.amount_of_suport : null,
      medium: data?.medium ? data.medium : null,
      content: editorContent,
      thumbs: data.thumbs[0],
      tag: data.tag,
    })
  }, [setDisabled, onMatterCreate, user, editorContent])

  const handleChangeImage = useCallback(async (e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview(window.URL.createObjectURL(files[0]))
    } else {
      setPreview(null)
    }
  }, [setPreview])

  const handleChangeSelect = (e) => {
    setSelector(parseInt(e.target.value))
    reset({
      date: '',
      limite_date: '',
      reward: '',
      hope_reward: '',
      number_of_people: '',
      recruitment_quota: '',
      speciality: '',
      suporter: '',
      amount_of_suport: '',
      medium: '',
    })
  }

  return (
    <>
      <section className="cont1">
        <Container small>
          {user ?
            <form onSubmit={handleSubmit(onSubmit)}>
              <article className={styles.matterFlex}>
                <div className={styles.matterLeft}>
                  <label className={`hoverEffect ${styles.fileBox}`}>
                    {preview ?
                      <img src={preview} alt="" />
                    :
                      "フォルダから画像を選択"
                    }
                    <input
                      type="file"
                      accept="image/*"
                      {...register('thumbs')}
                      onChange={handleChangeImage}
                    />
                  </label>
                </div>
                <div className={styles.matterRight}>
                  <dl>
                    <dt>案件カテゴリーを選択ください</dt>
                    <dd>
                      <select {...register("c_cat_id")} onChange={(e) => handleChangeSelect(e)}>
                        {cats.map((cat, index) => (
                          <option value={cat.id} key={index}>{cat.name}</option>
                        ))}
                      </select>
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="title">案件タイトルを入力ください</label>
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
                      <label htmlFor="tag">案件に合ったタグを入力ください</label>
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
                </div>
              </article>

              <article className={styles.selectorArea}>
                {
                  selector === 1 ||
                  selector === 10 ||
                  selector === 12 ||
                  selector === 15 ?
                  <dl>
                    <dt>実施日</dt>
                    <dd>
                      <input
                        type="date"
                        {...register("date", {required: true})}
                      />
                      {errors.date && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector !== 18 ?
                  <dl>
                    <dt>募集期間</dt>
                    <dd>
                      <input
                        type="date"
                        {...register("limite_date", {required: true})}
                      />
                      {errors.limite_date && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 1 ||
                  selector === 10 ||
                  selector === 15 ?
                  <dl>
                    <dt>
                      <label htmlFor="reward">謝礼</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="reward"
                        {...register("reward", {required: true})}
                      />
                      {errors.reward && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 1 ||
                  selector === 6 ||
                  selector === 7 ||
                  selector === 8 ||
                  selector === 10 ||
                  selector === 12 ||
                  selector === 13 ||
                  selector === 14 ||
                  selector === 15 ||
                  selector === 16 ?
                  <dl>
                    <dt>
                      <label htmlFor="number_of_people">募集人数</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="number_of_people"
                        {...register("number_of_people", {required: true})}
                      />
                      {errors.number_of_people && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 2 ||
                  selector === 3 ||
                  selector === 4 ||
                  selector === 7 ||
                  selector === 11 ||
                  selector === 12 ?
                  <dl>
                    <dt>
                      <label htmlFor="hope_reward">希望謝礼</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="hope_reward"
                        {...register("hope_reward", {required: true})}
                      />
                      {errors.hope_reward && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 2 ||
                  selector === 3 ||
                  selector === 4 ||
                  selector === 5 ||
                  selector === 11 ?
                  <dl>
                    <dt>
                      <label htmlFor="recruitment_quota">募集可能枠</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="recruitment_quota"
                        {...register("recruitment_quota", {required: true})}
                      />
                      {errors.recruitment_quota && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 9 ?
                  <dl>
                    <dt>
                      <label htmlFor="speciality">専門分野</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="speciality"
                        {...register("speciality", {required: true})}
                      />
                      {errors.speciality && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 17 ?
                  <dl>
                    <dt>
                      <label htmlFor="suporter">支援者数</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="suporter"
                        {...register("suporter", {required: true})}
                      />
                      {errors.suporter && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 17 ?
                  <dl>
                    <dt>
                      <label htmlFor="amount_of_suport">支援総額</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="amount_of_suport"
                        {...register("amount_of_suport", {required: true})}
                      />
                      {errors.amount_of_suport && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 18 ?
                  <dl>
                    <dt>
                      <label htmlFor="medium">媒体</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="medium"
                        {...register("medium", {required: true})}
                      />
                      {errors.medium && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
              </article>

              <article className={styles.editArea}>
                <dl>
                  <dt>本文</dt>
                  <dd>
                    <PostEditor matter setEditorContent={setEditorContent} />
                  </dd>
                </dl>
              </article>

              <div className={styles.submitFlex}>
                <button className={`${styles.submitBtn2} hoverEffect`} disabled={disabled}>
                  <label>
                    作成
                    <input
                      type="radio"
                      value="0"
                      {...register("state")}
                      disabled={disabled}
                    />
                  </label>
                </button>
                <button className={`${styles.submitBtn2} ${styles.submitBtn3} hoverEffect`} disabled={disabled}>
                  <label>
                    下書き保存
                    <input
                      type="radio"
                      value="2"
                      {...register("state")}
                      disabled={disabled}
                    />
                  </label>
                </button>
              </div>
            </form>
          : <Loader />}
        </Container>
      </section>
    </>
  );
}

export default CreateMatter;

CreateMatter.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}