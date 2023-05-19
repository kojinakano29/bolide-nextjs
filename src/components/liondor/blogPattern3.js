import styles from '@/styles/liondor/components/blogPattern3.module.scss'
import { BlogTxt } from '@/components/liondor'

const BlogPattern3 = ({ pattern, user }) => {
    // console.log(pattern)

    return (
        <article className={styles.article}>
            <a
                href={user ? pattern?.url : '/liondor/login'}
                className={styles.blogLink}>
                <div className={styles.imgFlex}>
                    <div className={styles.imgBox}>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${pattern?.image1}`}
                            alt="記事のサムネイル画像"
                        />
                    </div>
                    <div className={styles.imgBox}>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${pattern?.image2}`}
                            alt="記事のサムネイル画像"
                        />
                    </div>
                    <div className={styles.imgBox}>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${pattern?.image3}`}
                            alt="記事のサムネイル画像"
                        />
                    </div>
                    <div className={styles.imgBox}>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${pattern?.image4}`}
                            alt="記事のサムネイル画像"
                        />
                    </div>
                </div>
                <BlogTxt
                    cat={pattern?.l_category?.parent_slug?.toUpperCase()}
                    cat2={pattern?.l_category?.name}
                    ttl={pattern?.title}
                    name={pattern?.user?.l_profile?.nicename}
                    time={pattern?.updated_at}
                    fs24
                />
            </a>
        </article>
    )
}

export default BlogPattern3
