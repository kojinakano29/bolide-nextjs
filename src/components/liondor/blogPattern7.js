import styles from '@/styles/liondor/components/blogPattern7.module.scss'
import { BlogTxt } from '@/components/liondor'
import dummy from '@/images/liondor/cms/dummy.webp'

const BlogPattern7 = ({ pattern, user }) => {
    // console.log(pattern)

    const dailies = pattern?.filter(daily => {
        return daily.l_category.slug === 'daily'
    })

    const monthlies = pattern?.filter(month => {
        return month.l_category.slug === 'monthly'
    })

    const yearlies = pattern?.filter(year => {
        return year.l_category.slug === 'yealy'
    })

    return (
        <article className={styles.bottomArea}>
            <p className={`${styles.fortuneType} ivy sp`}>Daily</p>
            <div className={styles.fortuneBox}>
                <p className={`${styles.fortuneType} ivy pc`}>Daily</p>
                <a
                    href={
                        user
                            ? `/liondor/post/show/${dailies?.[0]?.id}`
                            : '/liondor/login'
                    }
                    className={styles.blogLink}>
                    <div className={styles.imgBox}>
                        <img
                            src={
                                dailies?.[0]?.thumbs
                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${dailies?.[0].thumbs}`
                                    : dummy.src
                            }
                            alt="記事のサムネイル画像"
                        />
                    </div>
                    <BlogTxt
                        smallMb
                        cat={dailies?.[0]?.l_category?.parent_slug?.toUpperCase()}
                        cat2={dailies?.[0]?.l_category?.name}
                        ttl={dailies?.[0]?.title}
                        name={dailies?.[0]?.user?.l_profile?.nicename}
                        time={dailies?.[0]?.view_date}
                    />
                </a>
            </div>
            <p className={`${styles.fortuneType} ivy sp`}>Monthly</p>
            <div className={styles.fortuneBox}>
                <p className={`${styles.fortuneType} ivy pc`}>Monthly</p>
                <a
                    href={
                        user
                            ? `/liondor/post/show/${monthlies?.[0]?.id}`
                            : '/liondor/login'
                    }
                    className={styles.blogLink}>
                    <div className={styles.imgBox}>
                        <img
                            src={
                                monthlies?.[0]?.thumbs
                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${monthlies?.[0].thumbs}`
                                    : dummy.src
                            }
                            alt="記事のサムネイル画像"
                        />
                    </div>
                    <BlogTxt
                        smallMb
                        cat={monthlies?.[0]?.l_category?.parent_slug?.toUpperCase()}
                        cat2={monthlies?.[0]?.l_category?.name}
                        ttl={monthlies?.[0]?.title}
                        name={monthlies?.[0]?.user?.l_profile?.nicename}
                        time={monthlies?.[0]?.view_date}
                    />
                </a>
            </div>
            <p className={`${styles.fortuneType} ivy sp`}>Yealy</p>
            <div className={styles.fortuneBox}>
                <p className={`${styles.fortuneType} ivy pc`}>Yealy</p>
                <a
                    href={
                        user
                            ? `/liondor/post/show/${yearlies?.[0]?.id}`
                            : '/liondor/login'
                    }
                    className={styles.blogLink}>
                    <div className={styles.imgBox}>
                        <img
                            src={
                                yearlies?.[0]?.thumbs
                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${yearlies?.[0].thumbs}`
                                    : dummy.src
                            }
                            alt="記事のサムネイル画像"
                        />
                    </div>
                    <BlogTxt
                        smallMb
                        cat={yearlies?.[0]?.l_category?.parent_slug?.toUpperCase()}
                        cat2={yearlies?.[0]?.l_category?.name}
                        ttl={yearlies?.[0]?.title}
                        name={yearlies?.[0]?.user?.l_profile?.nicename}
                        time={yearlies?.[0]?.view_date}
                    />
                </a>
            </div>
        </article>
    )
}

export default BlogPattern7
