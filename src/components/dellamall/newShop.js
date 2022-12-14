import styles from '@/styles/dellamall/components/newShop.module.scss'

const NewShop = ({handleClickOpen}) => {
  return (
    <div className={styles.modalArea} onClick={handleClickOpen}>
      <article className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.ttl}>新着情報</h2>
      </article>
    </div>
  );
}

export default NewShop;