import styles from '@/styles/liondor/components/blogPickup.module.scss'
import Image from 'next/image';
import dummy2 from '@/images/liondor/cms/dummy2.png'
import Link from 'next/link';
import { BlogTxt } from '@/components/liondor'

const BlogPickup = ({patternData, route2 = false}) => {
  const data = route2 ? patternData?.filter((e, index) => {
    return index === 0
  }) : patternData?.l_post?.filter((e, index) => {
    return index === 0
  })

  return (
    <div className={styles.pickUp}>
      {data?.map((item) => (
        <Link href={`/liondor/post/show/${item.id}`} key={item.id}>
          <a className={styles.blogLink}>
            <div className={`${styles.imgBox} fill`}>
              <Image
                src={dummy2}
                alt=""
                layout="fill"
                objectFit="cover"
                sizes="(min-width: 1340px) 612px, (min-width: 768px) 400px, 100vw"
                priority
              />
            </div>
            {
              route2
              ?
              <div className={styles.txtBox}>
                <BlogTxt
                  fs22
                  tac
                  white
                  cat={item?.l_post?.l_category?.parent_slug?.toUpperCase()}
                  cat2={item?.l_post?.l_category?.name}
                  ttl={item?.l_post?.title}
                  name={item?.l_post?.user?.name}
                  time={item?.l_post?.created_at}
                />
              </div>
              :
              <div className={styles.txtBox}>
                <BlogTxt
                  fs22
                  tac
                  white
                  cat={item?.l_category?.parent_slug?.toUpperCase()}
                  cat2={item?.l_category?.name}
                  ttl={item?.title}
                  name={item?.user?.name}
                  time={item?.created_at}
                />
              </div>
            }
          </a>
        </Link>
      ))}
    </div>
  );
}

export default BlogPickup;