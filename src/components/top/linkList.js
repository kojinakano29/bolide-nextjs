import styles from '@/styles/top/components/linkList.module.scss'
import Link from "next/link";

const LinkList = () => {
  return (
    <div className={styles.flex}>
      <Link href="/register/?plan=corp">
        <a className="hoverEffect">
          <span className={styles.txt}>企業・団体の方</span>
          <img src="/top/form1.svg" alt="" />
        </a>
      </Link>
      <Link href="/register/?plan=corp">
        <a className="hoverEffect">
          <span className={styles.txt}>
            フリーランス
            <br/>専門家・個人事業主の方
          </span>
          <img src="/top/form2.svg" alt="" />
        </a>
      </Link>
      <Link href="/register/?plan=free">
        <a className="hoverEffect">
          <span className={styles.plan}>フリープラン</span>
          <span className={styles.txt}>一般ユーザーの方</span>
          <img src="/top/form3.svg" alt="" />
        </a>
      </Link>
      <Link href="/register/?plan=corp">
        <a className="hoverEffect">
          <span className={styles.plan}>プレミアムプラン</span>
          <span className={styles.txt}>一般ユーザーの方</span>
          <img src="/top/form4.svg" alt="" />
        </a>
      </Link>
      <Link href="/register/?plan=corp">
        <a className="hoverEffect">
          <span className={styles.txt}>地方自治体の方</span>
          <img src="/top/form5.svg" alt="" />
        </a>
      </Link>
      <Link href="/register/?plan=corp">
        <a className="hoverEffect">
          <span className={styles.txt}>メディアの方</span>
          <img src="/top/form6.svg" alt="" />
        </a>
      </Link>
    </div>
  );
}

export default LinkList;