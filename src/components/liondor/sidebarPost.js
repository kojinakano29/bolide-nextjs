import styles from '@/styles/liondor/components/sidebarPost.module.scss'
import Link from 'next/link'
import dummy from '@/images/liondor/cms/dummy.png'
import { BlogTxt } from '@/components/liondor'

const SidebarPost = ({pickUp}) => {

  const data = pickUp.filter((item, index) => {
    return index < 4
  })

  return (
    <div className={styles.sideWrap}>
      <p className={`en ${styles.ttl}`}>POPULAR POSTS</p>
      <article className={styles.article}>
        {data.map((item, index) => (
          <Link href={`/liondor/post/show/${item.id}`} key={index}>
            <a className={styles.blogLink}>
              <div className={styles.imgBox}>
                <img src={item.l_post.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.l_post.thumbs}` : dummy.src} alt="" />
              </div>
              <div className={styles.txtBox}>
                <BlogTxt
                  mb0
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
      </article>
    </div>
  );
}

export default SidebarPost;