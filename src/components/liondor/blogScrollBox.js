import styles from '@/styles/liondor/components/blogScrollBox.module.scss'
import { BlogTxt } from '@/components/liondor'
import dummy from '@/images/liondor/cms/dummy.webp'

const BlogScrollBox = ({ patternData, user }) => {
    const dataOdd = patternData?.filter((e, index) => {
        return index !== 0 && index % 2 === 1 && index < 8
    })

    const dataEven = patternData?.filter((e, index) => {
        return index !== 0 && index % 2 === 0 && index < 9
    })

    const dataSp = patternData?.filter((e, index) => {
        return index !== 0 && index < 5
    })

    return (
        <>
            <div className={`${styles.scrollBox} pc`}>
                <div className={`${styles.scrollOdd} ${styles.scrollCont}`}>
                    {dataOdd?.map(item => (
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
                </div>
                <div className={`${styles.scrollEven} ${styles.scrollCont}`}>
                    {dataEven?.map(item => (
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
                </div>
            </div>

            <div className={`${styles.scrollBox} sp`}>
                <div className={`${styles.scrollCont}`}>
                    {dataSp?.map(item => (
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
                </div>
            </div>
        </>
    )
}

export default BlogScrollBox
