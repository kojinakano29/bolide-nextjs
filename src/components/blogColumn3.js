import styles from '@/styles/components/blogColumn3.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import { BlogTxt } from '@/components'
import dummy7 from '@/images/cms/dummy7.png'

const BlogColumn3 = ({patternData, part2 = false, route2 = false}) => {
  const data = route2 ? patternData?.filter((e, index) => {
    return part2 ? index !== 0 && index < 4 : index > 8 && index < 12
  }) : patternData?.l_post?.filter((e, index) => {
    return part2 ? index !== 0 && index < 4 : index > 8 && index < 12
  })

  return (
    <article className={styles.bottomArea}>
      {data?.map((item) => (
        <Link href={`/post/show/${item.id}`} key={item.id}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <Image
                src={dummy7}
                alt=""
                layout="responsive"
                sizes="(min-width: 1340px) 412px, (min-width: 768px) 230px, 100vw"
                priority
              />
            </div>
            {
              route2
              ?
              <BlogTxt
                smallMb
                cat={item?.l_post?.l_category?.parent_slug?.toUpperCase()}
                cat2={item?.l_post?.l_category?.name}
                ttl={item?.l_post?.title}
                name={item?.l_post?.user?.name}
                time={item?.l_post?.created_at}
              />
              :
              <BlogTxt
                smallMb
                cat={item?.l_category?.parent_slug?.toUpperCase()}
                cat2={item?.l_category?.name}
                ttl={item?.title}
                name={item?.user?.name}
                time={item?.created_at}
              />
            }
          </a>
        </Link>
      ))}
    </article>
  );
}

export default BlogColumn3;