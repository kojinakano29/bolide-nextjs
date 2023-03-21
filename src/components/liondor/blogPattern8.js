import styles from '@/styles/liondor/components/blogPattern8.module.scss'
import Link from 'next/link'
import dummy from '@/images/liondor/cms/dummy.webp'
import { BlogTxt } from '@/components/liondor'

const BlogPattern8 = ({pattern, must = false}) => {
  const data = pattern?.filter((e, index) => {
    return index < 3
  })

  return (
    <article className={styles.article}>
      <h2 className={`${styles.ttl} ivy ttl1`}>
        {must ? 'MUST READ' : 'PICKUP INFORMATION'}
      </h2>
      <div className={styles.flex}>
        {data?.map((item) => (
          <Link href={`/liondor/post/show/${item?.id}`} key={item?.id}>
            <a className={styles.blogLink}>
              <div className={styles.imgBox}>
                <img src={item?.l_post?.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item?.l_post?.thumbs}` : dummy.src} alt="ピックアップ記事のサムネイル画像" />
              </div>
              <div className={styles.txtBox}>
                <BlogTxt
                  smallMb
                  fs14
                  cat={item?.l_post?.l_category?.parent_slug?.toUpperCase()}
                  cat2={item?.l_post?.l_category?.name}
                  ttl={item?.l_post?.title}
                  name={item?.l_post?.user?.l_profile?.nicename}
                  time={item?.l_post?.view_date}
                />
              </div>
            </a>
          </Link>
        ))}
      </div>
    </article>
  );
}

export default BlogPattern8
