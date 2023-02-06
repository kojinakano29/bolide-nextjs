import styles from '@/styles/liondor/components/firstClass.module.scss'
import Link from 'next/link';
import { BlogTxt } from '@/components/liondor'

const FirstClass = ({firstClassData}) => {

  return (
    <article className={styles.article}>
      <Link href={firstClassData.url}>
        <a className={styles.blogLink}>
          <div className={styles.imgBox}>
            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${firstClassData.thumbs}`} alt="" />
          </div>
          <div className={styles.txtBox}>
            <BlogTxt
              cat={firstClassData?.l_category?.parent_slug?.toUpperCase()}
              cat2={firstClassData?.l_category?.name}
              ttl={firstClassData?.title}
              name={firstClassData?.user.l_profile?.nicename}
              time={firstClassData?.created_at}
              white
              fs24
            />
          </div>
        </a>
      </Link>
    </article>
  );
}

export default FirstClass;