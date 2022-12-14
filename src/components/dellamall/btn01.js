import styles from '@/styles/dellamall/components/btn01.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Btn01 = ({fa, txt, link, right = false, blank = false}) => {
  return (
    <>
      {link && !blank ?
        <Link href={link}>
          <a className={`${styles.btn01} ${styles.pushdown} ${right ? styles.right : ""}`}>
            {fa ?
              <div className={styles.logo}>
                <FontAwesomeIcon icon={fa} />
              </div>
            : null}
            {txt}
          </a>
        </Link>
      : null}
      {link && blank ?
        <a
          href={link}
          className={`${styles.btn01} ${styles.pushdown} ${right ? styles.right : ""}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {fa ?
            <div className={styles.logo}>
              <FontAwesomeIcon icon={fa} />
            </div>
          : null}
          {txt}
        </a>
      : null}
      {!link ?
        <button className={`${styles.btn01} ${styles.pushdown} ${right ? styles.right : ""}`}>
          {fa ?
            <div className={styles.logo}>
              <FontAwesomeIcon icon={fa} />
            </div>
          : null}
          {txt}
        </button>
      : null}
    </>
  );
}

export default Btn01;