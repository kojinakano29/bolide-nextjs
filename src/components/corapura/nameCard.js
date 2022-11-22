import styles from '@/styles/corapura/components/nameCard.module.scss'
import dummy from '@/images/corapura/common/dummy4.svg'

const NameCard = ({data, detail = false}) => {
  return (
    <>
      <button type="button" className={styles.nameCard}>
        <img src={data.thumbs ? data.thumbs : dummy.src} alt="名刺" />
      </button>
      {detail ? <p className={styles.txt}>{data.title}</p> : null}
    </>
  );
}

export default NameCard;