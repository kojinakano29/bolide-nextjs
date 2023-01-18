import styles from '@/styles/liondor/components/catNavi.module.scss'
import { useRouter } from 'next/router';
import { catNavData } from '@/lib/liondor/constants'
import Link from 'next/link';

const CatNavi = ({parentSlug}) => {
  const router = useRouter();
  const { category } = router.query

  return (
    <nav className={styles.nav}>
      <ul>
        {catNavData[parentSlug]?.map((nav, index) => (
          <li key={index}>
            <Link href={nav.link}>
              <a className={`${category === nav.slug ? styles.current : ''} en`}>
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