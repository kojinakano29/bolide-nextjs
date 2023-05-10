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
export const getServerSideProps = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_LIONDOR}/admin/collection/create`,
    )
    const data = await res.json()

    return {
        props: {
            posts: data,
        },
    }
}

const CreateCollection = ({ posts }) => {
    // console.log(posts)
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth', type: 'liondor' })

    const onLoadCheck = () => {
        alert('このページの閲覧権限がありません。')
        router.push(`/liondor`)
    }

    const onExistCheck = () => {
        csrf()

        axios
            .post('/api/liondor/collection/check')
            .then(res => {
                // console.log(res)
                if (res.data === 1) {
                    router.push(`/liondor/admin/collection/edit/${res.data}`)
                }
            })
            .catch(e => {
                console.error(e)
            })
    }

    useEffect(() => {
        if (user && user?.account_type < 2) {
            onLoadCheck()
        }

        if (user) {
            onExistCheck()
        }
    }, [user])

    const [disabled, setDisabled] = useState(false)
    const [cat, setCat] = useState([posts[0]])
    const [preview1, setPreview1] = useState()
    const [preview2, setPreview2] = useState()
    const [preview3, setPreview3] = useState()
    const [preview4, setPreview4] = useState()
    const previews = [
        { pos: '左', preview: preview1 },
        { pos: '左中', preview: preview2 },
        { pos: '右中', preview: preview3 },
        { pos: '右', preview: preview4 },
    ]
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onPostForm = useCallback(
        async data => {
            await csrf()

            const params = new FormData()
            Object.keys(data).forEach(function (key) {
                params.append(key, this[key])
            }, data)

            await axios
                .post('/api/liondor/admin/collection/store', params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(res => {
                    // console.log(res)
                    alert('COLLECTIONを作成しました。')
                    router.push({
                        pathname: '/liondor/admin/collection/edit/[pid]',
                        query: { pid: res.data.id },
                    })
                })
                .catch(e => {
                    console.error(e)
                })

            setDisabled(false)
        },
        [setDisabled],
    )

    const onSubmit = useCallback(
        data => {
            // console.log(data)
            setDisabled(true)

            onPostForm({
                user_id: user?.id,
                l_category_id: data.child_category,
                title: data.title,
                image1: data.image1[0],
                image2: data.image2[0],
                image3: data.image3[0],
                image4: data.image4[0],
                url: data.url,
                // view_date: data.view_data,
            })
        },
        [onPostForm, user, setDisabled],
    )

    const handleCat = e => {
        setCat(
            posts.filter(item => {
                return item.id.toString() === e.target.value
            }),
        )
    }

    const handleChangeFile = useCallback(
        async (e, num) => {
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
                    setPreview1('')
                } else if (num === 2) {
                    setPreview2('')
                } else if (num === 3) {
                    setPreview3('')
                } else if (num === 4) {
                    setPreview4('')
                }
            }
        },
        [setPreview1, setPreview2, setPreview3, setPreview4],
    )

    return (
        <section className={styles.createSection}>
            <PageTitle title="COLLECTION作成" />
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
                                {previews.map((pre, index) => (
                                    <dl className={styles.dl} key={index}>
                                        <dt className={styles.dt}>
                                            <label
                                                htmlFor={`image${index + 1}`}>
                                                サムネイル画像（{pre.pos}）
                                            </label>
                                        </dt>
                                        <dd className={styles.dd}>
                                            <input
                                                id={`image${index + 1}`}
                                                type="file"
                                                accept="image/*"
                                                {...register(
                                                    `image${index + 1}`,
                                                    { required: true },
                                                )}
                                                onChange={e =>
                                                    handleChangeFile(
                                                        e,
                                                        index + 1,
                                                    )
                                                }
                                            />
                                            {pre.preview ? (
                                                <img
                                                    src={pre.preview}
                                                    alt="プレビュー画像"
                                                />
                                            ) : null}
                                        </dd>
                                    </dl>
                                ))}
                                {errors.image1 ||
                                errors.image2 ||
                                errors.image3 ||
                                errors.image4 ? (
                                    <p className={`red ${styles.error}`}>
                                        サムネイル画像を全て入力してください
                                    </p>
                                ) : null}
                            </div>
                            <div className={styles.right}>
                                <button className="btn2" disabled={disabled}>
                                    新規作成
                                </button>
                                <div className={styles.hr}></div>
                                <dl className={styles.dl}>
                                    <dt className={styles.dt}>大カテゴリー</dt>
                                    <dd className={styles.dd}>
                                        <select
                                            {...register('l_category_id')}
                                            onChange={handleCat}>
                                            {posts.map((cat, index) => (
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

export default CreateCollection

CreateCollection.getLayout = function getLayout(page) {
    return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}
