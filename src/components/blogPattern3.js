import styles from '@/styles/components/blogPattern3.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import { BlogTxt } from '@/components';
import { dummyImage3 } from '@/lib/constants';

const BlogPattern3 = () => {
  return (
    <article className={styles.article}>
      <Link href="/">
        <a className={styles.blogLink}>
          <div className={styles.imgFlex}>
            {dummyImage3.map((items, index) => (
              <div className={styles.imgBox} key={index}>
                <Image
                  src={items.src}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 325px, (min-width: 768px) 180px, 25vw"
                  priority
                />
              </div>
            ))}
          </div>
          <BlogTxt
            cat="FASHION"
            cat2="TREND & STORY"
            ttl="【インフルエンサーインタビューvol.5】魅せるインスタブランディング×望む未来を創るコーチング・美容ライフ　梅宮翠さん"
            name="ARATA HOMMA"
            time="2022-09-26T04:54:36.000000Z"
            fs24
          />
        </a>
      </Link>
    </article>
  );
}

export default BlogPattern3;