import styles from '@/styles/top/components/footer.module.scss'
import { useCallback, useEffect, useState } from 'react'
import Container from './Layout/container'
import { animateScroll as scroll } from 'react-scroll'
import { useRouter } from 'next/router'

const Footer = () => {
    const router = useRouter()

    const scrollTop = useCallback(() => {
        scroll.scrollToTop()
    }, [])

    const [show, setShow] = useState(false)

    const handleScroll = useCallback(() => {
        const nowPos = window.scrollY

        if (nowPos > 500) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [setShow])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <footer className={styles.footer}>
                <Container>
                    <a href="/" className={`${styles.logo} hoverEffect`}>
                        <img src="/top/logo.svg" alt="Bolide's Japan" />
                    </a>
                    <ul className={styles.listFlex}>
                        <li className="hoverEffect">
                            <a
                                href="https://bolides.co.jp/company/"
                                target="_blank"
                                rel="noopener noreferrer">
                                運営会社
                            </a>
                        </li>
                        <li className="pc">|</li>
                        <li className="hoverEffect">
                            <a href="/#faq">よくある質問</a>
                        </li>
                        <li className="pc">|</li>
                        <li className="hoverEffect">
                            <a href="/terms">利用規約</a>
                        </li>
                        <li className="pc">|</li>
                        <li className="hoverEffect">
                            <a href="/privacy">プライバシーポリシー</a>
                        </li>
                        <li className="pc">|</li>
                        <li className="hoverEffect">
                            <a href="/ad">媒体資料・広告掲載について</a>
                        </li>
                        <li className="pc">|</li>
                        <li className="hoverEffect">
                            <a href="/tokushoho">特定商取引法に基づく表示</a>
                        </li>
                        <li className="pc">|</li>
                        <li className="hoverEffect">
                            <a href="/contact">お問い合わせ</a>
                        </li>
                    </ul>
                    <p className={`${styles.copy} en`}>
                        © 2023 Bolide's Japan inc.
                    </p>
                </Container>
            </footer>

            <button
                type="button"
                className={`${styles.topBtn} ${show ? styles.active : null} ${
                    router.pathname === '/' ? styles.top : null
                } hoverEffect`}
                onClick={scrollTop}>
                <img src="/top/pagetop.svg" alt="TOPへ戻るアイコン" />
            </button>
        </>
    )
}

export default Footer
