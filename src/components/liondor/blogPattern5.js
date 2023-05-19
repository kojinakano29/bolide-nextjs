import styles from '@/styles/liondor/components/blogPattern5.module.scss'
import dummy from '@/images/liondor/cms/dummy.webp'
import { BlogTxt } from '@/components/liondor'

const BlogPattern5 = ({ pattern, user }) => {
    const data = pattern?.filter((e, index) => {
        return index < 6
    })

    return (
        <article className={styles.article}>
            {data?.map(item => (
                <a
                    href={
                        user
                            ? `/liondor/post/show/${item?.id}`
                            : '/liondor/login'
                    }
                    key={item?.id}
                    className={styles.blogLink}>
                    <div className={styles.imgBox}>
                        <img
                            src={
                                item?.thumbs
                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item?.thumbs}`
                                    : dummy.src
                            }
                            alt="記事のサムネイル画像"
                        />
                    </div>
                    <BlogTxt
                        smallMb
                        cat={item?.l_category?.parent_slug?.toUpperCase()}
                        cat2={item?.l_category?.name}
                        ttl={item?.title}
                        name={item?.user?.l_profile?.nicename}
                        time={item?.view_date}
                    />
                </a>
            ))}
        </article>
    )
}

export default BlogPattern5
