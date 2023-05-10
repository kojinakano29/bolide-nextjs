import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import styles from '@/styles/top/components/form.module.scss'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Btn1 } from '@/components/top/'

const ConfirmContact = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const { user } = useAuth()

    const [disabled, setDisabled] = useState(false)
    const {
        handleSubmit,
        getValues,
        formState: { isValid },
    } = useFormContext()

    const values = getValues()

    useEffect(() => {
        if (!isValid) {
            router.push({
                pathname: '/contact',
            })
        }
    }, [])

    const handleBack = useCallback(async () => {
        router.back()
    }, [router])

    const onContactForm = useCallback(
        async data => {
            await csrf()

            await axios
                .post('/api/bolides_japan/contact_form', data)
                .then(res => {
                    // console.log(res)
                    sessionStorage.setItem('contact', true)
                    router.push({
                        pathname: '/contact/thanks',
                    })
                })
                .catch(e => console.error(e))

            setDisabled(false)
        },
        [router, setDisabled],
    )

    const onSubmit = useCallback(
        async data => {
            // console.log(data)
            setDisabled(true)

            onContactForm({
                user_id: user?.id,
                content: values.content,
                name: `${values.name1}${values.name2}`,
                furigana: `${values.furigana1}${values.furigana2}`,
                email: values.email,
                tel: values.tel,
                message: values.message,
            })
        },
        [onContactForm, setDisabled, user],
    )

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <article className={styles.formContent}>
                    <p className={styles.catch}>入力内容をご確認ください。</p>
                    <dl>
                        <dt>
                            お問い合わせ内容
                            <span className={styles.require}>必須</span>
                        </dt>
                        <dd className={styles.checkbox}>
                            <ul className={styles.ul}>
                                {values.content?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            お名前
                            <span className={styles.require}>必須</span>
                        </dt>
                        <dd>{`${values.name1}${values.name2}`}</dd>
                    </dl>
                    <dl>
                        <dt>
                            フリガナ
                            <span className={styles.require}>必須</span>
                        </dt>
                        <dd>{`${values.furigana1}${values.furigana2}`}</dd>
                    </dl>
                    <dl>
                        <dt>
                            メールアドレス
                            <span className={styles.require}>必須</span>
                        </dt>
                        <dd>{values.email}</dd>
                    </dl>
                    <dl>
                        <dt>
                            電話番号
                            <span className={styles.require}>必須</span>
                        </dt>
                        <dd>{values.tel}</dd>
                    </dl>
                    <dl>
                        <dt>
                            メッセージ本文
                            <span className={styles.any}>任意</span>
                        </dt>
                        <dd>{values.message}</dd>
                    </dl>
                    <div className={styles.btnFlex}>
                        <div className={styles.type2} onClick={handleBack}>
                            <Btn1 txt="戻る" />
                        </div>
                        <div>
                            <Btn1 txt="送信する" submit disabled={disabled} />
                        </div>
                    </div>
                </article>
            </form>
        </>
    )
}

export default ConfirmContact
