import styles from '@/styles/liondor/components/blogPattern9.module.scss'
import Link from 'next/link'
import { BlogTxt } from '@/components/liondor'
import dummy from '@/images/liondor/cms/dummy.png'

const BlogPattern9 = ({pattern}) => {
  const data = pattern?.filter((e, index) => {
    return index < 4
  })

  return (
    <article className={styles.article}>
      {data?.map((item) => (
        <Link href={`/liondor/present/${item.id}`} key={item.id}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <img src={item.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.thumbs}` : dummy.src} alt="" />
            </div>
            <BlogTxt
              smallMb
              ttl={item?.title}
              name={item?.offer}
              time={item?.created_at}
            />
          </a>
        </Link>
      ))}
    </article>
  );
}

export default BlogPattern9;