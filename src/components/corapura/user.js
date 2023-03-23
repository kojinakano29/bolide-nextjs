import styles from '@/styles/corapura/components/user.module.scss'
import dummy from '@/images/corapura/common/userDummy.svg'
import { Btn } from '@/components/corapura';

const User = ({data, detail = false}) => {
  // console.log(data)

  return (
    <>
      {!detail ?
        <>
          <article className={styles.person__list}>
            {data?.map((item, index) => (
              <a href={`/corapura/influencer/${item?.id}`} key={item?.id} className={styles.person__item}>
                <div className={styles.imgBox}>
                  <img src={item?.c_profile?.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item?.c_profile?.thumbs}` : dummy.src} alt="プロフィール画像" />
                </div>
                <p className={styles.jp}>{item?.c_profile?.nicename}</p>
                {/* <p className={`${styles.en} en`}>{item?.name}</p> */}
              </a>
            ))}
          </article>
          <Btn txt="インフルエンサー一覧" link="/corapura/influencer" />
        </>
      :
        <>
          <article className={styles.person__list}>
            {data?.map((item, index) => (
              <a href={`/corapura/influencer/${item?.id}`} key={item?.id} className={styles.person__item}>
                <div className={styles.imgBox}>
                  <img src={item?.c_profile?.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item?.c_profile?.thumbs}` : dummy.src} alt="プロフィール画像" />
                </div>
                <p className={styles.jp}>{item?.c_profile?.nicename}</p>
                {/* <p className={`${styles.en} en`}>{item?.name}</p> */}
                <p className={styles.catch}>{item?.c_profile?.title}</p>
              </a>
            ))}
          </article>
        </>
      }
    </>
  );
}

export default User;