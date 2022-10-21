import styles from '@/styles/liondor/components/blogPattern10.module.scss'
import Image from "next/image";
import Link from "next/link";
import dummy10 from '@/images/liondor/cms/dummy10.png'

const BlogPattern10 = ({posts}) => {
  return (
    <>
      {posts.map((item, index) => (
        <Link href={`/liondor/post/show/${item.id}`} key={index}>
          <a className={styles.blogLink}>
            <div className={styles.imgBox}>
              <Image
                src={dummy10}
                alt=""
                layout="responsive"
                sizes="(min-width: 1340px) 412px, (min-width: 768px) 230px, 100vw"
                priority
              />
            </div>
            <div className={styles.txtBox}>
              <h4>{item.title}</h4>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
}

export default BlogPattern10;