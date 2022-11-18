import styles from '@/styles/corapura/components/btn.module.scss'
import Link from 'next/link';
import iconR from '@/images/corapura/parts/btn01-arrowRight.svg'
import icon from '@/images/corapura/parts/btn02-arrowRight.svg'

const Btn = ({txt, link, reverse = false, bottom = false, submit = false}) => {
  return (
    <>
      {link ?
        <Link href={link}>
          <a className={`${styles.btn} ${reverse ? styles.reverse : null}`}>
            <img src={reverse ? iconR.src : icon.src} alt="" />
            <span>{txt}</span>
          </a>
        </Link>
      :
        <button type={submit ? null : "button"} className={`${styles.btn} ${reverse ? styles.reverse : null}`}>
          <img src={reverse ? iconR.src : icon.src} alt="" />
          <span>{txt}</span>
        </button>
      }
    </>
  );
}

export default Btn;