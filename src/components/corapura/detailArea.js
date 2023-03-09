import styles from '@/styles/corapura/components/detailArea.module.scss'
import { createContext } from 'react';
import { DetailAreaLeft, DetailAreaRight } from '@/components/corapura';

export const CompanyContext = createContext()

const DetailArea = ({influencer = false, profile, userInfo}) => {
  return (
    <article className={styles.detailBox}>
      <CompanyContext.Provider value={{profile, userInfo}}>
        <DetailAreaLeft influencer={influencer} />
        <DetailAreaRight influencer={influencer} />
      </CompanyContext.Provider>
    </article>
  );
}

export default DetailArea;