import Link from "next/link";
import styles from '@/styles/corapura/components/btn.module.scss'
import icon from '@/images/corapura/parts/linkTriangle.svg'

const Btn2 = ({link, txt}) => {
  return (
    <Link href={link}>
      <a className={styles.btn2}>
        <img src={icon.src} alt="" />
        {txt}
      </a>
    </Link>
  );
}

export default Btn2;