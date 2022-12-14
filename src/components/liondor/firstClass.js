import styles from '@/styles/liondor/components/firstClass.module.scss'
import Link from 'next/link';
import { BlogTxt } from '@/components/liondor'

const FirstClass = ({firstClassData}) => {

  return (
    <article className={styles.article}>
      {firstClassData.map((item) => (
        <Link href={item.url} key={item.id}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.thumbs}`} alt="" />
            </div>
            <div className={styles.txtBox}>
              <BlogTxt
                cat={item.l_category.parent_slug?.toUpperCase()}
                cat2={item.l_category.name}
                ttl={item.title}
                name={item.user.l_profile.nicename}
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