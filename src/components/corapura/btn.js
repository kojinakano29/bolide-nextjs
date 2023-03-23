import styles from '@/styles/corapura/components/btn.module.scss'
import iconR from '@/images/corapura/parts/btn01-arrowRight.svg'
import icon from '@/images/corapura/parts/btn02-arrowRight.svg'

const Btn = ({txt, link, reverse = false, bottom = false, submit = false}) => {
  return (
    <>
      {link ?
        <a href={link} className={`${styles.btn} ${reverse ? styles.reverse : null}`}>
          <img src={reverse ? iconR.src : icon.src} alt="ボタンのアイコン" />
          <span>{txt}</span>
        </a>
      :
        <button type={submit ? null : "button"} className={`${styles.btn} ${reverse ? styles.reverse : null}`}>
          <img src={reverse ? iconR.src : icon.src} alt="ボタンのアイコン" />
          <span>{txt}</span>
        </button>
      }
    </>
  );
}

export default Btn;