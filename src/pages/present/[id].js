import { PageTitle, SnsFollow } from "@/components";
import Container from "@/components/Layouts/container";
import PageLayout from "@/components/Layouts/PageLayout";
import styles from '@/styles/components/presentForm.module.scss'

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/present/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const PresentForm = (posts) => {
  const present = posts.posts.presents

  return (
    <section className="cont1">
      <PageTitle title="PRESENT" ivy />
      <Container small900>
        <h3 className={styles.presentTtl}>{present?.title}</h3>
        <div className={styles.termsBox}>
          <p className={styles.termsTxt}>応募条件</p>
          <p className={styles.txt}>&#9312;Bolide's JAPAN IDメンバー登録が必要です。</p>
          <a className={styles.addon} href="" target="_blank">まだ登録がお済みでない方はこちら</a>
          <p className={styles.txt}>&#9313;リオンドール各種SNSアカウントのいずれかをフォローしていること。</p>
          <SnsFollow gray />
        </div>
        <div className={styles.presentForm}>
          <p className={styles.desc}>
            <span className="red">＊</span>
            は必須項目です。必ずご入力ください。
          </p>
          <div className={styles.formContent}>
            <dl className={styles.dlForm}>
              <dt className={styles.dtForm}>
                SNSアカウント
                <span className="red">＊</span>
              </dt>
              <dd className={styles.ddForm}>
                <dl className={styles.inDlForm}>
                  <dt className={styles.inDtForm}>Facebook ID</dt>
                  <dd className={styles.inDdForm}>
                    <input type="text" placeholder="test@sample.com" />
                  </dd>
                </dl>
                <dl className={styles.inDlForm}>
                  <dt className={styles.inDtForm}>Instagram ID</dt>
                  <dd className={styles.inDdForm}>
                    <input type="text" placeholder="株式会社サンプル" />
                  </dd>
                </dl>
                <dl className={styles.inDlForm}>
                  <dt className={styles.inDtForm}>Twitter ID</dt>
                  <dd className={styles.inDdForm}>
                    <input type="text" placeholder="000-0000-0000" />
                  </dd>
                </dl>
                <p className={styles.supplement}>※Facebook・Instagram・Twitterのいずれかにご入力ください</p>
              </dd>
            </dl>
            <dl className={styles.dlForm}>
              <dt className={styles.dtForm}>
                <span className="red">＊</span>
              </dt>
              <dd className={styles.ddForm}></dd>
            </dl>
            <dl className={styles.dlForm}>
              <dt className={styles.dtForm}>
                <span className="red">＊</span>
              </dt>
              <dd className={styles.ddForm}></dd>
            </dl>
            <dl className={styles.dlForm}>
              <dt className={styles.dtForm}>
                <span className="red">＊</span>
              </dt>
              <dd className={styles.ddForm}></dd>
            </dl>
            <dl className={styles.dlForm}>
              <dt className={styles.dtForm}>
                <span className="red">＊</span>
              </dt>
              <dd className={styles.ddForm}></dd>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PresentForm;

PresentForm.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}