import styles from '@/styles/corapura/components/editor.module.scss'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from '@/lib/axios'
import Container from './Layout/container'
import { Loader } from '@/components/corapura'
import { UserContext } from '@/pages/corapura/editor/user/[id]'
import { socialNetworkingService } from '@/lib/corapura/constants'

const EditUserForm = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const {
        profile,
        option,
        type,
        targetId,
        setSns,
        setCards,
        setLikes,
        handleClickCreate,
        handleClickEdit,
        disabled,
        setDisabled,
        editData,
        setEditData,
    } = useContext(UserContext)

    const [preview, setPreview] = useState()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
    })

    const onLoadDefault = async () => {
        if (type === 'card') {
            setValue('cardTitle', editData.title)
            setPreview(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${editData.thumbs}`,
            )
        } else if (type === 'like') {
            setValue('likeTitle', editData.title)
            setValue('likeTxt', editData.text)
            setPreview(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${editData.thumbs}`,
            )
        } else if (type === 'sns') {
            setValue('snsName', editData.name)
            setValue('snsUrl', editData.url)
            setValue('snsFollower', editData.follower)
        }
    }

    useEffect(() => {
        if (!disabled) {
            onLoadDefault()
        }
    }, [disabled])

    const onSubmitCard = async data => {
        // console.log(data)
        if (disabled) return
        setDisabled(true)
        await csrf()

        const datas = {
            c_profile_id: profile.id,
            title: data.cardTitle,
            thumbs:
                data.cardThumbs && data.cardThumbs?.length !== 0
                    ? data.cardThumbs[0]
                    : editData.thumbs,
        }

        const params = new FormData()
        Object.keys(datas).forEach(function (key) {
            params.append(key, this[key])
        }, datas)

        await axios
            .post(`/api/corapura/card/update/${targetId}`, params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => {
                // console.log(res)
                setCards(res.data)
                alert('編集しました。')
                handleClickCreate(type)
            })
            .catch(e => {
                console.error(e)
                alert('編集できませんでした。')
            })

        await setDisabled(false)
    }

    const onSubmitLike = async data => {
        // console.log(data)
        if (disabled) return
        setDisabled(true)
        await csrf()

        const datas = {
            c_profile_id: profile.id,
            title: data.likeTitle,
            text: data.likeTxt,
            thumbs:
                data.likeThumbs && data.likeThumbs?.length !== 0
                    ? data.likeThumbs[0]
                    : editData.thumbs,
        }

        const params = new FormData()
        Object.keys(datas).forEach(function (key) {
            params.append(key, this[key])
        }, datas)

        await axios
            .post(`/api/corapura/like/update/${targetId}`, params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => {
                // console.log(res)
                setLikes(res.data)
                alert('編集しました。')
                handleClickCreate(type)
            })
            .catch(e => {
                console.error(e)
                alert('編集できませんでした。')
            })

        await setDisabled(false)
    }

    const onSubmitSns = async data => {
        // console.log(data)
        if (disabled) return
        setDisabled(true)
        await csrf()

        await axios
            .post(`/api/corapura/mypage/c_user_social/update/${targetId}`, {
                c_user_profile_id: option.id,
                name: data.snsName,
                url: data.snsUrl,
                follower: data.snsFollower,
            })
            .then(res => {
                // console.log(res)
                setSns(res.data)
                alert('編集しました。')
                handleClickCreate(type)
            })
            .catch(e => {
                console.error(e)
                alert('編集できませんでした。')
            })

        await setDisabled(false)
    }

    const handleChangeFile = useCallback(
        e => {
            const { files } = e.target
            if (files[0]) {
                setPreview(window.URL.createObjectURL(files[0]))
            } else {
                setPreview(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${editData.thumbs}`,
                )
            }
        },
        [setPreview],
    )

    return (
        <section
            className={styles.popupArea}
            onClick={() => handleClickCreate(type)}>
            <Container small900>
                <div
                    className={styles.popupBox}
                    onClick={e => e.stopPropagation()}>
                    <h4 className={styles.midashi}>
                        {type === 'sns' ? 'SNSリンク先' : null}
                        {type === 'card' ? '名刺' : null}
                        {type === 'like' ? '推し活・ホビー' : null}
                        編集
                    </h4>
                    {disabled ? (
                        <Loader />
                    ) : (
                        <article className={styles.formArea}>
                            {/* SNS */}
                            {type === 'sns' ? (
                                <form onSubmit={handleSubmit(onSubmitSns)}>
                                    <dl>
                                        <dt>
                                            <label htmlFor="snsName">
                                                SNS名
                                            </label>
                                        </dt>
                                        <dd>
                                            <select {...register('snsName')}>
                                                {socialNetworkingService.map(
                                                    (name, index) => (
                                                        <option
                                                            value={name}
                                                            key={index}>
                                                            {name}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            <label htmlFor="snsUrl">
                                                リンク先
                                            </label>
                                        </dt>
                                        <dd>
                                            <input
                                                type="url"
                                                id="snsUrl"
                                                {...register('snsUrl', {
                                                    required: true,
                                                })}
                                            />
                                            {errors.snsUrl && (
                                                <p className={styles.error}>
                                                    必須項目を入力してください
                                                </p>
                                            )}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            <label htmlFor="snsFollower">
                                                フォロワー数
                                            </label>
                                        </dt>
                                        <dd>
                                            <input
                                                type="text"
                                                id="snsFollower"
                                                {...register('snsFollower', {
                                                    required: true,
                                                })}
                                            />
                                            {errors.snsFollower && (
                                                <p className={styles.error}>
                                                    必須項目を入力してください
                                                </p>
                                            )}
                                        </dd>
                                    </dl>
                                    <button
                                        className={`${styles.btn} hoverEffect`}>
                                        編集
                                    </button>
                                </form>
                            ) : null}
                            {/* SNS */}

                            {/* 名刺 */}
                            {type === 'card' ? (
                                <form onSubmit={handleSubmit(onSubmitCard)}>
                                    <dl>
                                        <dt>
                                            <label htmlFor="cardTitle">
                                                タイトル
                                            </label>
                                        </dt>
                                        <dd>
                                            <input
                                                type="text"
                                                id="cardTitle"
                                                {...register('cardTitle', {
                                                    required: true,
                                                })}
                                            />
                                            {errors.cardTitle && (
                                                <p className={styles.error}>
                                                    必須項目を入力してください
                                                </p>
                                            )}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            <label htmlFor="cardThumbs">
                                                写真
                                            </label>
                                        </dt>
                                        <dd>
                                            <div className={styles.imgBox}>
                                                {preview ? (
                                                    <img
                                                        src={preview}
                                                        alt="名刺のプレビュー"
                                                    />
                                                ) : (
                                                    <div
                                                        className={
                                                            styles.imgNone
                                                        }></div>
                                                )}
                                            </div>
                                            <p className={styles.reco_size}>
                                                推奨画像サイズ：352×208
                                            </p>
                                            <input
                                                type="file"
                                                id="cardThumbs"
                                                accept="image/*"
                                                {...register('cardThumbs')}
                                                onChange={handleChangeFile}
                                            />
                                        </dd>
                                    </dl>
                                    <button
                                        className={`${styles.btn} hoverEffect`}>
                                        編集
                                    </button>
                                </form>
                            ) : null}
                            {/* 名刺 */}

                            {/* 推し活・ホビー編集 */}
                            {type === 'like' ? (
                                <form onSubmit={handleSubmit(onSubmitLike)}>
                                    <dl>
                                        <dt>
                                            <label htmlFor="likeTitle">
                                                タイトル
                                            </label>
                                        </dt>
                                        <dd>
                                            <input
                                                type="text"
                                                id="likeTitle"
                                                {...register('likeTitle', {
                                                    required: true,
                                                })}
                                            />
                                            {errors.likeTitle && (
                                                <p className={styles.error}>
                                                    必須項目を入力してください
                                                </p>
                                            )}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            <label htmlFor="likeTxt">
                                                紹介文
                                            </label>
                                        </dt>
                                        <dd>
                                            <input
                                                type="text"
                                                id="likeTxt"
                                                {...register('likeTxt', {
                                                    required: true,
                                                })}
                                            />
                                            {errors.likeTxt && (
                                                <p className={styles.error}>
                                                    必須項目を入力してください
                                                </p>
                                            )}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            <label htmlFor="likeThumbs">
                                                写真
                                            </label>
                                        </dt>
                                        <dd>
                                            <div className={styles.imgBox}>
                                                {preview ? (
                                                    <img
                                                        src={preview}
                                                        alt="推し活・ホビーのプレビュー"
                                                    />
                                                ) : (
                                                    <div
                                                        className={
                                                            styles.imgNone
                                                        }></div>
                                                )}
                                            </div>
                                            <p className={styles.reco_size}>
                                                推奨画像サイズ：198×198
                                            </p>
                                            <input
                                                type="file"
                                                id="likeThumbs"
                                                accept="image/*"
                                                {...register('likeThumbs')}
                                                onChange={handleChangeFile}
                                            />
                                        </dd>
                                    </dl>
                                    <button
                                        className={`${styles.btn} hoverEffect`}>
                                        編集
                                    </button>
                                </form>
                            ) : null}
                            {/* 推し活・ホビー編集 */}
                        </article>
                    )}
                </div>
            </Container>
        </section>
    )
}

export default EditUserForm
