import styles from '@/styles/corapura/components/btn.module.scss'
import icon from '@/images/corapura/parts/linkTriangle.svg'

const Btn2 = ({link, txt}) => {
  return (
    <a href={link} className={styles.btn2}>
      <img src={icon.src} alt="ボタンのアイコン" />
      {txt}
    </a>
  );
}

export default Btn2;