import styles from '@/styles/components/copyPrivacy.module.scss'
import { PageTitle } from '@/components';
import PageLayout from '@/components/Layouts/PageLayout'
import Container from '@/components/Layouts/container'

const Copyright = () => {
  return (
    <section className="cont1">
      <PageTitle title="著作権・免責事項" />
      <Container>
        <article className={styles.article}>
          <div className={styles.box}>
            <h3>著作権について</h3>
            <p>当ホームページ上に掲載されているすべてのコンテンツ（文章、音楽、絵画、写真、図面・映画・写真・プログラム、編集著作物、レイアウト、デザイン、データベースの著作物、およびそれらの二次的著作物等）には、日本国著作権法及び万国著作権条約によって保護されている著作権若しくは肖像権が存在します。これらのコンテンツの全部あるいは一部を株式会社Bolide'sおよび権利者に断りなく複製、公開、送信、配布、譲渡、貸与、翻訳、転用、転載、変造、放送、販売することはできません。</p>
          </div>
          <div className={styles.box}>
            <h3>免責事項について</h3>
            <p>株式会社Bolide'sでは、細心の注意を払い、当ウェブサイトの管理・運営に取り組んでいます。しかしながら、このウェブサイトで提供する情報等については、主観的な評価や時間の経過による変化が含まれるため、その内容が正確であること、信頼できること、安全であること等についていかなる保証も行いません。また、このウェブサイトのご利用により損害が生じたとしても、一切の責任を負いかねますので、予めご了承ください。</p>
          </div>
          <div className={styles.box}>
            <h3>商標について</h3>
            <p>「LionDor」は株式会社Bolide'sの商標です。その他、当ホームページの中で使用されている会社名、製品名、その他の名称あるいはロゴは、各社または個人の商標または登録商標です。</p>
          </div>
          <div className={styles.box}>
            <h3>レコメンドコンテンツの配信について</h3>
            <p>お客様が当社の提供するWEBサービスを利用される際、第三者から配信されるレコメンドコンテンツが掲載される場合があります。これに関連して、当該第三者がクッキーを発行し、そのクッキー情報を取得、利用している場合があります。第三者が取得したクッキー情報は、当該第三者のプライバシーポリシーに則って取り扱われます。第三者企業各社のプライバシーポリシーについては以下をご覧ください。</p>
          </div>
          <p className={styles.info}>
            ヤフー株式会社
            <br/><a href="http://privacy.yahoo.co.jp/" target="_blank">http://privacy.yahoo.co.jp/</a>
            <br/>
            <br/>Yahoo!コンテンツディスカバリー　「ユーザー情報の取り扱いについて」
            <br/><a href="http://ycd.yahoo.co.jp/privacy/" target="_blank">http://ycd.yahoo.co.jp/privacy/</a>
          </p>
        </article>
      </Container>
    </section>
  );
}

export default Copyright;

Copyright.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}
