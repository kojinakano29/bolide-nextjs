import styles from '@/styles/liondor/components/pageNavi.module.scss'
import { pageNaviData } from '@/lib/liondor/constants'
import { useRouter } from 'next/router';

const PageNavi = ({white = false, footer = false}) => {
  const router = useRouter();
  const { category } = router.query

  return (
    <nav className={`${styles.naviList} ${footer ? styles.footer : null}`}>
      <ul className={white ? styles.colorWhite : ''}>
        {pageNaviData.map((items, index) => (
          <li key={index}>
              <a href={items.link} className={`en ${items.slug === category ? styles.current : ''}`}>{items.name}</a>
          </li>
        ))}
        <li>
          <a href="/liondor/#pickUp" className="en">Pickup Information</a>
        </li>
      </ul>
    </nav>
  );
}

export default PageNavi;