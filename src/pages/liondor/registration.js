import { PageTitle } from '@/components/liondor';
import Container from '@/components/liondor/Layouts/container';
import PageLayoutLiondor from '@/components/Layouts/PageLayoutLiondor';
import styles from '@/styles/liondor/components/registration.module.scss'
import Image from 'next/image';
import merit1 from '@/images/liondor/registration/merit1.webp'
import merit2 from '@/images/liondor/registration/merit2.webp'
import merit3 from '@/images/liondor/registration/merit3.webp'
import merit4 from '@/images/liondor/registration/merit4.webp'
import Link from 'next/link';

const Registration = () => {
  return (
    <section className="cont1">
      <PageTitle title="REGISTRATION" ivy />
      <Container>
        <div className={styles.whatIs}>
          <h3 className={styles.ttl}>
            <span className={`${styles.sm} en`}>WHAT IS</span>
            <span className={styles.big}>リオンドールとは</span>
          </h3>
          <h4 className={styles.ttl2}>ビジネス × ファッション × トレンド</h4>
          <p className={styles.txt}>を突いた情報をお届けします。</p>
          <p className={styles.txt2}>「見て、知って、体感して、感じて」<span className={styles.txt}>をありのままに。</span></p>
        </div>
        <div className={styles.merit}>
          <h3 className={styles.ttl}>
            <span className={`${styles.sm} en`}>MERIT</span>
            <span className={styles.big}>リオンドールに登録するメリット</span>
          </h3>
          <div className={styles.flex}>
            <div className={styles.box}>
              <p className={`${styles.num} ivy`}>01</p>
              <div className={styles.imgBox}>
                <Image
                  src={merit1}
                  alt="あらゆるカテゴリーの最新情報で本能を刺激する"
                  layout="responsive"
                  sizes="(min-width: 1340px) 440px, (min-width: 768px) 230px, 100vw"
                  priority
                />
              </div>
              <p className={styles.name}>
                あらゆるカテゴリーの
                <br/>最新情報で本能を刺激する
              </p>
            </div>
            <div className={styles.box}>
              <p className={`${styles.num} ivy`}>02</p>
              <div className={styles.imgBox}>
                <Image
                  src={merit2}
                  alt="会員様はプレゼント応募企画で素敵な商品があたるチャンス"
                  layout="responsive"
                  sizes="(min-width: 1340px) 440px, (min-width: 768px) 230px, 100vw"
                  priority
                />
              </div>
              <p className={styles.name}>
                会員様はプレゼント応募企画で
                <br/>素敵な商品があたるチャンス
              </p>
              <Link href="/liondor/present">
                <a className={styles.link}>プレゼント応募はこちら</a>
              </Link>
            </div>
            <div className={styles.box}>
              <p className={`${styles.num} ivy`}>03</p>
              <div className={styles.imgBox}>
                <Image
                  src={merit3}
                  alt="ビジネス性とファッション性を兼ね備えたサイトでサービスや商品を情報拡散できる"
                  layout="responsive"
                  sizes="(min-width: 1340px) 440px, (min-width: 768px) 230px, 100vw"
                  priority
                />
              </div>
              <p className={styles.name}>
                ビジネス性とファッション性を
                <br/>兼ね備えたサイトでサービスや
                <br/>商品を情報拡散できる
              </p>
              <Link href="/liondor/contact">
                <a className={styles.link}>お問い合わせはこちらから</a>
              </Link>
            </div>
            <div className={styles.box}>
              <p className={`${styles.num} ivy`}>04</p>
              <div className={styles.imgBox}>
                <Image
                  src={merit4}
                  alt="ボリードジャパンのすべての機能が使える"
                  layout="responsive"
                  sizes="(min-width: 1340px) 440px, (min-width: 768px) 230px, 100vw"
                  priority
                />
              </div>
              <p className={styles.name}>
                ボリードジャパンの
                <br/>すべての機能が使える
              </p>
              <a href="https://bolides.co.jp/about/" target="_blank" rel="noopener noreferrer" className={styles.link}>ボリードジャパンとは</a>
            </div>
          </div>
        </div>
        <a href="/register" target="_blank" className="btn4">会員登録はこちら</a>
      </Container>
    </section>
  );
}

export default Registration;

Registration.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}