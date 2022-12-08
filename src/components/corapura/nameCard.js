import styles from '@/styles/corapura/components/nameCard.module.scss'
import dummy from '@/images/corapura/common/dummy4.svg'

const NameCard = ({data, detail = false}) => {
  return (
    <>
      <button type="button" className={`${styles.nameCard} ${detail ? null : "hoverEffect"}`}>
        <img src={data.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.thumbs}` : dummy.src} alt="名刺" />
      </button>
      {detail ? <p className={styles.txt}>{data.title}</p> : null}
    </>
  );
}

export default NameCard;