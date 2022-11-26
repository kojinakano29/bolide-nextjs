import styles from '@/styles/corapura/components/user.module.scss'
import Link from 'next/link';
import dummy from '@/images/corapura/common/userDummy.svg'
import { Btn } from '@/components/corapura';

const User = ({data, detail = false}) => {
  return (
    <>
      {!detail ?
        <>
          <article className={styles.person__list}>
            {data.map((item, index) => (
              <Link href={`/corapura/influencer/${item.c_profile_id}`} key={item.id}>
                <a className={styles.person__item}>
                  <div className={styles.imgBox}>
                    <img src={dummy.src} alt="" />
                  </div>
                  <p className={styles.jp}>{item.c_profile.nicename}</p>
                  <p className={`${styles.en} en`}>{item.name}</p>
                </a>
              </Link>
            ))}
          </article>
          <Btn txt="インフルエンサー一覧" link="/corapura" />
        </>
      :
        <>
          <article className={styles.person__list}>
            {data.map((item, index) => (
              <Link href={`/corapura/influencer/${item.id}`} key={item.id}>
                <a className={styles.person__item}>
                  <div className={styles.imgBox}>
                    <img src={dummy.src} alt="" />
                  </div>
                  <p className={styles.jp}>{item.c_profile.nicename}</p>
                  <p className={`${styles.en} en`}>{item.name}</p>
                  <p className={styles.catch}>{item.c_profile.title}</p>
                </a>
              </Link>
            ))}
          </article>
        </>
      }
    </>
  );
}

export default User;