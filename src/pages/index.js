import styles from '@/styles/components/home.module.scss'
import { BlogPattern1, BlogPattern2, BlogPattern3, BlogPattern4, BlogPattern5, BlogPattern6, BlogPattern7, BlogPattern8, BlogPattern9, Button2, FirstClass, Meta } from '@/components'
import PageLayout from '@/components/Layouts/PageLayout'
import Container from '@/components/Layouts/container'

export const getServerSideProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/`)
    const data = await res.json()

    return {
        props: {
            posts: data
        }
    }
}

export default function Home({posts}) {
    const firstClassData = posts.fashions
    const specialData = posts.special
    const fashionData = posts.fashions
    const beautyData = posts.beautys
    const trendData = posts.trends
    const lifestyleData = posts.lifestyles
    const weddingData = posts.weddings
    const topleaderData = posts.topleaders
    const fortuneData = posts.fortunes
    const videoData = posts.videos
    const pickupData = posts.pickups
    const presentData = posts.presents

    return (
        <>
            <Meta />

            <section className="cont1">
                <Container>
                    <h2 className="ttl1 ivy">FIRST CLASS</h2>
                    <FirstClass firstClassData={firstClassData} />
                </Container>
            </section>

            <section className={`cont ${styles.cont2}`}>
                <Container>
                    <h2 className="ttl1 ivy">SPECIAL</h2>
                    <BlogPattern1 pattern={specialData} route2 />
                </Container>
            </section>

            <section className={`cont ${styles.cont3}`}>
                <Container>
                    <h2 className="ttl1 ivy">FASHION</h2>
                    <BlogPattern2 pattern={fashionData} />
                </Container>
            </section>

            <section className={`cont ${styles.cont4}`}>
                <Container>
                    <h2 className="ttl1 ivy">COLLECTION</h2>
                    <BlogPattern3 />
                </Container>
            </section>

            <section className={`cont ${styles.cont5}`}>
                <Container>
                    <h2 className="ttl1 ivy">BEAUTY</h2>
                    <BlogPattern1 pattern={beautyData} />
                </Container>
            </section>

            <section className={`cont ${styles.cont6}`}>
                <Container>
                    <h2 className="ttl1 ivy">TREND</h2>
                    <BlogPattern4 pattern={trendData} />
                </Container>
            </section>

            <section className={`cont ${styles.cont7}`}>
                <Container>
                    <h2 className="ttl1 ivy">LIFE STYLE</h2>
                    <BlogPattern1 pattern={lifestyleData} />
                </Container>
            </section>

            <section className={`cont ${styles.cont8}`}>
                <Container>
                    <h2 className="ttl1 ivy">WEDDING</h2>
                    <BlogPattern4 pattern={weddingData} mode2 />
                </Container>
            </section>

            <section className={`cont ${styles.cont9}`}>
                <Container>
                    <h2 className="ttl1 ivy">TOP LEADER</h2>
                    <BlogPattern1 pattern={topleaderData} column3None />
                </Container>
            </section>

            <section className={`cont ${styles.cont10}`}>
                <Container>
                    <h2 className="ttl1 ivy">FORTUNE</h2>
                    <BlogPattern7 pattern={fortuneData} />
                </Container>
            </section>

            <section className={`cont ${styles.cont11}`}>
                <Container>
                    <h2 className="ttl1 ivy">VIDEO</h2>
                    <BlogPattern5 pattern={videoData} />
                </Container>
            </section>

            <section className={`cont ${styles.cont12}`}>
                <Container>
                    <h2 className="ttl1 ivy">ON-LINE SALON</h2>
                    <BlogPattern6 />
                    <Button2 link="/" name="view all" />
                </Container>
            </section>

            <section id="pickUp" className={`cont ${styles.cont13}`}>
                <div className={styles.wrapper}>
                    <Container>
                        <BlogPattern8 pattern={pickupData} />
                    </Container>
                </div>
            </section>

            <section className={`cont ${styles.cont14}`}>
                <Container>
                    <h2 className="ttl1 ivy">PRESENT</h2>
                    <BlogPattern9 pattern={presentData} />
                    <Button2 link="/" name="view all" />
                </Container>
            </section>
        </>
    )
}

Home.getLayout = function getLayout(page) {
    return <PageLayout>{page}</PageLayout>
}
