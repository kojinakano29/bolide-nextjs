import styles from '@/styles/corapura/components/nameCard.module.scss'
import dummy from '@/images/corapura/common/dummy4.svg'

const NameCard = ({data}) => {
  return (
    <>
      <button type="button" className={styles.nameCard}>
        <img src={data.thumbs ? data.thumbs : dummy.src} alt="名刺" />
      </button>
    </>
  );
}

export default NameCard;