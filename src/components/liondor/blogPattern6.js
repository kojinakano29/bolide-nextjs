import styles from '@/styles/liondor/components/blogPattern6.module.scss'
import Link from 'next/link';
import dummy from '@/images/liondor/cms/dummy.webp'

const BlogPattern6 = ({salons}) => {
  const filter = salons.filter((salon, index) => {
    return index < 4
  })

  return (
    <article className={styles.article}>
      {filter.map((salon, index) => (
        <Link href={`/corapura/salon/${salon.id}`} key={index}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <img src={salon.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${salon.thumbs}` : dummy.src} alt="" />
            </div>
            <div className={styles.singleTxt}>
              <h3>{salon.title}</h3>
              <p>
                {salon.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '').substring(0, 45)}
              </p>
            </div>
          </a>
        </Link>
      ))}
    </article>
  );
}

export default BlogPattern6;