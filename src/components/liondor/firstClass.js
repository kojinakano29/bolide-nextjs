import styles from '@/styles/liondor/components/firstClass.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import dummy1 from '@/images/liondor/cms/dummy1.png'
import { BlogTxt } from '@/components/liondor'

const FirstClass = ({firstClassData}) => {
  const firstData = firstClassData?.l_post?.filter((e, index) => {
    return index === 1
  })

  return (
    <article className={styles.article}>
      {firstData.map((item) => (
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
            <div className={styles.txtBox}>
              <BlogTxt
                cat={item.l_category.parent_slug?.toUpperCase()}
                cat2={item.l_category.name}
                ttl={item.title}
                name={item.user.name}
                time={item.created_at}
                white
                fs24
              />
            </div>
          </a>
        </Link>
      ))}
    </article>
  );
}

export default FirstClass;