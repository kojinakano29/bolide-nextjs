import styles from '@/styles/liondor/components/button2.module.scss'
import Link from 'next/link';

const Button2 = ({link, name, left = false}) => {
  return (
    <>
      <Link href={link}>
        <a className={`${styles.button2} ivy ${left ? styles.left : ""}`}>
          <span>{name}</span>
        </a>
      </Link>
    </>
  );
}

export default Button2;