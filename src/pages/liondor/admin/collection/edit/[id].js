import styles from '@/styles/liondor/components/createPost.module.scss'
import axios from '@/lib/axios';
import { useCallback, useEffect, useState } from 'react'
import { PageTitle } from '@/components/liondor';
import { useForm } from 'react-hook-form';
import Container from '@/components/liondor/Layouts/container';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';
import PageLayoutLiondor from '@/components/Layouts/PageLayoutLiondor';

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_LIONDOR}/admin/collection/edit/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const CreateCollection = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'liondor'})

  const post = posts.posts
  const cats = posts.category
  const parentCat = posts.parent_category
  const parentNum = parseInt(parentCat.id)
  const catNum = parentNum - 1
  const [disabled, setDisabled] = useState(false)
  const [cat, setCat] = useState([cats[catNum]])
  const [preview1, setPreview1] = useState(post.image1 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.image1}` : "")
  const [preview2, setPreview2] = useState(post.image2 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.image2}` : "")
  const [preview3, setPreview3] = useState(post.image3 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.image3}` : "")
  const [preview4, setPreview4] = useState(post.image4 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.image4}` : "")
  const previews = [
    {pos: "左", preview: preview1},
    {pos: "左中", preview: preview2},
    {pos: "右中", preview: preview3},
    {pos: "右", preview: preview4},
  ]
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: post.title,
      l_category_id: parentNum,
      child_category: post.l_category_id,
      url: post.url,
    }
  })

  const onLoadCheck = () => {
    alert("このページの閲覧権限がありません。")
    router.push(`/liondor`)
  }

  useEffect(() => {
    if (user && user?.account_type < 2) {
      onLoadCheck()
    }
  }, [user])

  const onPostForm = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post(`/api/liondor/admin/collection/update/${post.id}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log(res)
      alert("COLLECTIONを更新しました。")
    })
    .catch((e) => {
      console.error(e)
    })

    setDisabled(false)
  }, [post, setDisabled])

  const onSubmit = useCallback((data) => {
    // console.log(data)
    setDisabled(true)

    onPostForm({
      user_id: user?.id,
      l_category_id: data.child_category,
      title: data.title,
      image1: data.image1.length !== 0 ? data.image1[0] : post.image1,
      image2: data.image2.length !== 0 ? data.image2[0] : post.image2,
      image3: data.image3.length !== 0 ? data.image3[0] : post.image3,
      image4: data.image4.length !== 0 ? data.image4[0] : post.image4,
      url: data.url,
      // view_date: data.view_data,
    })
  }, [onPostForm, user, post, setDisabled])

  const handleCat = (e) => {
    setCat(cats.filter((item) => {
      return item.id.toString() === e.target.value
    }))
  }

  const handleChangeFile = useCallback(async (e, num) => {
    const { files } = e.target
    if (files[0]) {
      if (num === 1) {
        setPreview1(window.URL.createObjectURL(files[0]))
      } else if (num === 2) {
        setPreview2(window.URL.createObjectURL(files[0]))
      } else if (num === 3) {
        setPreview3(window.URL.createObjectURL(files[0]))
      } else if (num === 4) {
        setPreview4(window.URL.createObjectURL(files[0]))
      }
    } else {
      if (num === 1) {
        setPreview1("")
      } else if (num === 2) {
        setPreview2("")
      } else if (num === 3) {
        setPreview3("")
      } else if (num === 4) {
        setPreview4("")
      }
    }
  }, [setPreview1, setPreview2, setPreview3, setPreview4])

  return (
    <section className={styles.createSection}>
      <PageTitle title="COLLECTION編集" />
      {
        user?.account_type > 2 ?
        <Container small>
          <form onSubmit={handleSubmit(onSubmit)}>
            <article className={styles.flex}>
              <div className={styles.left}>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="title">タイトル</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input type="text" id="title" {...register("title", { required: true })} />
                    {errors.title && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="url">リンクURL</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input type="text" id="url" {...register("url", { required: true })} />
                    {errors.url && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                {previews.map((pre, index) => (
                  <dl className={styles.dl} key={index}>
                    <dt className={styles.dt}>
                      <label htmlFor={`image${index+1}`}>サムネイル画像（{pre.pos}）</label>
                    </dt>
                    <dd className={styles.dd}>
                      <input
                        id={`image${index+1}`}
                        type="file"
                        accept="image/*"
                        {...register(`image${index+1}`)}
                        onChange={(e) => handleChangeFile(e, index+1)}
                      />
                      {pre.preview ? <img src={pre.preview} alt="プレビュー画像" /> : null}
                    </dd>
                  </dl>
                ))}
              </div>
              <div className={styles.right}>
                <button className="btn2" disabled={disabled}>編集</button>
                <div className={styles.hr}></div>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>大カテゴリー</dt>
                  <dd className={styles.dd}>
                    <select {...register("l_category_id")} onChange={handleCat}>
                      {cats.map((cat, index) => (
                        <option value={index+1} key={index+1}>{cat.name}</option>
                      ))}
                    </select>
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>子カテゴリー</dt>
                  <dd className={styles.dd}>
                    <select {...register("child_category")}>
                      {cat[0].child_category.map((cat) => (
                        <option value={cat.id} key={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </dd>
                </dl>
              </div>
            </article>
          </form>
        </Container>
        : null
      }
    </section>
  );
}

export default CreateCollection;

CreateCollection.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}