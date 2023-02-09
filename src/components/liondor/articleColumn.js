import styles from '@/styles/liondor/components/articleColumn.module.scss'
import Link from 'next/link';
import dummy from '@/images/liondor/cms/dummy.png'
import { BlogTxt, Date } from '@/components/liondor';

const ArticleColumn = ({sort, present = false}) => {
  // console.log(sort)

  return (
    <article className={styles.article}>
      {sort.map((item) => (
        <Link href={`/liondor/${present ? 'present' : 'post/show'}/${item.id}`} key={item.id}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <img src={item.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.thumbs}` : dummy.src} alt="" />
            </div>
            {present ?
              <div className={styles.txt_box}>
                <h3 className={styles.ttl}>{item.title}</h3>
                <p className={styles.limit}>
                  応募期限：<Date dateString={item.created_at} />
                </p>
                <p className={styles.date}>
                  入稿日：<Date dateString={item.created_at} />
                </p>
              </div>
            :
              <BlogTxt
                smallMb
                cat={item?.l_category?.parent_slug?.toUpperCase()}
                cat2={item?.l_category?.name}
                ttl={item?.title}
                name={item?.user?.l_profile?.nicename}
                time={present ? item?.created_at : item?.view_date}
              />
            }
          </a>
        </Link>
      ))}
    </article>
  );
}

export default ArticleColumn;