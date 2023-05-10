import { useAuth } from '@/hooks/auth'
import styles from '@/styles/top/components/header.module.scss'
import { useCallback, useEffect, useState } from 'react'
import Container from './Layout/container'

const Header = () => {
    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(false)

    const handleClickHum = useCallback(async () => {
        setOpen(prevState => !prevState)
    }, [setOpen])

    const scrollEvent = useCallback(() => {
        const offset = window.scrollY

        if (offset > 500) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [setActive])

    useEffect(() => {
        window.addEventListener('scroll', scrollEvent)
        return () => window.removeEventListener('scroll', scrollEvent)
    }, [scrollEvent])

    return (
        <header className={`${styles.header} ${active ? styles.active : null}`}>
            <div className={`${styles.humBox} ${open ? styles.active : null}`}>
                <Container>
                    <div className={styles.headerFlex}>
                        <h1 className={styles.logo}>
                            <a href="/" className="hoverEffect">
                                <img src="/top/logo.svg" alt="Bolide's Japan" />
                            </a>
                        </h1>
                        <ul className={styles.nav}>
                            <li className={`${styles.type1} pc`}>
                                <a href="/#about" className="hoverEffect">
                                    Bolide's Japanとは？
                                </a>
                            </li>
                            <li className={`${styles.type1} pc`}>
                                <a href="/#plan" className="hoverEffect">
                                    料金プラン
                                </a>
                            </li>
                            <li className={`${styles.type1} pc`}>
                                <a href="/#faq" className="hoverEffect">
                                    よくあるご質問
                                </a>
                            </li>
                            <li className={styles.type2}>
                                <a
                                    href="/contact"
                                    className={`${styles.btn} hoverEffect`}>
                                    <img
                                        src="/top/mail-icon.svg"
                                        alt="メールのアイコン"
                                    />
                                    <span>お問い合わせ</span>
                                </a>
                                <a
                                    href={user ? '/mypage' : '/login'}
                                    className={`${styles.btn} ${styles.color1} hoverEffect`}>
                                    <img
                                        src={`/top/${
                                            user
                                                ? 'mypage-icon.svg'
                                                : 'login-icon.svg'
                                        }`}
                                        alt="ログインアイコン"
                                    />
                                    <span>
                                        {user ? 'マイページ' : 'ログイン'}
                                    </span>
                                </a>
                                <a
                                    href="/register"
                                    className={`${styles.btn} ${styles.color2} hoverEffect`}>
                                    <img
                                        src="/top/registar-icon.svg"
                                        alt="会員登録のアイコン"
                                    />
                                    <span>会員登録</span>
                                </a>
                            </li>
                            <li className={`${styles.type3} sp`}>
                                <button
                                    type="button"
                                    className={open ? styles.active : null}
                                    onClick={handleClickHum}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <ul className={styles.humNav}>
                        <li>
                            <a href="/#about">Bolide's Japanとは？</a>
                        </li>
                        <li>
                            <a href="/#plan">料金プラン</a>
                        </li>
                        <li>
                            <a href="/#faq">よくあるご質問</a>
                        </li>
                    </ul>
                </Container>
            </div>
        </header>
    )
}

export default Header
