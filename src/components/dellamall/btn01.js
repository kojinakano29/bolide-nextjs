import styles from '@/styles/dellamall/components/btn01.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Btn01 = ({fa, txt, link, state = false, right = false}) => {
  return (
    <>
      {link ?
        <Link href={link}>
          <a className={`${styles.btn01} ${styles.pushdown} ${right ? styles.right : ""}`}>
            <div className={styles.logo}>
              <FontAwesomeIcon icon={fa} />
            </div>
            {txt}
          </a>
        </Link>
        :
        <button className={`${styles.btn01} ${styles.pushdown} ${right ? styles.right : ""}`} disabled={state}>
          <div className={styles.logo}>
            <FontAwesomeIcon icon={fa} />
          </div>
          {txt}
        </button>
      }
    </>
  );
}

export default Btn01;