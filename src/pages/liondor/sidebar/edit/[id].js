import styles from '@/styles/liondor/components/createPost.module.scss'
import axios from '@/lib/axios' // カスタムフック
import { useCallback, useEffect, useState } from 'react'
import { PageTitle, PostEditor } from '@/components/liondor'
import { useForm } from 'react-hook-form'
import Container from '@/components/liondor/Layouts/container'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import PageLayoutLiondor from '@/components/Layouts/PageLayoutLiondor'

// SSR
export const getServerSideProps = async ({ params }) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_LIONDOR}/sidebar/edit/${params.id}`,
    )
    const data = await res.json()

    return {
        props: {
            posts: data,
        },
    }
}

const SidebarEdit = ({ posts }) => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth', type: 'liondor' })

    useEffect(() => {
        onLoadCheck()
    }, [user])

    const onLoadCheck = () => {
        if (user?.account_type < 3) {
            alert('このページにはアクセスできません。')
            router.push(`/liondor`)
        }
    }

    const [editorContent, setEditorContent] = useState(posts.content)
    const [disabled, setDisabled] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: posts.title,
            state: posts.state,
            order: posts.order,
        },
    })

    const onPostForm = useCallback(async data => {
        await csrf()

        const params = new FormData()
        Object.keys(data).forEach(function (key) {
            params.append(key, this[key])
        }, data)

        await axios
            .post(`/api/liondor/sidebar/update/${posts.id}`, params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => {
                // console.log(res)
                alert('更新しました。')
                setDisabled(false)
            })
            .catch(e => {
                console.error(e)
            })
    }, [])

    const onSubmit = useCallback(
        data => {
            // console.log(data)
            setDisabled(true)

            onPostForm({
                title: data.title,
                content: editorContent,
                order: data.order,
                state: data.state,
            })
        },
        [onPostForm, editorContent],
    )

    const [state, setState] = useState(() => {
        return posts.state === 1 ? true : false
    })
    const handleState = useCallback(() => {
        setState(prevState => !prevState)
    }, [])

    return (
        <section className={styles.createSection}>
            <PageTitle title="サイドバー編集" />
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
                                                required: state,
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
                                    <dt className={styles.dt}>本文</dt>
                                    <dd className={styles.dd}>
                                        <PostEditor
                                            handleChange={editorContent => {
                                                setEditorContent(editorContent)
                                            }}
                                            value={editorContent}
                                            uploadPath={`/api/liondor/sidebar/imagesave`}
                                        />
                                    </dd>
                                </dl>
                            </div>
                            <div className={styles.right}>
                                <dl className={styles.dl}>
                                    <dt className={styles.dt}>公開状態</dt>
                                    <dd className={styles.dd}>
                                        <select
                                            {...register('state')}
                                            onChange={handleState}>
                                            <option value="0">下書き</option>
                                            <option value="1">公開済み</option>
                                        </select>
                                    </dd>
                                </dl>
                                <button className="btn2" disabled={disabled}>
                                    更新
                                </button>
                                <div className={styles.hr}></div>
                                <dl className={styles.dl}>
                                    <dt className={styles.dt}>
                                        <label htmlFor="order">順番</label>
                                    </dt>
                                    <dd className={styles.dd}>
                                        <input
                                            type="number"
                                            id="order"
                                            {...register('order')}
                                        />
                                    </dd>
                                </dl>
                                <a
                                    href={`/liondor/admin/sidebar`}
                                    className="btn2">
                                    一覧へ戻る
                                </a>
                            </div>
                        </article>
                    </form>
                </Container>
            ) : null}
        </section>
    )
}

export default SidebarEdit

SidebarEdit.getLayout = function getLayout(page) {
    return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}
