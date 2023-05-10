import styles from '@/styles/corapura/components/method.module.scss'
import Container from './Layout/container'
import putOn from '@/images/corapura/use/putOn.svg'
import find from '@/images/corapura/use/find.svg'
import putOn1 from '@/images/corapura/use/putOn_img1.svg'
import putOn2 from '@/images/corapura/use/putOn_img2.svg'
import putOn3 from '@/images/corapura/use/putOn_img3.svg'
import putOn4 from '@/images/corapura/use/putOn_img4.svg'
import putOn5 from '@/images/corapura/use/putOn_img5.svg'
import putOn6 from '@/images/corapura/use/putOn_img6.svg'
import find1 from '@/images/corapura/use/find_img1.svg'
import find2 from '@/images/corapura/use/find_img2.svg'
import find3 from '@/images/corapura/use/find_img3.svg'
import find4 from '@/images/corapura/use/find_img4.svg'
import find5 from '@/images/corapura/use/find_img5.svg'
import find6 from '@/images/corapura/use/find_img6.svg'
import find7 from '@/images/corapura/use/find_img7.svg'
import iconR from '@/images/corapura/parts/btn01-arrowRight.svg'
import parts1 from '@/images/corapura/use/use__bottom1.webp'
import parts2 from '@/images/corapura/use/use__bottom2.webp'

const Method = () => {
    return (
        <section className={styles.methodArea}>
            <Container small>
                <h3 className={styles.ttl}>ご利用方法</h3>
                <article className={styles.methodFlex}>
                    <div className={styles.left}>
                        <div className={styles.iconBoxSm}>
                            <img src={putOn.src} alt="案件を出したい人" />
                            <p>案件を出したい人</p>
                        </div>
                        <div className={styles.putOn__item}>
                            <div className={styles.imgBox}>
                                <img src={putOn1.src} alt="会員登録" />
                                <p className="sp">会員登録</p>
                            </div>
                            <div className={styles.txtBox}>
                                <p className="pc">会員登録</p>
                                <span>
                                    まずはBolide's Japanで
                                    <a href="/register">アカウント登録</a>
                                </span>
                            </div>
                        </div>
                        <div className={styles.putOn__item}>
                            <div className={styles.imgBox}>
                                <img src={putOn2.src} alt="案件投稿" />
                                <p className="sp">案件投稿</p>
                            </div>
                            <div className={styles.txtBox}>
                                <p className="pc">案件投稿</p>
                                <span>
                                    募集したいカテゴリで案件記事を記入し、投稿
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.putOn__item} ${styles.mt264}`}>
                            <div className={styles.imgBox}>
                                <img src={putOn3.src} alt="応募通知" />
                                <p className="sp">応募通知</p>
                            </div>
                            <div className={styles.txtBox}>
                                <p className="pc">応募通知</p>
                                <span>
                                    ユーザーからの応募があった場合、マイページに通知がきます！
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.center}></div>
                    <div className={styles.right}>
                        <div className={styles.iconBoxSm}>
                            <img src={find.src} alt="案件を探したい人" />
                            <p>案件を探したい人</p>
                        </div>
                        <div className={styles.find__item}>
                            <div className={styles.imgBox}>
                                <img src={find1.src} alt="ユーザー登録" />
                                <p className="sp">ユーザー登録</p>
                            </div>
                            <div className={styles.txtBox}>
                                <p className="pc">ユーザー登録</p>
                                <span>
                                    まずはBolide's Japanで
                                    <a href="/register">アカウント登録</a>
                                </span>
                            </div>
                        </div>
                        <div className={`${styles.find__item} ${styles.mt96}`}>
                            <div className={styles.imgBox}>
                                <img src={find2.src} alt="案件を検索" />
                                <p className="sp">案件を検索</p>
                            </div>
                            <div className={styles.txtBox}>
                                <p className="pc">案件を検索</p>
                                <span>
                                    自分のやりたい案件を色んな条件から探してみましょう
                                </span>
                            </div>
                        </div>
                        <div className={styles.find__item}>
                            <div className={styles.imgBox}>
                                <img src={find3.src} alt="案件に応募" />
                                <p className="sp">案件に応募</p>
                            </div>
                            <div className={styles.txtBox}>
                                <p className="pc">案件に応募</p>
                                <span>希望の案件を見つけたらLet's応募！</span>
                            </div>
                        </div>
                        <div className={styles.find__item}>
                            <div className={styles.imgBox}>
                                <img src={find4.src} alt="採用の通知" />
                                <p className="sp">採用の通知</p>
                            </div>
                            <div className={styles.txtBox}>
                                <p className="pc">採用の通知</p>
                                <span>
                                    採用されれば採用通知がマイページに届きます！
                                </span>
                            </div>
                        </div>
                    </div>
                </article>

                <div className={styles.chain}></div>

                <article className={styles.methodBox}>
                    <div className={styles.left}>
                        <img src={putOn4.src} alt="制約のアイコン" />
                    </div>
                    <div className={styles.center}>
                        <p>成約</p>
                        <span>
                            案件主と応募者とのマッチが完了し、
                            <br className="sp" />
                            無事成約となれば案件開始！
                        </span>
                    </div>
                    <div className={styles.right}>
                        <img src={find5.src} alt="制約のアイコン" />
                    </div>
                </article>

                <div className={styles.chain}></div>

                <article className={styles.methodBox}>
                    <div className={styles.left}>
                        <img src={putOn5.src} alt="案件内容実施のアイコン" />
                    </div>
                    <div className={styles.center}>
                        <p>案件内容実施</p>
                        <span>
                            各種案件によって内容を実施
                            <br />
                            ※内容により流れは変わります
                        </span>
                    </div>
                    <div className={styles.right}>
                        <img src={find6.src} alt="案件内容実施のアイコン" />
                    </div>
                </article>

                <div className={styles.chain}></div>

                <article className={styles.methodFlex}>
                    <div className={styles.left}>
                        <div className={styles.putOn__item}>
                            <div className={styles.imgBox}>
                                <img src={putOn6.src} alt="報酬お渡し" />
                                <p className="sp">報酬お渡し</p>
                            </div>
                            <div className={styles.txtBox}>
                                <p className="pc">報酬お渡し</p>
                                <span>
                                    案件が完了したら報酬をお渡ししてください！
                                    <br />
                                    ※内容によって流れは変わります
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.center}></div>
                    <div className={`${styles.right} ${styles.mt72}`}>
                        <div className={styles.find__item}>
                            <div className={styles.imgBox}>
                                <img src={find7.src} alt="報酬受取" />
                                <p className="sp">報酬受取</p>
                            </div>
                            <div className={styles.txtBox}>
                                <p className="pc">報酬受取</p>
                                <span>
                                    無事案件を完了したら、報酬を受け取りましょう！
                                    ※内容によって流れは変わります
                                </span>
                            </div>
                        </div>
                    </div>
                </article>

                <div className={styles.linkArea}>
                    <img
                        className={styles.parts1}
                        src={parts1.src}
                        alt="イラスト"
                    />
                    <img
                        className={styles.parts2}
                        src={parts2.src}
                        alt="イラスト"
                    />
                    <p>
                        例えば、
                        <span>「コラボしたい」</span>
                        や
                        <br className="sp" />
                        <span>「求人募集」</span>
                        などなど
                        <br className="pc" />
                        報酬が
                        <br className="sp" />
                        発生しないような案件も
                        <br className="sp" />
                        多種掲載できます！
                    </p>
                    <a
                        href="/corapura"
                        className={`${styles.btn} ${styles.reverse}`}>
                        <img src={iconR.src} alt="アイコン" />
                        <span>
                            より詳しい案件別の
                            <br className="sp" />
                            活用事例はコチラから！
                        </span>
                    </a>
                </div>
            </Container>
        </section>
    )
}

export default Method
