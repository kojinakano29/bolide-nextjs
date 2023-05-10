import styles from '@/styles/dellamall/components/footer.module.scss'
import Container from '@/components/dellamall/Layouts/container'
import Image from 'next/image'
import logo from '@/images/dellamall/parts/footer/footer__logo.svg'
import bolides from '@/images/dellamall/parts/footer/bolides.svg'
import marchedor from '@/images/dellamall/parts/footer/marchedor.svg'
import corapura from '@/images/dellamall/parts/footer/corapura.svg'
import liondor from '@/images/dellamall/parts/footer/liondor.svg'
import top from '@/images/dellamall/parts/common/to-top.svg'
import { animateScroll as scroll } from 'react-scroll'
import { useCallback, useEffect, useState } from 'react'

const Footer = () => {
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
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <button
                className={`
					${styles.topBtn}
					${show ? styles.active : ''}
					hoverEffect
					pc
				`}
                onClick={scrollTop}>
                <Image
                    src={top}
                    alt="TOPへ戻る"
                    layout="responsive"
                    sizes="56px"
                    priority
                />
            </button>
            <footer className={styles.footer}>
                <Container small>
                    <a
                        href="/dellamall"
                        className={`${styles.logo} hoverEffect`}>
                        <Image
                            src={logo}
                            alt="Della Mall"
                            layout="responsive"
                            sizes="144px"
                            priority
                        />
                    </a>
                    <div className={styles.footer__listCompany}>
                        <p className={`${styles.footer__listCompany__text} en`}>
                            Bolide's Japan Other Sites
                        </p>
                        <a
                            href="/"
                            className="hoverEffect"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Image
                                src={bolides}
                                alt="Bolide's Japan"
                                layout="responsive"
                                sizes="240px"
                                priority
                            />
                        </a>
                        <a
                            href="https://marche-dor.jp/"
                            className="hoverEffect"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Image
                                src={marchedor}
                                alt="Marche Dor"
                                layout="responsive"
                                sizes="240px"
                                priority
                            />
                        </a>
                        <a
                            href="/corapura"
                            className="hoverEffect"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Image
                                src={corapura}
                                alt="CORAPURA"
                                layout="responsive"
                                sizes="240px"
                                priority
                            />
                        </a>
                        <a
                            href="/liondor"
                            className="hoverEffect"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Image
                                src={liondor}
                                alt="LIONDOR"
                                layout="responsive"
                                sizes="240px"
                                priority
                            />
                        </a>
                    </div>
                    <div className={styles.footer__listPage}>
                        <a
                            className="hoverEffect"
                            href="https://bolides.co.jp/company/"
                            target="_blank"
                            rel="noopener noreferrer">
                            運営会社
                        </a>
                        <a href="/dellamall/terms" className="hoverEffect">
                            利用規約
                        </a>
                        <a href="/privacy" className="hoverEffect">
                            プライバシーポリシー
                        </a>
                        <a href="/tokushoho" className="hoverEffect">
                            特定商取引法に基づく表示
                        </a>
                        <a href="/ad" className="hoverEffect">
                            媒体資料・広告掲載について
                        </a>
                        <a href="/dellamall/contact" className="hoverEffect">
                            お問い合わせ
                        </a>
                    </div>
                    <div className={styles.footer__text}>
                        このサイトはreCAPTHAによって保護されており、
                        <br />
                        Googleの
                        <a
                            href="https://policies.google.com/privacy?hl=ja"
                            target="_blank">
                            プライバシーポリシー
                        </a>
                        と
                        <a
                            href="https://policies.google.com/terms?hl=ja"
                            target="_blank">
                            利用規約
                        </a>
                        が適応されます。
                    </div>
                    <p className={`${styles.copy} en`}>
                        © 2023 Della Mall inc.
                    </p>
                </Container>
            </footer>
        </>
    )
}

export default Footer
