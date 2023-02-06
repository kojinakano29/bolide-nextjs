import styles from '@/styles/liondor/components/blogPattern3.module.scss'
import Link from 'next/link';
import { BlogTxt } from '@/components/liondor';

const BlogPattern3 = ({pattern}) => {
  return (
    <article className={styles.article}>
      <Link href={pattern.url}>
        <a className={styles.blogLink}>
          <div className={styles.imgFlex}>
            <div className={styles.imgBox}>
              <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${pattern.image1}`} alt="" />
            </div>
            <div className={styles.imgBox}>
              <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${pattern.image2}`} alt="" />
            </div>
            <div className={styles.imgBox}>
              <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${pattern.image3}`} alt="" />
            </div>
            <div className={styles.imgBox}>
              <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${pattern.image4}`} alt="" />
            </div>
          </div>
          <BlogTxt
            cat={pattern?.l_category?.parent_slug?.toUpperCase()}
            cat2={pattern?.l_category?.name}
            ttl={pattern?.title}
            name={pattern?.user?.l_profile?.nicename}
            time={pattern?.created_at}
            fs24
          />
        </a>
      </Link>
    </article>
  );
}

export default BlogPattern3;