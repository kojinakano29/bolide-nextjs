import styles from '@/styles/components/button2.module.scss'
import Link from 'next/link';

const Button2 = ({link}) => {
  return (
    <>
      <Link href={link}>
        <a className={`${styles.button2} ivy`}>
          <span>view all</span>
        </a>
      </Link>
    </>
  );
}

export default Button2;