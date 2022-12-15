import styles from '@/styles/dellamall/components/guide.module.scss'
import PageLayoutDellamall from "@/components/Layouts/PageLayoutDellamall";
import Container from '@/components/dellamall/Layouts/container';
import { useCallback, useState } from 'react';
import individual1 from '@/images/dellamall/guide/cont1__individual1.webp'
import individual2 from '@/images/dellamall/guide/cont1__individual2.webp'
import individual3 from '@/images/dellamall/guide/cont1__individual3.webp'
import company1 from '@/images/dellamall/guide/cont1__company1.webp'
import company2 from '@/images/dellamall/guide/cont1__company2.webp'
import company3 from '@/images/dellamall/guide/cont1__company3.webp'
import method1 from '@/images/dellamall/guide/cont2__method1.webp'
import method2 from '@/images/dellamall/guide/cont2__method2.webp'
import method3 from '@/images/dellamall/guide/cont2__method3.webp'
import method4 from '@/images/dellamall/guide/cont2__method4.webp'
import method5 from '@/images/dellamall/guide/cont2__method5.webp'
import save from '@/images/dellamall/guide/cont3__mainLeft.webp'
import Image from 'next/image';
import { Btn01 } from '@/components/dellamall';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';

const Guide = () => {
  const [current, setCurrent] = useState(1)
  const handleClickTab = useCallback((index) => {
    setCurrent(index)
  }, [])

  return (
    <>
      <section className={`cont1 ${styles.topArea}`}>
        <Container small>
          <h2 className="ttl2">使い方ガイド</h2>
          <div className={styles.cont1__what}><span className="en">Della Mall</span>とは？</div>
          <div className={styles.cont1__text}>
            説明が入りますテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル。
          </div>
          <div className={styles.cont1__who}>Della Mallには一般ユーザー様、<br />企業様向けにこんなメリットがあります！</div>
          <div className={styles.cont1__for}>
            <button
              type="button"
              className={`${current === 1 ? styles.isActive : ""}`}
              onClick={() => handleClickTab(1)}
            >一般ユーザー向け</button>
            <button
              type="button"
              className={`${current === 2 ? styles.isActive : ""}`}
              onClick={() => handleClickTab(2)}
            >企業様向け</button>
          </div>
          {current === 1 ?
            <div className={styles.cont1__tabArea}>
              <ul className={styles.cont1__meritList}>
                <li className={styles.cont1__meritItem}>
                  <div className={styles.imgBox}>
                    <Image
                      src={individual1}
                      alt=""
                      layout="responsive"
                      sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                      priority
                    />
                  </div>
                  <div className={styles.cont1__meritItem__forte}>これまで見つけることの<br />できなかったECサイトに出会える</div>
                  <p className={styles.cont1__meritItem__text}>
                    検索軸がECサイトだけなので、スムーズな検索が可能！あなたの理想のお買い物を実現します。
                  </p>
                </li>
                <li className={styles.cont1__meritItem}>
                  <div className={styles.imgBox}>
                    <Image
                      src={individual2}
                      alt=""
                      layout="responsive"
                      sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                      priority
                    />
                  </div>
                  <div className={styles.cont1__meritItem__forte}>
                    あなたのオススメ<br />
                    ECサイトを自由に登録</div>
                  <p className={styles.cont1__meritItem__text}>
                    知る人ぞ知る隠れサイトなどぜひ教えてください！あなたの特別なお買い物体験をたくさんのユーザーに向けて発信できます。
                  </p>
                </li>
                <li className={styles.cont1__meritItem}>
                  <div className={styles.imgBox}>
                    <Image
                      src={individual3}
                      alt=""
                      layout="responsive"
                      sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                      priority
                    />
                  </div>
                  <div className={styles.cont1__meritItem__forte}>
                    推しサイトを「マイモール」<br />
                    としてまとめ、シェア可能♪
                  </div>
                  <p className={styles.cont1__meritItem__text}>
                    自分の推しをあつめた「マイモール」を作成して、色んなユーザーとシェアし合えます。他のユーザーのモールをお気に入りすることも可能！新しい発見が待っています！
                  </p>
                </li>
              </ul>
              <Btn01 fa={faSquarePlus} txt="ショップを作る" link="/dellamall/admin/shop/create" />
            </div>
            :
            <div className={styles.cont1__tabArea}>
              <ul className={styles.cont1__meritList}>
                <li className={styles.cont1__meritItem}>
                  <div className={styles.imgBox}>
                    <Image
                      src={company1}
                      alt=""
                      layout="responsive"
                      sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                      priority
                    />
                  </div>
                  <div className={styles.cont1__meritItem__forte}>アクセス数増加で、<br />”選ばれる”ECサイトになれる！</div>
                  <p className={styles.cont1__meritItem__text}>
                    デラモールからたどり着いたユーザーさんからのアクセスが増え、購入やお問い合わせに繋がる確率UP！ECサイトだけを集めているので、通常のネット検索より多くのユーザーに発見してもらえるんです。
                  </p>
                </li>
                <li className={styles.cont1__meritItem}>
                  <div className={styles.imgBox}>
                    <Image
                      src={company2}
                      alt=""
                      layout="responsive"
                      sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                      priority
                    />
                  </div>
                  <div className={styles.cont1__meritItem__forte}>「マルシェドール」との連携で、<br />掲載から購入までの導線を確保</div>
                  <p className={styles.cont1__meritItem__text}>
                    デラモールへの掲載はもちろん、グループサイトの「マルシェドール」では実際にあなたのお店の商品の出品が可能！ECサイトへのアクセスだけでなく、商品の購入まで一貫したサポート体制が備わっています。
                  </p>
                  <p className={styles.cont1__meritItem__link}>マルシェドール：<a href="https://marche-dor.jp/" target="_blank" rel="noopener noreferrer">https://marche-dor.jp/</a></p>
                </li>
                <li className={styles.cont1__meritItem}>
                  <div className={styles.imgBox}>
                    <Image
                      src={company3}
                      alt=""
                      layout="responsive"
                      sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                      priority
                    />
                  </div>
                  <div className={styles.cont1__meritItem__forte}>「コラプラ」を利用した<br />更なる販路拡大も可能！</div>
                  <p className={styles.cont1__meritItem__text}>
                    グループサイトの「コラプラ」では様々な内容で案件をポストすることができます。例えば「アンケート」を掲載して回答からユーザーニーズの分析をしたり、「タイアップ」を依頼して人気インフルエンサーとのコラボ企画実施…なんてことも可能！使い方次第で販路の拡大は自由自在です。
                  </p>
                  <p className={styles.cont1__meritItem__link}>コラプラ：<Link href="/corapura"><a target="_blank" rel="noopener noreferrer">https://bolides-japan.com/corapura</a></Link></p>
                </li>
              </ul>
              <Btn01 fa={faCircleCheck} txt="公式ショップ申請" link="/dellamall/officialRequest" />
            </div>
          }
        </Container>
      </section>

      <section className={styles.shopCreate}>
        <p className={styles.bkText}>Create Shop</p>
        <Container small>
          <h3 className="ttl3">ショップ作成方法</h3>
          <p className={styles.section__text}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプル
            テキストサンプルテキストサンプル。
          </p>
          <ul className={styles.cont2__methodList}>
            <li className={styles.cont2__methodItem}>
              <div className={styles.imgBox}>
                <Image
                  src={method1}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                  priority
                />
              </div>
              <div className={styles.cont2__methodItem__forte}>お気に入りのECサイトの<br />TOPのURLをコピー！</div>
              <div className={styles.cont2__methodItem__text}>テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル。</div>
            </li>
            <li className={styles.cont2__methodItem}>
              <div className={styles.imgBox}>
                <Image
                  src={method2}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                  priority
                />
              </div>
              <div className={styles.cont2__methodItem__forte}>フォーム内にURLを<br />貼り付け！</div>
              <div className={styles.cont2__methodItem__text}>テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル。</div>
            </li>
            <li className={styles.cont2__methodItem}>
              <div className={styles.imgBox}>
                <Image
                  src={method3}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                  priority
                />
              </div>
              <div className={styles.cont2__methodItem__forte}>あてはまるタグを<br />設定しよう</div>
              <div className={styles.cont2__methodItem__text}>テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル。</div>
            </li>
            <li className={styles.cont2__methodItem}>
              <div className={styles.imgBox}>
                <Image
                  src={method4}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                  priority
                />
              </div>
              <div className={styles.cont2__methodItem__forte}>保存をクリック</div>
              <div className={styles.cont2__methodItem__text}>テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル。</div>
            </li>
            <li className={styles.cont2__methodItem}>
              <div className={styles.imgBox}>
                <Image
                  src={method5}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                  priority
                />
              </div>
              <div className={styles.cont2__methodItem__forte}>登録完了♪</div>
              <div className={styles.cont2__methodItem__text}>テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル。</div>
            </li>
          </ul>
        </Container>
      </section>

      <section className={styles.shopSave}>
        <Container small>
          <p className={styles.bkText}>Keep Shop</p>
          <h3 className="ttl3">ショップ保存方法</h3>
          <p className={styles.section__text}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプル
            テキストサンプルテキストサンプル。
          </p>
          <div className={styles.cont3__main}>
            <div className={styles.cont3__mainLeft}>
              <Image
                src={save}
                alt=""
                layout="responsive"
                sizes="(min-width: 1340px) 420px, (min-width: 768px) 300px, 100vw"
                priority
              />
            </div>
            <ul className={styles.cont3__mainRight}>
              <li>
                <div className={styles.cont3__mainRight__num}></div>
                <div className={styles.cont3__mainRight__text}>
                  ショップ詳細ページへGO
                  <p>テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル。</p>
                </div>
              </li>
              <li>
                <div className={styles.cont3__mainRight__num}></div>
                <div className={styles.cont3__mainRight__text}>
                  気に入った！気になる！と思ったら♡マークをクリック
                  <p>テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル。</p>
                </div>
              </li>
              <li>
                <div className={styles.cont3__mainRight__num}></div>
                <div className={styles.cont3__mainRight__text}>
                  マイページの「保存ショップ」からいつでも確認可能
                  <p>テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル。</p>
                </div>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      <section className={styles.mallCreate}>
        <Container small>
          <p className={styles.bkText}>Create Mall</p>
          <h3 className="ttl3">モール作成方法</h3>
          <div className={styles.cont4__mallWhat}>
            <div className={styles.cont4__mallWhat__title}>モールってそもそも何だろう？</div>
            <p className={styles.cont4__mallWhat__text}>
              テキストサンプルテキストサンプルテキストサンプルテキストテキストサンプルテキストサンプル。
              <br />テキストサンプルテキストサンプルテキストサンプルテキストサンプル、
              <br />テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル。<br />
            </p>
          </div>
          <div className={styles.section__text}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプル
            テキストサンプルテキストサンプル。
          </div>
          <ul className={styles.cont4__mallMethodList}>
            <li className={styles.cont4__mallMethodItem}>
              <p className={styles.cont4__mallMethodItem__num}></p>
              <div className={styles.cont4__mallMethodItem__forte}>
                マイページから
                <br />新規モールを作ろう
              </div>
              <p className={styles.cont4__mallMethodItem__text}>
                テキストサンプルテキストサンプルテキストサンプルテキストテキストサンプル。
              </p>
            </li>
            <li className={styles.cont4__mallMethodItem}>
              <p className={styles.cont4__mallMethodItem__num}></p>
              <div className={styles.cont4__mallMethodItem__forte}>
                モール名を
                <br />入力し保存！
              </div>
              <p className={styles.cont4__mallMethodItem__text}>
                テキストサンプルテキストサンプルテキストサンプルテキストテキストサンプル。
              </p>
            </li>
            <li className={styles.cont4__mallMethodItem}>
              <p className={styles.cont4__mallMethodItem__num}></p>
              <div className={styles.cont4__mallMethodItem__forte}>
                モールに保存したい
                <br />ショップの詳細ページ
                <br />で保存をクリック
              </div>
              <p className={styles.cont4__mallMethodItem__text}>
                テキストサンプルテキストサンプルテキストサンプルテキストテキストサンプル。
              </p>
            </li>
            <li className={styles.cont4__mallMethodItem}>
              <p className={styles.cont4__mallMethodItem__num}></p>
              <div className={styles.cont4__mallMethodItem__forte}>
                保存先の
                <br />モールを選ぶ
              </div>
              <p className={styles.cont4__mallMethodItem__text}>
                テキストサンプルテキストサンプルテキストサンプルテキストテキストサンプル。
              </p>
            </li>
            <li className={styles.cont4__mallMethodItem}>
              <p className={styles.cont4__mallMethodItem__num}></p>
              <div className={styles.cont4__mallMethodItem__forte}>
                自分なりのモールを
                <br />どんどん作ろう♪
              </div>
              <p className={styles.cont4__mallMethodItem__text}>
                テキストサンプルテキストサンプルテキストサンプルテキストテキストサンプル。
              </p>
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
}

export default Guide;

Guide.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}