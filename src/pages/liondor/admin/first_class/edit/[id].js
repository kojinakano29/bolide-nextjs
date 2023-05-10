import styles from '@/styles/liondor/components/createPost.module.scss'
import axios from '@/lib/axios'
import { useCallback, useEffect, useState } from 'react'
import { PageTitle } from '@/components/liondor'
import { useForm } from 'react-hook-form'
import Container from '@/components/liondor/Layouts/container'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import PageLayoutLiondor from '@/components/Layouts/PageLayoutLiondor'

// SSR
export const getServerSideProps = async ({ params }) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_LIONDOR}/admin/first/edit/${params.id}`,
    )
    const data = await res.json()

    return {
        props: {
            posts: data,
        },
    }
}

const EditFirstClass = ({ posts }) => {
    // console.log(posts)
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth', type: 'liondor' })

    const post = posts.posts
    const cats = posts.category
    const parentCat = posts.parent_category
    const parentNum = parseInt(parentCat.id)
    const catNum = parentNum - 1
    const [disabled, setDisabled] = useState(false)
    const [preview, setPreview] = useState(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.thumbs}`,
    )
    const [cat, setCat] = useState([cats[catNum]])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: post.title,
            l_category_id: parentNum,
            child_category: post.l_category_id,
            url: post.url,
        },
    })

    const onLoadCheck = () => {
        alert('このページの閲覧権限がありません。')
        router.push(`/liondor`)
    }

    useEffect(() => {
        if (user && user?.account_type < 2) {
            onLoadCheck()
        }
    }, [user])

    const onPostForm = useCallback(
        async data => {
            await csrf()

            const params = new FormData()
            Object.keys(data).forEach(function (key) {
                params.append(key, this[key])
            }, data)

            await axios
                .post(`/api/liondor/admin/first/update/${post.id}`, params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(res => {
                    // console.log(res)
                    alert('First Classを更新しました。')
                })
                .catch(e => {
                    console.error(e)
                })

            await setDisabled(false)
        },
        [post, setDisabled],
    )

    const onSubmit = useCallback(
        data => {
            // console.log(data.thumbs)
            setDisabled(true)

            onPostForm({
                user_id: user?.id,
                l_category_id: data.child_category,
                title: data.title,
                thumbs: data.thumbs.length !== 0 ? data.thumbs[0] : post.thumbs,
                url: data.url,
                // view_date: data.view_data,
            })
        },
        [onPostForm, user, post, setDisabled],
    )

    const handleCat = e => {
        setCat(
            cats.filter(item => {
                return item.id.toString() === e.target.value
            }),
        )
    }

    const handleChangeFile = useCallback(
        e => {
            const { files } = e.target
            if (files[0]) {
                setPreview(window.URL.createObjectURL(files[0]))
            } else {
                setPreview(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${preview}`,
                )
            }
        },
        [setPreview, preview],
    )

    return (
        <section className={styles.createSection}>
            <PageTitle title="First Class編集" />
            {user?.account_type > 2 ? (
                <Container small>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <article className={styles.flex}>
                            <div className={styles.left}>
                                <dl className={styles.dl}>
                                    <dt className={styles.dt}>
                                        <label htmlFor="title">タイトル</label>
                                    </dt>
                                    <dd className={styles.dd}>
                                        <input
                                            type="text"
                                            id="title"
                                            {...register('title', {
                                                required: true,
                                            })}
                                        />
                                        {errors.title && (
                                            <p
                                                className={`red ${styles.error}`}>
                                                必須項目を入力してください
                                            </p>
                                        )}
                                    </dd>
                                </dl>
                                <dl className={styles.dl}>
                                    <dt className={styles.dt}>
                                        <label htmlFor="url">リンクURL</label>
                                    </dt>
                                    <dd className={styles.dd}>
                                        <input
                                            type="text"
                                            id="url"
                                            {...register('url', {
                                                required: true,
                                            })}
                                        />
                                        {errors.url && (
                                            <p
                                                className={`red ${styles.error}`}>
                                                必須項目を入力してください
                                            </p>
                                        )}
                                    </dd>
                                </dl>
                                <dl className={styles.dl}>
                                    <dt className={styles.dt}>
                                        <label htmlFor="thumb">
                                            サムネイル画像
                                        </label>
                                    </dt>
                                    <dd className={styles.dd}>
                                        <input
                                            id="thumb"
                                            type="file"
                                            accept="image/*"
                                            {...register('thumbs')}
                                            onChange={handleChangeFile}
                                        />
                                        {preview ? (
                                            <img
                                                src={preview ? preview : null}
                                                alt="プレビュー画像"
                                            />
                                        ) : null}
                                    </dd>
                                </dl>
                            </div>
                            <div className={styles.right}>
                                <button className="btn2" disabled={disabled}>
                                    編集
                                </button>
                                <div className={styles.hr}></div>
                                <dl className={styles.dl}>
                                    <dt className={styles.dt}>大カテゴリー</dt>
                                    <dd className={styles.dd}>
                                        <select
                                            {...register('l_category_id')}
                                            onChange={handleCat}>
                                            {cats.map((cat, index) => (
                                                <option
                                                    value={index + 1}
                                                    key={index + 1}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </dd>
                                </dl>
                                <dl className={styles.dl}>
                                    <dt className={styles.dt}>子カテゴリー</dt>
                                    <dd className={styles.dd}>
                                        <select {...register('child_category')}>
                                            {cat[0].child_category.map(cat => (
                                                <option
                                                    value={cat.id}
                                                    key={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </dd>
                                </dl>
                            </div>
                        </article>
                    </form>
                </Container>
            ) : null}
        </section>
    )
}

export default EditFirstClass

EditFirstClass.getLayout = function getLayout(page) {
    return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}
