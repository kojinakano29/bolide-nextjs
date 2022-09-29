import styles from '@/styles/components/blogPattern7.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import { BlogTxt } from '@/components'
import dummy19 from '@/images/cms/dummy19.png'

const BlogPattern7 = ({pattern}) => {
  const data = pattern?.l_post?.filter((e, index) => {
    return index < 3
  })

  return (
    <article className={styles.bottomArea}>
      {data?.map((item) => (
        <Link href={`/post/show/${item.id}`} key={item.id}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <Image
                src={dummy19}
                alt=""
                layout="responsive"
                sizes="(min-width: 1340px) 412px, (min-width: 768px) 230px, 100vw"
                priority
              />
            </div>
            <BlogTxt
              smallMb
              cat={item?.l_category?.parent_slug?.toUpperCase()}
              cat2={item?.l_category?.name}
              ttl={item?.title}
              name={item?.user?.name}
              time={item?.created_at}
            />
          </a>
        </Link>
      ))}
    </article>
  );
}

export default BlogPattern7;