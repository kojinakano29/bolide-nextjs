import styles from '@/styles/top/components/privacy.module.scss'
import Container from "@/components/corapura/Layout/container";
import PageLayoutTop from '@/components/Layouts/pageLayoutTop';
import Link from 'next/link';

const Tokushoho = () => {
  return (
    <section className={`cont1 ${styles.cont1}`}>
      <Container small900>
        <h2 className="ttl2">特定商品取引法に基づく表記</h2>
        <div className="breadcrumbBox">
          <Link href="/">
            <a>トップ</a>
          </Link>
          <div><img src="/top/breadcrumb.svg" alt="" /></div>
          <p>特定商品取引法に基づく表記</p>
        </div>
        <div className={styles.list}>
          <dl>
            <dt>サービス名</dt>
            <dd>Bolide’s Japan （ボリードジャパン）</dd>
          </dl>
          <dl>
            <dt>
              販売事業者名
              <br/>（会社名）
            </dt>
            <dd>株式会社　Bolide’s</dd>
          </dl>
          <dl>
            <dt>代表者名</dt>
            <dd>代表取締役　金丸　直人</dd>
          </dl>
          <dl>
            <dt>所在地</dt>
            <dd>
              〒460-0008
              <br/>名古屋市中区栄3丁目35番地34号
            </dd>
          </dl>
          <dl>
            <dt>お問い合わせ</dt>
            <dd>こちら（ <a href="mailto:info@bolides.co.jp">info@bolides.co.jp</a> ）からお問い合わせください。</dd>
          </dl>
          <dl>
            <dt>電話番号</dt>
            <dd>052-678-2415</dd>
          </dl>
          <dl>
            <dt>電話受付時間</dt>
            <dd>9：00～18：00</dd>
          </dl>
          <dl>
            <dt>販売価格</dt>
            <dd>
              購入手続きの際に画面に表示されます。
              <br/>消費税は内税として表示しております。
            </dd>
          </dl>
          <dl>
            <dt>追加手数料</dt>
            <dd>
              各種銀行振込手数料／オンラインサロン掲載時の事務手数料／通販サイトへ商品掲載時の販売手数料
              <br/>
              <br/>また、当サイトの閲覧、利用、コンテンツ購入等に必要となるインターネット接続料金、通信料金は、お客様のご負担となります。
            </dd>
          </dl>
          <dl>
            <dt>お支払方法</dt>
            <dd>
              以下のいずれかのお支払方法をご利用いただけます。
              <br/>・各種クレジットカード
              <br/>・銀行振込
            </dd>
          </dl>
          <dl>
            <dt>支払い時期</dt>
            <dd>
              各種クレジットカード決済の場合はただちに処理されますが、国内の銀行振込の場合は申請から５日以内にお振り込みいただく必要があります。
              <br/>※引き落とし日等については、クレジットカード会社の定めによります。
            </dd>
          </dl>
          <dl>
            <dt>サービス購入方法</dt>
            <dd>当サイトの新規会員登録からユーザー情報を入力し、「送信」ボタンを押下し登録申請。その後、弊社からの審査結果のメールと共に決済画面のURLを送付します。URLから決済が完了後サービスが利用できるようになります。</dd>
          </dl>
          <dl>
            <dt>サービスの利用が<br className="pc" />可能となる時期</dt>
            <dd>特別な定めを置いている場合を除き、ユーザー情報を入力し、弊社の審査完了、決済完了後、直ちにご利用いただけます。（フリープランの場合は審査がありません。）</dd>
          </dl>
          <dl>
            <dt>返品・キャンセル</dt>
            <dd>
              １.お客様のご都合による返品・キャンセル
              <br/>サービスの性質上、月額プランご購入後の返金・返品はできかねます。あらかじめサービスの月額プラン対象コンテンツ、利用環境をよくお確かめの上、お申込み、もしくはご購入願います。
              <br/>
              <br/>２.サービスの瑕疵に基づく返品（キャンセル）
              <br/>サービスに瑕疵が発見されたときは、瑕疵を修補したサービスにバージョンアップ又はその他適切な方法で提供いたします。
            </dd>
          </dl>
          <dl>
            <dt>特別条件</dt>
            <dd>
              １．クーリングオフについて
              <br/>特定商取引法に規定されているクーリングオフが適用されるサービスではありません。
              <br/>
              <br/>２．定期課金方式の注意事項
              <br/>契約期間途中の解約となった場合も契約満了日までの料金が発生し、日割精算等による返金を含めた一切の返金は行われません。この場合、サービスも契約満了日まで提供されます。
            </dd>
          </dl>
          <dl>
            <dt>サイトアドレス</dt>
            <dd>
              <a href="https://bolides-japan.com/" target="_blank">https://bolides-japan.com/</a>
            </dd>
          </dl>
        </div>
      </Container>
    </section>
  );
}

export default Tokushoho;

Tokushoho.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}