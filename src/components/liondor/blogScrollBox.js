import styles from '@/styles/liondor/components/blogScrollBox.module.scss'
import Link from 'next/link';
import { BlogTxt } from '@/components/liondor'
import dummy from '@/images/liondor/cms/dummy.png'

const BlogScrollBox = ({patternData, route2 = false}) => {
  const dataOdd = route2 ? patternData?.filter((e, index) => {
    return index !== 0 && index % 2 === 1 && index < 8
  }) : patternData?.l_post?.filter((e, index) => {
    return index !== 0 && index % 2 === 1 && index < 8
  })

  const dataEven = route2 ? patternData?.filter((e, index) => {
    return index !== 0 && index % 2 === 0 && index < 9
  }) : patternData?.l_post?.filter((e, index) => {
    return index !== 0 && index % 2 === 0 && index < 9
  })

  const dataSp = route2 ? patternData?.filter((e, index) => {
    return index !== 0 && index < 5
  }) : patternData?.l_post?.filter((e, index) => {
    return index !== 0 && index < 5
  })

  return (
    <>
      <div className={`${styles.scrollBox} pc`}>
        <div className={`${styles.scrollOdd} ${styles.scrollCont}`}>
          {dataOdd?.map((item) => (
            <Link href={`/liondor/post/show/${item.id}`} key={item.id}>
              <a className={styles.blogLink}>
                <div className={styles.imgBox}>
                  {route2 ?
                    <img src={item.l_post.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.l_post.thumbs}` : dummy.src} alt="" />
                  :
                    <img src={item.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.thumbs}` : dummy.src} alt="" />
                  }
                </div>
                {
                  route2
                  ?
                  <BlogTxt
                    smallMb
                    cat={item?.l_post?.l_category?.parent_slug?.toUpperCase()}
                    cat2={item?.l_post?.l_category?.name}
                    ttl={item?.l_post?.title}
                    name={item?.l_post?.user?.l_profile.nicename}
                    time={item?.l_post?.created_at}
                  />
                  :
                  <BlogTxt
                    smallMb
                    cat={item?.l_category?.parent_slug?.toUpperCase()}
                    cat2={item?.l_category?.name}
                    ttl={item?.title}
                    name={item?.user?.l_profile.nicename}
                    time={item?.created_at}
                  />
                }
              </a>
            </Link>
          ))}
        </div>
        <div className={`${styles.scrollEven} ${styles.scrollCont}`}>
          {dataEven?.map((item) => (
            <Link href={`/liondor/post/show/${item.id}`} key={item.id}>
              <a className={styles.blogLink}>
                <div className={styles.imgBox}>
                  {route2 ?
                    <img src={item.l_post.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.l_post.thumbs}` : dummy.src} alt="" />
                  :
                    <img src={item.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.thumbs}` : dummy.src} alt="" />
                  }
                </div>
                {
                  route2
                  ?
                  <BlogTxt
                    smallMb
                    cat={item?.l_post?.l_category?.parent_slug?.toUpperCase()}
                    cat2={item?.l_post?.l_category?.name}
                    ttl={item?.l_post?.title}
                    name={item?.l_post?.user?.l_profile.nicename}
                    time={item?.l_post?.created_at}
                  />
                  :
                  <BlogTxt
                    smallMb
                    cat={item?.l_category?.parent_slug?.toUpperCase()}
                    cat2={item?.l_category?.name}
                    ttl={item?.title}
                    name={item?.user?.l_profile.nicename}
                    time={item?.created_at}
                  />
                }
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div className={`${styles.scrollBox} sp`}>
        <div className={`${styles.scrollCont}`}>
          {dataSp?.map((item) => (
            <Link href={`/liondor/post/show/${item.id}`} key={item.id}>
              <a className={styles.blogLink}>
                <div className={styles.imgBox}>
                  {route2 ?
                    <img src={item.l_post.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.l_post.thumbs}` : dummy.src} alt="" />
                  :
                    <img src={item.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.thumbs}` : dummy.src} alt="" />
                  }
                </div>
                {
                  route2
                  ?
                  <BlogTxt
                    smallMb
                    cat={item?.l_post?.l_category?.parent_slug?.toUpperCase()}
                    cat2={item?.l_post?.l_category?.name}
                    ttl={item?.l_post?.title}
                    name={item?.l_post?.user?.l_profile.nicename}
                    time={item?.l_post?.created_at}
                  />
                  :
                  <BlogTxt
                    smallMb
                    cat={item?.l_category?.parent_slug?.toUpperCase()}
                    cat2={item?.l_category?.name}
                    ttl={item?.title}
                    name={item?.user?.l_profile.nicename}
                    time={item?.created_at}
                  />
                }
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default BlogScrollBox;