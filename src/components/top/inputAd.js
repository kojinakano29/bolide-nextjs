import styles from '@/styles/top/components/form.module.scss'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { Btn1 } from '@/components/top/'

const InputAd = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useFormContext()

    const onSubmit = useCallback(
        async data => {
            // console.log(data)

            router.push('/ad/?confirm=1')
        },
        [router],
    )

    return (
        <>
            <div className={styles.adTop}>
                <p className={styles.catch}>
                    広告掲載企業様・ブランド様を募集しております。
                </p>
                <p className={styles.desc}>
                    Bolide's
                    Japanでは、プレスリリース、広告掲載、情報掲載に関するお問い合わせを
                    <br />
                    常に受け付けています。ブランドのニュースやコレクション情報、プロフィール紹介などや、
                    <br />
                    ショップ情報の掲載を希望される企業様・ブランド様は下記までご連絡下さい。
                </p>
                <p className={styles.desc2}>
                    詳細の注意事項はこちらをご覧ください
                </p>
                <div className={styles.adFlex}>
                    <div className={styles.adLinkBox}>
                        <p className={styles.adTtl}>
                            ビジネスユーザー向け
                            <br />
                            媒体資料
                        </p>
                        <Btn1
                            txt="MEDIA GUIDEはこちら"
                            link="/top/files/business.pdf"
                            blank
                        />
                    </div>
                    <div className={styles.adLinkBox}>
                        <p className={styles.adTtl}>
                            個人ユーザー向け
                            <br />
                            媒体資料
                        </p>
                        <Btn1
                            txt="MEDIA GUIDEはこちら"
                            link="/top/files/individual.pdf"
                            blank
                        />
                    </div>
                </div>
                <div className={styles.adFlex}>
                    <div className={styles.adLinkBox}>
                        <p className={styles.adTtl}>
                            LIONDOR
                            <br />
                            広告掲載について
                        </p>
                        <Btn1
                            txt="MEDIA GUIDEはこちら"
                            link="/top/files/liondor_ad.pdf"
                            blank
                        />
                    </div>
                    <div className={styles.adLinkBox}>
                        <p className={styles.adTtl}>
                            Della Mall
                            <br />
                            広告掲載について
                        </p>
                        <Btn1
                            txt="MEDIA GUIDEはこちら"
                            link="/top/files/dellamall_ad.pdf"
                            blank
                        />
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <article className={styles.formContent}>
                    <p className={styles.catch}>
                        お申込みは下記のフォームをご利用ください。担当よりご連絡いたします。
                    </p>
                    <dl>
                        <dt>
                            お問い合わせ内容
                            <span className={styles.require}>必須</span>
                        </dt>
                        <dd className={styles.checkbox}>
                            <label>
                                <input
                                    type="checkbox"
                                    value="掲載内容について"
                                    {...register('content', { required: true })}
                                />
                                掲載内容について
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="掲載希望について"
                                    {...register('content', { required: true })}
                                />
                                掲載希望について
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="その他"
                                    {...register('content', { required: true })}
                                />
                                その他
                            </label>
                            {errors.content && (
                                <p className={`red ${styles.error}`}>
                                    この項目は必須です
                                </p>
                            )}
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <label htmlFor="name">お名前</label>
                            <span className={styles.require}>必須</span>
                        </dt>
                        <dd className={styles.inputFlex}>
                            <input
                                id="name"
                                type="text"
                                {...register('name1', { required: true })}
                                placeholder="山田"
                            />
                            <input
                                type="text"
                                {...register('name2', { required: true })}
                                placeholder="太郎"
                            />
                            {errors.name1 && (
                                <p className={`red ${styles.error}`}>
                                    この項目は必須です
                                </p>
                            )}
                            {errors.name2 && (
                                <p className={`red ${styles.error}`}>
                                    この項目は必須です
                                </p>
                            )}
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <label htmlFor="store_name">会社・店名</label>
                            <span className={styles.any}>任意</span>
                        </dt>
                        <dd>
                            <input
                                id="store_name"
                                type="text"
                                {...register('store_name')}
                                placeholder="株式会社サンプル"
                            />
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <label htmlFor="email">メールアドレス</label>
                            <span className={styles.require}>必須</span>
                        </dt>
                        <dd>
                            <input
                                id="email"
                                type="email"
                                {...register('email', { required: true })}
                                placeholder="yourmail@example.jp"
                            />
                            {errors.email && (
                                <p className={`red ${styles.error}`}>
                                    この項目は必須です
                                </p>
                            )}
                            <p className={styles.small}>
                                ※携帯電話メールアドレスをご利用の場合は、必ず送信前に『携帯メールフィルタの解除』を行ってください。
                            </p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <label htmlFor="tel">電話番号</label>
                            <span className={styles.require}>必須</span>
                        </dt>
                        <dd>
                            <input
                                id="tel"
                                type="tel"
                                {...register('tel', { required: true })}
                                placeholder="00000000000"
                            />
                            {errors.tel && (
                                <p className={`red ${styles.error}`}>
                                    この項目は必須です
                                </p>
                            )}
                            <p className={styles.small}>※ハイフンなし</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <label htmlFor="message">メッセージ本文</label>
                            <span className={styles.any}>任意</span>
                        </dt>
                        <dd>
                            <textarea
                                id="message"
                                {...register('message')}
                                placeholder="できる限り具体的にご記入ください。"></textarea>
                        </dd>
                    </dl>
                    <div className={styles.privacyCheck}>
                        <p className={styles.require}>必須</p>
                        <p className={styles.txt}>
                            必ず「
                            <a href="/privacy">プライバシーポリシー</a>
                            」をご確認いただき、
                            <br />
                            ご同意のうえ、送信してください。
                        </p>
                        <label>
                            <input
                                type="checkbox"
                                {...register('privacy', { required: true })}
                            />
                            同意する
                        </label>
                        {errors.privacy && (
                            <p className={`red ${styles.error}`}>
                                この項目は必須です
                            </p>
                        )}
                    </div>
                    <Btn1 txt="確認する" submit />
                </article>
            </form>
        </>
    )
}

export default InputAd
