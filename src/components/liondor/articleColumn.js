import styles from '@/styles/liondor/components/articleColumn.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import dummy11 from '@/images/liondor/cms/dummy11.png'
import { BlogTxt } from '@/components/liondor';

const ArticleColumn = ({sort, present = false}) => {
  return (
    <article className={styles.article}>
      {sort.map((item) => (
        <Link href={`/liondor/${present ? 'present' : 'post/show'}/${item.id}`} key={item.id}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <Image
                src={dummy11}
                alt=""
                layout="responsive"
                sizes="(min-width: 1340px) 288px, (min-width: 768px) 288px, 100vw"
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

export default ArticleColumn;