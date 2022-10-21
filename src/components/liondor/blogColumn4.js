import styles from '@/styles/liondor/components/blogColumn4.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { BlogTxt } from '@/components/liondor'
import dummy10 from '@/images/liondor/cms/dummy10.png'

const BlogColumn4 = ({patternData, part2 = false}) => {
  const data = patternData?.l_post?.filter((e, index) => {
    return part2 ? index > 3 && index < 8 : index !== 0 && index < 5
  })

  return (
    <article className={styles.article}>
      {data?.map((item) => (
        <Link href={`/liondor/post/show/${item.id}`} key={item.id}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <Image
                src={dummy10}
                alt=""
                layout="responsive"
                sizes="(min-width: 1340px) 300px, (min-width: 768px) 180px, 100vw"
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

export default BlogColumn4;