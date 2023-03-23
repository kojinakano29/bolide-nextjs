import styles from '@/styles/top/components/linkList.module.scss'

const LinkList = () => {
  return (
    <div className={styles.flex}>
      <a href="/register/?plan=corp" className="hoverEffect">
        <span className={styles.txt}>企業・団体の方</span>
        <img src="/top/form1.svg" alt="企業・団体の方" />
      </a>
      <a href="/register/?plan=corp" className="hoverEffect">
        <span className={styles.txt}>
          フリーランス
          <br/>専門家・個人事業主の方
        </span>
        <img src="/top/form2.svg" alt="フリーランス専門家・個人事業主の方" />
      </a>
      <a href="/register/?plan=free" className="hoverEffect">
        <span className={styles.plan}>フリープラン</span>
        <span className={styles.txt}>一般ユーザーの方</span>
        <img src="/top/form3.svg" alt="フリープラン一般ユーザーの方" />
      </a>
      <a href="/register/?plan=corp" className="hoverEffect">
        <span className={styles.plan}>プレミアムプラン</span>
        <span className={styles.txt}>一般ユーザーの方</span>
        <img src="/top/form4.svg" alt="プレミアムプラン一般ユーザーの方" />
      </a>
      <a href="/register/?plan=corp" className="hoverEffect">
        <span className={styles.txt}>地方自治体の方</span>
        <img src="/top/form5.svg" alt="地方自治体の方" />
      </a>
      <a href="/register/?plan=corp" className="hoverEffect">
        <span className={styles.txt}>メディアの方</span>
        <img src="/top/form6.svg" alt="メディアの方" />
      </a>
    </div>
  );
}

export default LinkList;