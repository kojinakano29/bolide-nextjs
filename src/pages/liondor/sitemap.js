import styles from '@/styles/liondor/components/sitemap.module.scss'
import { PageTitle } from '@/components/liondor'
import Container from '@/components/liondor/Layouts/container'
import PageLayoutLiondor from '@/components/Layouts/PageLayoutLiondor'
import { sitemap } from '@/lib/liondor/constants'

const Sitemap = () => {
    return (
        <section className="cont1">
            <PageTitle title="SITE MAP" ivy />
            <Container small>
                {sitemap.map((item, index) => (
                    <div className={styles.block} key={index}>
                        <h3 className="ivy">{item.cat}</h3>
                        <div className={styles.flex}>
                            {item.group.map((gr, index) => (
                                <a href={gr.link} key={index} className="en">
                                    {gr.name}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
                <div className={styles.block}>
                    <h3 className="ivy">
                        <a className="ivy" href="/liondor/#pickUp">
                            Pickup Information
                        </a>
                    </h3>
                    {/* <div className={styles.flex}>
            <a href="">Information</a>
            <a href="">Influencer</a>
            <a href="/liondor/present">Present</a>
            <a href="">Others</a>
          </div> */}
                </div>
                <div className={styles.flex2}>
                    <a href="/liondor/contact" className="ivy">
                        CONTACT
                    </a>
                    <div className={styles.hr}></div>
                    {/* <a href="/liondor/faq" className="ivy">FAQ</a>
          <div className={styles.hr}></div> */}
                    <a href="/liondor/sitemap" className="ivy">
                        SITE MAP
                    </a>
                    <div className={styles.hr}></div>
                    <a
                        href="https://bolides.co.jp/company/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ivy">
                        COMPANY
                    </a>
                    <div className={styles.hr}></div>
                    <a href="/liondor/registration" className="ivy">
                        ABOUT LIONDOR
                    </a>
                </div>
            </Container>
        </section>
    )
}

export default Sitemap

Sitemap.getLayout = function getLayout(page) {
    return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}
