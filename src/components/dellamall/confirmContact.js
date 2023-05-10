import axios from '@/lib/axios'
import styles from '@/styles/dellamall/components/form.module.scss'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import Btn01 from './btn01'

const ConfirmContact = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const {
        handleSubmit,
        getValues,
        formState: { isValid },
    } = useFormContext()
    const values = getValues()

    useEffect(() => {
        if (!isValid) {
            router.push('/dellamall/contact')
        }
    }, [])

    const handleBack = useCallback(() => {
        router.back()
    }, [router])

    const onContactForm = useCallback(
        async data => {
            await csrf()

            await axios
                .post('/api/dellamall/contact', data)
                .then(res => {
                    // console.log(res)
                    sessionStorage.setItem('dellamallContact', true)
                    router.push('/dellamall/contact/thanks')
                })
                .catch(e => {
                    console.error(e)
                })
        },
        [router],
    )

    const onSubmit = useCallback(
        async data => {
            // console.log(data)

            onContactForm({
                type: values.type,
                url: values.url,
                name: values.name,
                furigana: values.furigana,
                company: values.company,
                mail: values.mail,
                tel: values.tel,
                content: values.content,
            })
        },
        [onContactForm, values],
    )

    return (
        <>
            <div className={styles.desc}>
                <p className={styles.big}>入力内容をご確認ください。</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <article
                    className={`${styles.formContent} ${styles.confirmContent}`}>
                    <dl className={styles.dl}>
                        <dt>
                            <span className={styles.require}>必須</span>
                            お問い合わせ種別
                        </dt>
                        <dd>
                            <ul className={styles.ul}>
                                {values.type?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </dd>
                    </dl>
                    <dl className={styles.dl}>
                        <dt>
                            <span className={styles.require}>必須</span>
                            URL
                        </dt>
                        <dd>{values.url}</dd>
                    </dl>
                    <dl className={styles.dl}>
                        <dt>
                            <span className={styles.require}>必須</span>
                            お名前
                        </dt>
                        <dd>{values.name}</dd>
                    </dl>
                    <dl className={styles.dl}>
                        <dt>
                            <span className={styles.any}>任意</span>
                            フリガナ
                        </dt>
                        <dd>{values.furigana}</dd>
                    </dl>
                    <dl className={styles.dl}>
                        <dt>
                            <span className={styles.any}>任意</span>
                            会社名
                        </dt>
                        <dd>{values.company}</dd>
                    </dl>
                    <dl className={styles.dl}>
                        <dt>
                            <span className={styles.require}>必須</span>
                            メールアドレス
                        </dt>
                        <dd>{values.mail}</dd>
                    </dl>
                    <dl className={styles.dl}>
                        <dt>
                            <span className={styles.require}>必須</span>
                            電話番号
                        </dt>
                        <dd>{values.tel}</dd>
                    </dl>
                    <dl className={styles.dl}>
                        <dt>
                            <span className={styles.require}>必須</span>
                            お問い合わせ内容
                        </dt>
                        <dd>{values.content}</dd>
                    </dl>
                    <Btn01 txt="送信する" />
                    <button
                        type="button"
                        className={styles.backBtn}
                        onClick={handleBack}>
                        戻る
                    </button>
                </article>
            </form>
        </>
    )
}

export default ConfirmContact
