import { canCorapura, canDellamall, canLiondor, canMarche } from '@/lib/top/constants';
import styles from '@/styles/top/components/move.module.scss'
import Link from 'next/link';
import React from 'react';
import { useCallback, useState } from 'react';
import Container from './Layout/container';

const Move = () => {
  const [current, setCurrent] = useState(1)

  const handleClickCurrent = useCallback(async (num) => {
    setCurrent(num)
  }, [setCurrent])

  return (
    <section className={styles.moveArea}>
      <Container>
        <div className={styles.flex}>
          <article
            className={`
              ${styles.box}
              ${styles.cora}
              ${current === 1 ? styles.current : null}
            `}
            onClick={() => handleClickCurrent(1)}
          >
            <button
              type="button"
              className={styles.before}
            >
              <img className="pc" src="/top/service-nav1.svg" alt="connect by CORAPURA" />
              <img className="tab" src="/top/service-nav1__sp.svg" alt="connect by CORAPURA" />
            </button>
            <div className={styles.after}>
              <div className={styles.afterFlex}>
                <div className={styles.left}>
                  <div className={styles.midashiBox}>
                    <span className={`${styles.num} en`}>01</span>
                    <span className={styles.txt}>つながる</span>
                  </div>
                  <img className={styles.whatTtl} src="/top/corapura-about.svg" alt="CORAPURAとは" />
                  <p className={styles.desc}>自由な発想で案件登録して、企業や自治体、フリーランス、専門家、インフルエンサー、一般ユーザー、メディアと気軽に多種多様のつながりをもてるアプローチツール。"つながる" "認知拡大""楽しむ"が満載で、お仕事や認知向上につながるプロモーションがいっぱい。</p>
                </div>
                <div className={styles.right}>
                  <Link href="/corapura">
                    <a className="hoverEffect btn1 btn2">CARAPURA公式サイト</a>
                  </Link>
                </div>
              </div>
              <div className={styles.afterCan}>
                <h3 className={styles.canTtl}>
                  <img src="/top/corapura-can.svg" alt="CORAPURAでできること" />
                </h3>
                <div className={`${styles.canFlex} ${styles.type1}`}>
                  {canCorapura.map((cora, index) => (
                    <div key={index}>
                      <img src={cora.src} alt={cora.txt} />
                      <p>
                        {cora.txt.split('\n').map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              {item}
                              <br/>
                            </React.Fragment>
                          )
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
          <article
            className={`
              ${styles.box}
              ${styles.lion}
              ${current === 2 ? styles.current : null}
            `}
            onClick={() => handleClickCurrent(2)}
          >
            <button
              type="button"
              className={styles.before}
            >
              <img className="pc" src="/top/service-nav2.svg" alt="know by LIONDOR" />
              <img className="tab" src="/top/service-nav2__sp.svg" alt="know by LIONDOR" />
            </button>
            <div className={styles.after}>
              <div className={styles.afterFlex}>
                <div className={styles.left}>
                  <div className={styles.midashiBox}>
                    <span className={`${styles.num} en`}>02</span>
                    <span className={styles.txt}>しる</span>
                  </div>
                  <img className={styles.whatTtl} src="/top/liondor-about.svg" alt="LIONDORとは" />
                  <p className={styles.desc}>
                    ファッション×ビジネス×トレンドを突いた情報を発信するWEBサイト。
                    <br/>「見て、知って、感じて」をありのままに体験してもらい、読者の方をリュクスな世界へ。
                    <br/>コラプラ、デラモール、マルシェドール掲載企業やユーザーも光輝く形でご紹介。
                  </p>
                </div>
                <div className={styles.right}>
                  <Link href="/liondor">
                    <a className="hoverEffect btn1 btn2">LIONDOR公式サイト</a>
                  </Link>
                </div>
              </div>
              <div className={styles.afterCan}>
                <h3 className={styles.canTtl}>
                  <img src="/top/liondor-can.svg" alt="LIONDORでできること" />
                </h3>
                <div className={`${styles.canFlex} ${styles.type2}`}>
                  {canLiondor.map((lion, index) => (
                    <div key={index}>
                      <img src={lion.src} alt={lion.txt} />
                      <p>
                        {lion.txt.split('\n').map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              {item}
                              <br/>
                            </React.Fragment>
                          )
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
          <article
            className={`
              ${styles.box}
              ${styles.della}
              ${current === 3 ? styles.current : null}
            `}
            onClick={() => handleClickCurrent(3)}
          >
            <button
              type="button"
              className={styles.before}
            >
              <img className="pc" src="/top/service-nav3.svg" alt="search by Della Mall" />
              <img className="tab" src="/top/service-nav3__sp.svg" alt="search by Della Mall" />
            </button>
            <div className={styles.after}>
              <div className={styles.afterFlex}>
                <div className={styles.left}>
                  <div className={styles.midashiBox}>
                    <span className={`${styles.num} en`}>03</span>
                    <span className={styles.txt}>さがす</span>
                  </div>
                  <img className={styles.whatTtl} src="/top/della-about.svg" alt="Della Mallとは" />
                  <p className={styles.desc}>
                    全国の素敵なECサイトを集めたプラットフォーム。
                    <br/>お気に入りのECサイトを「私が見つけて、私がアップして、みんなにシェア」できて、私が最初の発掘者になれる。あったようでなかった新しくて楽しめるお買い物体験を。
                  </p>
                </div>
                <div className={styles.right}>
                  <Link href="/dellamall">
                    <a className="hoverEffect btn1 btn2">Della Mall公式サイト</a>
                  </Link>
                </div>
              </div>
              <div className={styles.afterCan}>
                <h3 className={styles.canTtl}>
                  <img src="/top/della-can.svg" alt="Della Mallでできること" />
                </h3>
                <div className={`${styles.canFlex} ${styles.type3}`}>
                  {canDellamall.map((della, index) => (
                    <div key={index}>
                      <img src={della.src} alt={della.txt} />
                      <p>
                        {della.txt.split('\n').map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              {item}
                              <br/>
                            </React.Fragment>
                          )
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
          <article
            className={`
              ${styles.box}
              ${styles.marche}
              ${current === 4 ? styles.current : null}
            `}
            onClick={() => handleClickCurrent(4)}
          >
            <button
              type="button"
              className={styles.before}
            >
              <img className="pc" src="/top/service-nav4.svg" alt="shopping by Marche Dor" />
              <img className="tab" src="/top/service-nav4__sp.svg" alt="shopping by Marche Dor" />
            </button>
            <div className={styles.after}>
              <div className={styles.afterFlex}>
                <div className={styles.left}>
                  <div className={styles.midashiBox}>
                    <span className={`${styles.num} en`}>04</span>
                    <span className={styles.txt}>かう</span>
                  </div>
                  <img className={styles.whatTtl} src="/top/marche-about.svg" alt="Marche Dorとは" />
                  <p className={styles.desc}>
                    「笑顔の循環」をコンセプトとし、日本全国の絶品を発掘するお取り寄せ通販サイト。
                    <br/>「安心」「安全」「良い品質」「暖かみのある精神」を大切にしている生産者が生み出す、まだ知られていない日本が誇る唯一無二の絶品を取り揃えお届け。各都道府県のマルシェドールアンバサダー４７名が商品の魅力を全力PR。
                  </p>
                </div>
                <div className={styles.right}>
                  <a className="hoverEffect btn1 btn2" href="https://marche-dor.jp/" target="_blank" rel="noopener noreferrer">Marche Dor公式サイト</a>
                </div>
              </div>
              <div className={styles.afterCan}>
                <h3 className={styles.canTtl}>
                  <img src="/top/marche-can.svg" alt="Marche Dorでできること" />
                </h3>
                <div className={`${styles.canFlex} ${styles.type2}`}>
                  {canMarche.map((marche, index) => (
                    <div key={index}>
                      <img src={marche.src} alt={marche.txt} />
                      <p>
                        {marche.txt.split('\n').map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              {item}
                              <br/>
                            </React.Fragment>
                          )
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}

export default Move;