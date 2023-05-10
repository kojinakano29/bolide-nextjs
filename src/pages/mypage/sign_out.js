import styles from '@/styles/top/components/sign_out.module.scss'
import PageLayoutTop from '@/components/Layouts/pageLayoutTop'
import Container from '@/components/top/Layout/container'
import { Btn1 } from '@/components/top'
import { useCallback, useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'

const SignOut = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth', type: 'bjc' })
    const [disabled, setDisabled] = useState(false)
    const [c_check, setC_check] = useState(true)
    const [o_check, setO_check] = useState(true)

    const onLoadCheck = async () => {
        csrf()

        axios
            .post(`/api/subscription/use_check/`, {
                user_id: user?.id,
                db_name: 'corporate',
            })
            .then(res => {
                // console.log(res)
                if (!res.data) {
                    setC_check(false)
                }
            })
            .catch(e => console.error(e))

        await axios
            .post(`/api/subscription/use_check/`, {
                user_id: user?.id,
                db_name: 'option',
            })
            .then(res => {
                // console.log(res)
                if (!res.data) {
                    setO_check(false)
                }
            })
            .catch(e => console.error(e))
    }

    useEffect(() => {
        if (user) {
            onLoadCheck()
        }
    }, [user])

    const handleClickSignOut = useCallback(async () => {
        if (c_check || o_check) return
        setDisabled(true)
        await csrf()

        await axios
            .delete(`/api/delete/user/${user?.id}`)
            .then(res => {
                // console.log(res)
                alert(res.data)
                router.push({
                    pathname: '/',
                })
            })
            .catch(e => console.error(e))

        await setDisabled(false)
    }, [user, disabled, setDisabled])

    return (
        <section className="cont1">
            <Container small900>
                <h2 className="ttl2">退会申請</h2>
                <div className="breadcrumbBox">
                    <a href="/">トップ</a>
                    <div>
                        <img src="/top/breadcrumb.svg" alt=">" />
                    </div>
                    <a href="/mypage">マイページ</a>
                    <div>
                        <img src="/top/breadcrumb.svg" alt=">" />
                    </div>
                    <p>退会申請</p>
                </div>
                <div className={styles.signOutBox}>
                    <div className={styles.signOutIcon}>
                        <img src="/top/sign_out.svg" alt="注意アイコン" />
                    </div>
                    <p className={styles.desc}>
                        退会手続きを実行します。
                        <br />
                        注意事項をよくご確認の上、退会をお願いします。
                    </p>
                    <div className={styles.txtBox}>
                        <div>ご注意</div>
                        <dl>
                            <dt className="en">1</dt>
                            <dd>
                                退会手続き後、Bolide's Japan
                                IDでご利用されているすべてのサービスの利用停止を行います。
                                <br />
                                有料登録をされている場合は、「
                                <a href={`/mypage/plan/${user?.id}`}>
                                    プラン確認
                                </a>
                                」画面より先にサブスクリプションの解約を行ってください。「
                                <a href={`/mypage/option/${user?.id}`}>募金</a>
                                」のサブスクリプションにも登録している方は「
                                <a href={`/mypage/option/${user?.id}`}>募金</a>
                                」画面よりサブスクリプションの解約を行ってください。
                                <br />
                                サブスクリプションの解約を行わないまま、本ページで退会手続きを行うとサブスクリプション契約が継続された状態となってしまいます。
                            </dd>
                            <dt className="en">2</dt>
                            <dd>
                                ご申請いただいた情報は、有料サービスのお申込みをされているご本人様からの申請であることを確認するために利用します。ほかの目的で利用することはありません。
                                <br />
                                ご入力いただく前に、安全のため、本フォームのURLが「https://bolides-japan.com/」で始まることをご確認ください。
                            </dd>
                            <dt className="en">3</dt>
                            <dd>
                                JSを有効にして申請フォームをご利用下さい。無効になっていますとスマホでの申請フォームがご利用できません。
                            </dd>
                        </dl>
                    </div>
                    <p className={styles.desc2}>
                        下記、退会ボタンを推す前に再度サブスクリプションの解約確認をお願いします。
                        <br />
                        下記ボタンを押すと退会手続きを実行します。
                        <br />
                        お客様の情報は<span>すべて削除</span>
                        されますがよろしいでしょうか？
                    </p>
                    <div className={styles.btnBox}>
                        <div
                            className={`btnCover ${
                                c_check || o_check ? styles.hold : null
                            }`}
                            onClick={handleClickSignOut}>
                            <Btn1 txt="はい、退会します" />
                        </div>
                        <a href="/mypage" className={`btn1 ${styles.btn}`}>
                            いいえ、退会しません
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default SignOut

SignOut.getLayout = function getLayout(page) {
    return <PageLayoutTop>{page}</PageLayoutTop>
}
