import styles from '@/styles/liondor/components/blogPattern8.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import dummy22 from '@/images/liondor/cms/dummy22.png'
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
          <Link href={`/liondor/post/show/${item.id}`} key={item.id}>
            <a className={styles.blogLink}>
              <div className={styles.imgBox}>
                <Image
                  src={dummy22}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 124px, (min-width: 768px) 124px, 100vw"
                  priority
                />
              </div>
              <div className={styles.txtBox}>
                <BlogTxt
                  smallMb
                  fs14
                  cat={item?.l_post?.l_category?.parent_slug?.toUpperCase()}
                  cat2={item?.l_post?.l_category?.name}
                  ttl={item?.l_post?.title}
                  name={item?.l_post?.user?.name}
                  time={item?.l_post?.created_at}
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
