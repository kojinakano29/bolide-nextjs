import styles from '@/styles/liondor/components/blogColumn4.module.scss'
import { BlogTxt } from '@/components/liondor'
import dummy from '@/images/liondor/cms/dummy.webp'

const BlogColumn4 = ({ patternData, part2 = false, portrait = false }) => {
    const data = patternData?.l_post?.filter((e, index) => {
        return part2 ? index > 3 && index < 8 : index !== 0 && index < 5
    })

    return (
        <article className={styles.article}>
            {data?.map(item => (
                <a
                    href={`/liondor/post/show/${item?.id}`}
                    key={item?.id}
                    className={styles.blogLink}>
                    <div
                        className={`${styles.imgBox} ${
                            portrait ? styles.portrait : null
                        }`}>
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

export default BlogColumn4
