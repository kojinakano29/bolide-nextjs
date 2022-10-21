import styles from '@/styles/liondor/components/blogPattern5.module.scss'
import dummy23 from '@/images/liondor/cms/dummy23.png'
import Link from 'next/link'
import Image from 'next/image'
// import play from '@/images/liondor/common/play.svg'
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
              <Image
                src={dummy23}
                alt=""
                layout="responsive"
                sizes="(min-width: 1340px) 412px, (min-width: 768px) 230px, 100vw"
                priority
              />
              {/* <div className={styles.play}>
                <Image
                  src={play}
                  alt=""
                  layout="responsive"
                  sizes="48px"
                />
              </div> */}
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

export default BlogPattern5;