import styles from '@/styles/top/components/sign_out.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import Container from "@/components/top/Layout/container";
import Link from "next/link";
import { Btn1 } from '@/components/top';

const SignOut = () => {
  return (
    <section className="cont1">
      <Container small900>
        <h2 className="ttl2">退会申請</h2>
        <div className="breadcrumbBox">
          <Link href="/">
            <a>トップ</a>
          </Link>
          <div><img src="/top/breadcrumb.svg" alt="" /></div>
          <Link href="/mypage">
            <a>マイページ</a>
          </Link>
          <div><img src="/top/breadcrumb.svg" alt="" /></div>
          <p>退会申請</p>
        </div>
        <div className={styles.signOutBox}>
          <div className={styles.signOutIcon}>
            <img src="/top/sign_out.svg" alt="注意アイコン" />
          </div>
          <p className={styles.desc}>
            退会手続きを実行します。
            <br/>退会後30日間は再登録することはできません。
          </p>
          <div className={styles.txtBox}>
            <div>ご注意</div>
            <dl>
              <dt className="en">1</dt>
              <dd>
                停止処理には1週間ほどお時間をいただきます。ご申請いただいても当月中に利用停止できない場合がありますので、あらかじめご了承ください。
                <br/>Bolide's Japan IDで利用されている有料サービスの利用停止処理を行います。ただし、こちらのサービスの利用停止は対象外となります。
              </dd>
              <dt className="en">2</dt>
              <dd>
                ご申請いただいた情報は、有料サービスのお申込みをされているご本人様からの申請であることを確認するために利用します。ほかの目的で利用することはありません。
                <br/>ご入力いただく前に、安全のため、本フォームのURLが「https://bolides-japan.com/」で始まることをご確認ください。
              </dd>
              <dt className="en">3</dt>
              <dd>JSを有効にして申請フォームをご利用下さい。無効になっていますとスマホでの申請フォームがご利用できません。</dd>
            </dl>
          </div>
          <p className={styles.desc2}>
            下記ボタンを押すと退会手続きを実行します。
            <br/>お客様の情報は<span>すべて削除</span>されますがよろしいでしょうか？
          </p>
          <div className={styles.btnBox}>
            <Btn1 txt="はい、退会します" />
            <Link href="/mypage">
              <a className={`btn1 ${styles.btn}`}>いいえ、退会しません</a>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SignOut;

SignOut.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}