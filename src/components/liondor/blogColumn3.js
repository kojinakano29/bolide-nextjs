import styles from '@/styles/liondor/components/blogColumn3.module.scss'
import { BlogTxt } from '@/components/liondor'
import dummy from '@/images/liondor/cms/dummy.webp'

const BlogColumn3 = ({ patternData, part2 = false, route2 = false }) => {
    const data = route2
        ? patternData?.filter((e, index) => {
              return part2 ? index !== 0 && index < 4 : index > 8 && index < 12
          })
        : patternData?.l_post?.filter((e, index) => {
              return part2 ? index !== 0 && index < 4 : index > 8 && index < 12
          })

    return (
        <article className={styles.bottomArea}>
            {data?.map(item => (
                <a
                    href={`/liondor/post/show/${item?.id}`}
                    key={item?.id}
                    className={styles.blogLink}>
                    <div className={styles.imgBox}>
                        {route2 ? (
                            <img
                                src={
                                    item?.l_post?.thumbs
                                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item?.l_post?.thumbs}`
                                        : dummy.src
                                }
                                alt="記事のサムネイル画像"
                            />
                        ) : (
                            <img
                                src={
                                    item?.thumbs
                                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item?.thumbs}`
                                        : dummy.src
                                }
                                alt="記事のサムネイル画像"
                            />
                        )}
                    </div>
                    {route2 ? (
                        <BlogTxt
                            smallMb
                            cat={item?.l_post?.l_category?.parent_slug?.toUpperCase()}
                            cat2={item?.l_post?.l_category?.name}
                            ttl={item?.l_post?.title}
                            name={item?.l_post?.user?.l_profile?.nicename}
                            time={item?.l_post?.view_date}
                        />
                    ) : (
                        <BlogTxt
                            smallMb
                            cat={item?.l_category?.parent_slug?.toUpperCase()}
                            cat2={item?.l_category?.name}
                            ttl={item?.title}
                            name={item?.user?.l_profile?.nicename}
                            time={item?.view_date}
                        />
                    )}
                </a>
            ))}
        </article>
    )
}

export default BlogColumn3
