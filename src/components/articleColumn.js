import styles from '@/styles/components/articleColumn.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dummy11 from '@/images/cms/dummy11.png'
import BlogTxt from './blogTxt';

const ArticleColumn = ({posts, type2 = false}) => {
  const router = useRouter();
  const { category, cat } = router.query

  const sort = posts?.posts?.filter((e, index) => {
    if (type2) {
      return e?.l_category.name === cat || undefined === cat && index > 14 && index < 30
    } else {
      return e?.l_category.name === cat || undefined === cat && index < 15
    }
  })

  return (
    <article className={styles.article}>
      {sort.map((item) => (
        <Link href={`/post/show/${item.id}`} key={item.id}>
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