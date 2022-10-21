import styles from '@/styles/liondor/components/blogPattern6.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import { dummyImage5 } from '@/lib/liondor/constants';

const BlogPattern6 = () => {
  return (
    <article className={styles.article}>
      {dummyImage5.map((items, index) => (
        <Link href="/" key={index}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <Image
                  src={items.src}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 300px, (min-width: 768px) 180px, 100vw"
                  priority
                />
            </div>
            <div className={styles.singleTxt}>
              <h3>{items.ttl}</h3>
              <p>{items.txt}</p>
            </div>
          </a>
        </Link>
      ))}
    </article>
  );
}

export default BlogPattern6;