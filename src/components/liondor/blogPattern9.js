import styles from '@/styles/liondor/components/BlogPattern9.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { BlogTxt } from '@/components/liondor'
import dummy10 from '@/images/liondor/cms/dummy10.png'

const BlogPattern9 = ({pattern}) => {
  const data = pattern?.filter((e, index) => {
    return index < 4
  })

  return (
    <article className={styles.article}>
      {data?.map((item) => (
        <Link href={`/liondor/present/${item.id}`} key={item.id}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <Image
                src={dummy10}
                alt=""
                layout="responsive"
                sizes="(min-width: 1340px) 300px, (min-width: 768px) 180px, 100vw"
                priority
              />
            </div>
            <BlogTxt
              smallMb
              ttl={item?.title}
              name={item?.offer}
              time={item?.created_at}
            />
          </a>
        </Link>
      ))}
    </article>
  );
}

export default BlogPattern9;