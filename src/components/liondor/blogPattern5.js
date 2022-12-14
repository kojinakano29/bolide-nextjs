import styles from '@/styles/liondor/components/blogPattern5.module.scss'
import dummy from '@/images/liondor/cms/dummy.png'
import Link from 'next/link'
import { BlogTxt } from '@/components/liondor'

const BlogPattern5 = ({pattern}) => {
  const data = pattern?.l_post?.filter((e, index) => {
    return index < 6
  })

  return (
    <article className={styles.article}>
      {data?.map((item) => (
        <Link href={`/liondor/post/show/${item.id}`} key={item.id}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <img src={item.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.thumbs}` : dummy.src} alt="" />
            </div>
            <BlogTxt
              smallMb
              cat={item?.l_category?.parent_slug?.toUpperCase()}
              cat2={item?.l_category?.name}
              ttl={item?.title}
              name={item?.user?.l_profile.nicename}
              time={item?.created_at}
            />
          </a>
        </Link>
      ))}
    </article>
  );
}

export default BlogPattern5;