import styles from '@/styles/liondor/components/blogColumn1.module.scss'
import Image from 'next/image';
import dummy1 from '@/images/liondor/cms/dummy1.png'
import Link from 'next/link';
import { BlogTxt } from '@/components/liondor'

const BlogColumn1 = ({patternData}) => {
  const data = patternData?.l_post?.filter((e, index) => {
    return index === 0
  })

  return (
    <article className={styles.article}>
      {data?.map((item) => (
        <Link href={`/liondor/post/show/${item.id}`} key={item.id}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <Image
                src={dummy1}
                alt=""
                layout="responsive"
                sizes="(min-width: 1340px) 1300px, (min-width: 768px) 720px, 100vw"
                priority
              />
            </div>
            <BlogTxt
              cat={item?.l_category?.parent_slug?.toUpperCase()}
              cat2={item?.l_category?.name}
              ttl={item?.title}
              name={item?.user?.name}
              time={item?.created_at}
              fs24
            />
          </a>
        </Link>
      ))}
    </article>
  );
}

export default BlogColumn1;