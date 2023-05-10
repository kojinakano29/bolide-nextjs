import styles from '@/styles/liondor/components/blogPattern10.module.scss'
import dummy from '@/images/liondor/cms/dummy.webp'

const BlogPattern10 = ({ posts, present = false }) => {
    return (
        <>
            {posts.map((item, index) => (
                <a
                    href={
                        present
                            ? `/liondor/present/${item?.id}`
                            : `/liondor/post/show/${item?.id}`
                    }
                    key={index}
                    className={styles.blogLink}>
                    <div className={styles.imgBox}>
                        <img
                            src={
                                item?.thumbs
                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item?.thumbs}`
                                    : dummy.src
                            }
                            alt="サムネイル画像"
                        />
                    </div>
                    <div className={styles.txtBox}>
                        <h4>{item?.title}</h4>
                    </div>
                </a>
            ))}
        </>
    )
}

export default BlogPattern10
