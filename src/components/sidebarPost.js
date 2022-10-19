import styles from '@/styles/components/sidebarPost.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import dummy10 from '@/images/cms/dummy10.png'
import { BlogTxt } from '@/components'

const SidebarPost = ({pickUp}) => {

  const data = pickUp.filter((item, index) => {
    return index < 4
  })

  return (
    <div className={styles.sideWrap}>
      <p className={`en ${styles.ttl}`}>POPULAR POSTS</p>
      <article className={styles.article}>
        {data.map((item, index) => (
          <Link href={`/post/show/${item.id}`} key={index}>
            <a className={styles.blogLink}>
              <div className={styles.imgBox}>
                <Image
                  src={dummy10}
                  alt=""
                  layout="responsive"
                  sizes="100px"
                  // priority
                />
              </div>
              <div className={styles.txtBox}>
                <BlogTxt
                  mb0
                  fs14
                  cat={item.l_post.l_category?.parent_slug?.toUpperCase()}
                  cat2={item.l_post.l_category?.name}
                  ttl={item.l_post.title}
                  name={item.l_post.user.name}
                  time={item.l_post.created_at}
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