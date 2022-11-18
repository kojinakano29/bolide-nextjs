import styles from '@/styles/corapura/components/terms.module.scss'
import Container from "@/components/corapura/Layout/container";
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";

const TradeLaw = () => {
  return (
    <section className="cont1">
      <Container small900>
        <h2 className="ttl1">特定商品取引法に基づく表記</h2>
        <div className={styles.list}>
          <dl>
            <dt>販売業者</dt>
            <dd>株式会社 テキストサンプル</dd>
          </dl>
          <dl>
            <dt>運営統括責任者名</dt>
            <dd>名前　名前</dd>
          </dl>
          <dl>
            <dt>住所</dt>
            <dd>テキストサンプルテキストサンプルテキストサンプルテキストサンプル</dd>
          </dl>
          <dl>
            <dt>電話番号</dt>
            <dd>00-0000-0000</dd>
          </dl>
          <dl>
            <dt>商品代金以外の料金の説明</dt>
            <dd>
              配送料：送料一律440円（一部地域・離島を除く）
              <br/>代金引換えでのご注文の場合、別途下記代引き手数料が発生します。
            </dd>
          </dl>
          <dl>
            <dt>不良品</dt>
            <dd>初期からの不良、内容相違などが認められる場合は、同等商品と交換、または返金致します。ただし、在庫のない場合は、返金させて頂きます。</dd>
          </dl>
          <dl>
            <dt>販売数量</dt>
            <dd>
              原則サイト上に在庫表記があるもののみ。
              <br/>注文商品が在庫切れの場合はご連絡致します。
            </dd>
          </dl>
          <dl>
            <dt>引渡し時期</dt>
            <dd>
              通常3営業日以内に発送
              <br/>（予約商品・在庫切れ商品・注文内容に確認事項が発生した場合を除く。）
            </dd>
          </dl>
          <dl>
            <dt>お支払い方法</dt>
            <dd>
              以下のお支払い方法に対応しております。
              <br/>- クレジットカード決済
              <br/>- 代金引換
              <br/>- コンビニ決済
            </dd>
          </dl>
          <dl>
            <dt>お支払い期限</dt>
            <dd>
              ＜代金引換＞
              <br/>商品お受け取り時にお支払いいただきます。
              <br/>＜クレジットカード＞
              <br/>ご利用のクレジットカードの締め日や契約内容により異なります。
              <br/>ご利用されるカード会社までご確認ください。
            </dd>
          </dl>
          <dl>
            <dt>返品について</dt>
            <dd>
              ご返品は未開封のものに限り商品到着後8日以内にご連絡ください。お客様のご都合による返品の場合、返送料はお客様ご負担のうえ、返金の際は事務手数料600円を差し引いた商品代金のご返金となります。
              <br/>
              <br/>＜ご返送先＞
              <br/>〒000-0000　住所テキストサンプル
              <br/>※ご返品の場合は、事前にご連絡いただきますようお願いいたします。
            </dd>
          </dl>
          <dl>
            <dt>屋号またはサービス名</dt>
            <dd>テキストサンプル</dd>
          </dl>
          <dl>
            <dt>公開メールアドレス</dt>
            <dd>textsample@email.com</dd>
          </dl>
          <dl>
            <dt>ホームページアドレス</dt>
            <dd>https://example.jp/</dd>
          </dl>
        </div>
      </Container>
    </section>
  );
}

export default TradeLaw;

TradeLaw.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}