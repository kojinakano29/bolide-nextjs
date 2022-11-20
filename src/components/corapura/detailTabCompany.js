import styles from '@/styles/corapura/components/detailTab.module.scss'
import { useCallback, useState } from 'react';
import Container from './Layout/container';

const DetailTabCompany = ({businesses, releases, matters}) => {
  const [tab1, setTab1] = useState(0)
  const [tab2, setTab2] = useState(0)
  const [tab3, setTab3] = useState(0)

  const handleClickTab1 = useCallback(async (num) => {
    setTab1(num)
  }, [setTab1])

  const handleClickTab2 = useCallback(async (num) => {
    setTab2(num)
  }, [setTab2])

  const handleClickTab3 = useCallback(async (num) => {
    setTab3(num)
  }, [setTab3])

  return (
    <>
      <section className={styles.tabArea}>
        <Container small>
          <div className={styles.tabBtnBox}>
            <button
              type="button"
              className={`${tab1 === 0 ? styles.tabOn : null}`}
              onClick={() => handleClickTab1(0)}
            >この企業の案件一覧</button>
            <button
              type="button"
              className={`${tab1 === 1 ? styles.tabOn : null}`}
              onClick={() => handleClickTab1(1)}
            >コラプラした企業・ユーザー一覧</button>
          </div>
        </Container>
        <div className={styles.tabBox}>
          <Container small></Container>
        </div>
      </section>

      <section className={styles.tabArea}>
        <Container small>
          <div className={`${styles.tabBtnBox} ${styles.five}`}>
            <button
              type="button"
              className={`${tab2 === 0 ? styles.tabOn : null}`}
              onClick={() => handleClickTab2(0)}
            >
              ビジネス
              <br/>インフォメーション
            </button>
            <button
              type="button"
              className={`${tab2 === 1 ? styles.tabOn : null}`}
              onClick={() => handleClickTab2(1)}
            >事業所・店舗</button>
            <button
              type="button"
              className={`${tab2 === 2 ? styles.tabOn : null}`}
              onClick={() => handleClickTab2(2)}
            >プレジデント</button>
            <button
              type="button"
              className={`${tab2 === 3 ? styles.tabOn : null}`}
              onClick={() => handleClickTab2(3)}
            >
              NFT/製品・商品
              <br/>特許・技術
            </button>
            <button
              type="button"
              className={`${tab2 === 4 ? styles.tabOn : null}`}
              onClick={() => handleClickTab2(4)}
            >SDGs</button>
          </div>
        </Container>
        <div className={styles.tabBox}>
          <Container small></Container>
        </div>
      </section>

      <section className={styles.tabArea}>
        <Container small>
          <div className={`${styles.tabBtnBox} ${styles.five}`}>
            <button
              type="button"
              className={`${tab3 === 0 ? styles.tabOn : null}`}
              onClick={() => handleClickTab3(0)}
            >プレスリリース</button>
            <button
              type="button"
              className={`${tab3 === 1 ? styles.tabOn : null}`}
              onClick={() => handleClickTab3(1)}
            >名刺</button>
            <button
              type="button"
              className={`${tab3 === 2 ? styles.tabOn : null}`}
              onClick={() => handleClickTab3(2)}
            >オンラインサロン</button>
            <button
              type="button"
              className={`${tab3 === 3 ? styles.tabOn : null}`}
              onClick={() => handleClickTab3(3)}
            >クーポン</button>
            <button
              type="button"
              className={`${tab3 === 4 ? styles.tabOn : null}`}
              onClick={() => handleClickTab3(4)}
            >
              スポンサー
              <br/>マスコット
            </button>
          </div>
        </Container>
        <div className={styles.tabBox}>
          <Container small></Container>
        </div>
      </section>
    </>
  );
}

export default DetailTabCompany;