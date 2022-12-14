import styles from '@/styles/liondor/components/blogPattern7.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import { BlogTxt } from '@/components/liondor'
import dummy from '@/images/liondor/cms/dummy.png'

const BlogPattern7 = ({pattern}) => {
  const data = pattern?.l_post?.filter((e, index) => {
    return index < 3
  })

  return (
    <article className={styles.bottomArea}>
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
              time={item?.view_date}
            />
          </a>
        </Link>
      ))}
    </article>
  );
}

export default BlogPattern7;