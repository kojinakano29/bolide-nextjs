import styles from '@/styles/corapura/components/user.module.scss'
import Link from 'next/link';
import dummy from '@/images/corapura/common/userDummy.svg'
import { Btn } from '@/components/corapura';

const User = ({data}) => {
  return (
    <>
      <article className={styles.person__list}>
        {data.map((item, index) => (
          <Link href={`/corapura/influencer/${item.id}`} key={item.id}>
            <a className={styles.person__item}>
              <div className={styles.imgBox}>
                <img src={dummy.src} alt="" />
              </div>
              <p className={styles.jp}>名前 名前1</p>
              <p className={`${styles.en} en`}>Name Name</p>
            </a>
          </Link>
        ))}
      </article>
      <Btn txt="インフルエンサー一覧" link="/corapura" />
    </>
  );
}

export default User;