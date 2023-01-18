import styles from '@/styles/liondor/components/button2.module.scss'
import Link from 'next/link';

const Button2 = ({link, name, left = false, noto = false}) => {
  return (
    <>
      <Link href={link}>
        <a className={`${styles.button2} ${left ? styles.left : ""}`}>
          <span className={`${noto ? styles.noto : "ivy"}`}>{name}</span>
        </a>
      </Link>
    </>
  );
}

export default Button2;