import styles from '@/styles/liondor/components/blogPattern10.module.scss'
import Link from "next/link";
import dummy from '@/images/liondor/cms/dummy.webp'

const BlogPattern10 = ({posts, present = false}) => {
  return (
    <>
      {posts.map((item, index) => (
        <Link href={present ? `/liondor/present/${item?.id}` : `/liondor/post/show/${item?.id}`} key={index}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <img src={item?.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item?.thumbs}` : dummy.src} alt="サムネイル画像" />
            </div>
            <div className={styles.txtBox}>
              <h4>{item?.title}</h4>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
}

export default BlogPattern10;