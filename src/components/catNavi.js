import styles from '@/styles/components/catNavi.module.scss'
import { useRouter } from 'next/router';
import { catNavData } from '@/lib/constants'
import Link from 'next/link';

const CatNavi = () => {
  const router = useRouter();
  const { category, cat } = router.query

  return (
    <nav className={styles.nav}>
      <ul>
        {catNavData[category].map((nav, index) => (
          <li key={index}>
            <Link href={nav.link}>
              <a className={
                `
                  ${cat === nav.name ? styles.current : ''}
                  ${cat === undefined ? styles.all : ''}
                `
              }>
                {nav.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CatNavi;