import styles from '@/styles/top/components/privacy.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import Container from "@/components/top/Layout/container";
import Link from 'next/link';

const Privacy = () => {
  return (
    <section className={`cont1 ${styles.cont1}`}>
      <Container small900>
        <h2 className="ttl2">プライバシーポリシー</h2>
        <div className="breadcrumbBox">
          <Link href="/">
            <a>トップ</a>
          </Link>
          <div><img src="/top/breadcrumb.svg" alt=">" /></div>
          <p>プライバシーポリシー</p>
        </div>
        <article className={styles.article}>
          <div className={styles.box}>
            <p>
              Bolide’s株式会社（以下、「当社」）は、当社が運営するBolide’s Japan（CORAPURA、Della Mall、LIONDOR、Marche Dorの4サイト）を安心してご利用いただけるようにするため、「Bolide’s Japanの個人情報取扱いに関する基本方針」を定めるとともに、会員の個人情報および個人関連情報の取扱い要領について、プライバシーガイドラインとして以下に開示いたします。なお、本プライバシーガイドラインにおける各用語の定義は次のとおりです。
              <br/>
              <br/>■「個人情報」
              <br/>個人情報とは「個人情報の保護に関する法律」（平成27年9月3日成立。以下、「個人情報保護法」）に定義されている「個人情報」を意味し、氏名、住所等により特定の個人を識別できる情報（それだけでは特定の個人を識別できない情報でも、他の情報と容易に照合することができ、それにより特定の個人を識別することができる情報も含みます。）、および運転免許証番号等の個人識別符号が含まれる情報をいいます。
              <br/>
              <br/>■「特定個人情報」
              <br/>特定個人情報とは「行政手続における特定の個人を識別するための番号の利用等に関する法律」（平成25年5月24日成立。）に定義されている「特定個人情報」を意味し、個人番号（マイナンバー）を含む個人情報をいいます。
              <br/>
              <br/>■「個人関連情報」
              <br/>個人関連情報とは、個人情報保護法に定義されている「個人関連情報」を意味し、例えば、個人情報に該当しないメールアドレス、クッキー等の端末識別子、端末識別子を通じて収集された個人のウェブサイトの閲覧履歴等を含むアクセスログ、商品の購入履歴・サービス利用履歴、位置情報等がこれに該当します。
            </p>
          </div>
          <div className={styles.box}>
            <h3>【第1条　個人情報および個人関連情報の取得】</h3>
            <p>
              当社は、以下の場合に個人情報および個人関連情報を会員から取得させていただきます。なお、特に配慮が必要な要配慮個人情報については、会員から同意を得たうえで取得いたします。
              <br/>&#9312;情報端末を通じて会員にご入力いただく場合
              <br/>&#9313;会員から書面等を通じて直接ご提供いただく場合
              <br/>&#9314;会員によるサービス、コンテンツ、商品、広告等の利用・閲覧に伴って自動的に送信される場合
              <br/>&#9315;会員の同意を得た第三者から提供を受ける場合
              <br/>&#9316;上記の他、適法に取得する場合
            </p>
          </div>
          <div className={styles.box}>
            <h3>【第2条　個人情報の利用目的】</h3>
            <p>
              当社が取得する個人情報の利用目的は次の各号のとおりです。
              <br/>&#9312;会員のニーズに適したコンテンツその他のサービス等を提供するため、また、これを目的として、当社の商品の購入履歴、サービスの利用履歴、アンケート・キャンペーンへの応募履歴、イベントへの参加履歴、コンテンツや広告の閲覧履歴等を利用し調査・分析をするため
              <br/>&#9313;上記（1）の調査・分析結果をもとに、会員のニーズに適したコンテンツその他のサービスの提供や広告の配信等、会員にお勧めのご案内をするため
              <br/>&#9314;ご注文またはご応募いただいた商品・賞品等の配送または代金請求等のため
              <br/>&#9315;上記（2）および（3）を行ううえで必要な情報の確認やご連絡のため（決済手続きにおける金融機関やカード会社等への確認を含みます。）
              <br/>&#9316;アンケートやイベント等にご協力･ご参加いただいた会員や、懸賞等にご応募いただいた会員に結果等を連絡するため
              <br/>&#9317;会員に商品・賞品・イベントその他のサービス等に関するお知らせをするため
              <br/>&#9318;当社のサービス向上・改善、新しいサービスの開発のため（これに関連する上記（1）と同様の調査・分析を含みます。）
              <br/>&#9319;会員からのお問い合わせに対応するため
              <br/>&#9320;不正行為等の防止および対応のため
              <br/>&#9321;提携企業等からの商品・賞品やイベントその他のサービスのご案内および提供企業等から提供された商品・賞品の配送やアンケート等の送付のため
              <br/>&#9322;当社の規約等の制定・変更・廃止等についてお知らせをするため
              <br/>※個人情報の利用目的について別途定めがある場合は、その定めに従い当該個人情報を利用します。当社が会員の同意を得た第三者から個人情報の提供を受ける際に別途定めがある場合についても同様です。
              <br/>※個人情報の提供にあたっては、会員ご自身の判断により、そのご提供の可否を選択できます。ただしご提供いただけない場合には、当社が提供するサービス等をご利用になれない場合があることをご了承ください。
            </p>
          </div>
          <div className={styles.box}>
            <h3>【第3条　個人関連情報の利用について】</h3>
            <p>
              当社は、取得した個人関連情報を以下のような目的で利用します。個人関連情報は、当社が保有している個人情報と結びつけて利用する場合がありますが、その場合の利用目的は、本プライバシーガイドラインで定める「個人情報の利用目的」の範囲内に限るものとします。また、個人関連情報を個人情報として利用することが想定される第三者に個人関連情報を提供する場合には、個人情報保護法に定められた必要な措置を取るものとします。
              <br/>&#9312;会員の同一性の確認のため
              <br/>&#9313;会員のニーズ等について調査・分析するため
              <br/>&#9314;会員のニーズに適したコンテンツやサービス等を提供するため
              <br/>&#9315;広告・メール等で会員にお勧めのご案内をするため
              <br/>&#9316;アンケートやイベント等にご協力・ご参加いただいた方や、プレゼント募集等に応募いただいた方に結果等を連絡するため
              <br/>&#9317;商品・賞品等の配送または代金請求等を行ううえで必要な情報の確認やご連絡のため
              <br/>&#9318;不正行為等の防止および対応のため
              <br/>&#9319;その他会員の利便性およびサービス品質の向上のため
            </p>
          </div>
          <div className={styles.box}>
            <h3>【第4条　個人情報の共同利用について】</h3>
            <p>
              当社および当社のグループ企業がある場合は、取得した個人情報をグループ企業において共同利用します。
              <br/>当社は、会員から取得した個人情報を、下記のとおり共同利用させていただきます。
              <br/>&#9312;共同利用される項目
              <br/>当社が取得したお客様の個人情報に関するすべての項目。
              <br/>&#9313;利用目的
              <br/>「Bolide’s Japanプライバシーガイドライン」における「個人情報の利用目的」の記載のとおり。
              <br/>&#9314;共同利用する個人情報の管理責任者
              <br/>Bolide’s 株式会社
              <br/>代表取締役　金丸　直人
            </p>
          </div>
          <div className={styles.box}>
            <h3>【第5条　個人情報の委託先への提供について】</h3>
            <p>当社は、利用目的の達成に必要な範囲内で、個人情報の取り扱いを国内の第三者に委託する場合があります。その委託先は、当社が信頼するに足ると判断したものに限るものとし、また、当該委託先でも当社の本プライバシーガイドラインに準拠しつつ、会員の個人情報が適切に保護されるよう、必要な措置を取るものとします。</p>
          </div>
          <div className={styles.box}>
            <h3>【第6条　個人情報の第三者提供について】</h3>
            <p>
              当社は、取得した個人情報を、会員の事前の同意を得ることなく第三者に提供いたしません。ただし、次の各号の場合には、個人情報を第三者に提供することがあります。
              <br/>&#9312;刑事訴訟法に基づく照会等、法令に基づく場合
              <br/>&#9313;人の生命、身体または財産の保護に必要であり、かつ本人の同意を得ることが困難である場合
              <br/>&#9314;公衆衛生の向上・児童の健全育成の推進のために特に必要な場合
              <br/>&#9315;国等の公的機関から任意に提供を求められ、当社が適切であると判断した場合
              <br/>&#9316;本サービスの全部または一部の営業譲渡が行われ、譲渡先に対して法的に権利義務一切が引き継がれる場合
              <br/>2当社は、本サービスのサービス向上の目的で第三者へ個人情報を提供する場合は、個人を識別又は特定できない態様にて提携先等第三者に開示又は提供するものとします。
              <br/>※当社は、会員の事前の同意を得て個人情報を特定の第三者に提供する場合も、その提供先に対して、当該個人情報を適切かつ安全に管理するように書面等で求めるものとします。
            </p>
          </div>
          <div className={styles.box}>
            <h3>【第7条　個人情報の管理等について】</h3>
            <p>当社は、「Bolide’s Japanの個人情報取扱いに関するプライバシーガイドライン」に基づき、取得した個人情報の安全管理のために必要かつ適切な措置を講じます。</p>
          </div>
          <div className={styles.box}>
            <h3>【第8条　個人情報の開示等の手続きについて】</h3>
            <p>会員ご本人に関する個人情報の利用目的の通知の求めまたは個人情報若しくは第三者提供記録の開示、個人情報の内容の訂正、追加若しくは削除、個人情報の利用の停止若しくは消去若しくは第三者提供停止の請求については、当社の定める請求手続きに基づくこと、および開示の申し出の場合には、可能な限り合理的な期間内に対応させていただきます。ただし当社の業務遂行に重大な支障をきたす場合や第三者の権利を害する場合については対応できない場合があります。なお個人情報を削除された会員については、当社が運営するウェブサイトが提供する会員サービスのご利用、または商品の購入ができない場合もありますので、その旨あらかじめご承知おきください。</p>
          </div>
          <div className={styles.box}>
            <h3>【第9条　特定個人情報の取扱いについて】</h3>
            <p>
              当社は、特定個人情報を安全かつ適切に取り扱うことが重要な社会的責務であると考え、次のとおり、その適正な取得、利用、保護をはかるとともに、厳正な管理を行います。
              <br/>&#9312;特定個人情報に関する法令およびガイドライン等を遵守して、特定個人情報の適正な取扱いを行います。
              <br/>&#9313;特定個人情報の取扱いに関する社内規程を定め、すべての従業者に遵守させるとともに、必要かつ適切な安全管理体制を徹底します。
              <br/>&#9314;特定個人情報に関するご質問や苦情に対し、法令の規定に基づき、適切に対応いたします。
              <br/>個人情報の取扱いについてのお問い合わせ
            </p>
          </div>
          <div className={styles.box}>
            <h3>【第10条　外部リンクについて】</h3>
            <p>当社が運営するウェブサイトは外部へのリンクを含んでいる場合があります。そうした外部サイトにおける個人情報の取扱いや保護状況、掲載内容に関しては、当社は責任を負いません。外部サイトへのご質問ご意見がある場合には、直接そちらのサイトへお問い合わせください。</p>
          </div>
          <div className={styles.box}>
            <h3>【第11条　プライバシーガイドラインの改訂】</h3>
            <p>当社の事業内容の変更、または個人情報の保護に関連する法令および規範等の改訂に対応するため、本プライバシーガイドラインを改訂する場合があります。本プライバシーガイドラインの重要な内容を改訂する場合には、合理的な周知期間を設け、その改訂内容および効力発生時期等について、適切な方法で告知するものといたします。</p>
          </div>
          <div className={styles.box}>
            <h3>【第12条　個人情報取扱事業者の情報】</h3>
            <p>
              株式会社Bolide's
              <br/>〒460-0008　愛知県名古屋市中区栄3丁目35番地34号
              <br/>代表取締役　金丸　直人
            </p>
          </div>
          <div className={styles.box}>
            <h3>【第13条　個人情報に関するお問い合わせについて】</h3>
            <p>当社の個人情報の取扱いに関するお問い合わせにつきましては、こちらにてお受けいたします。なお、お問い合わせの内容によっては、ご本人であることを確認したうえで対応させていただく場合があります。</p>
          </div>
        </article>
      </Container>
    </section>
  );
}

export default Privacy;

Privacy.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}