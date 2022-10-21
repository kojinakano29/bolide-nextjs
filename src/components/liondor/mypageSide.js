import styles from '@/styles/liondor/components/mypageSide.module.scss'
import { useCallback, useState } from 'react';
import { Modal, BlogPattern10 } from '@/components/liondor';

const MypageSide = ({posts, en, jp}) => {
  const [modal, setModal] = useState(false)
  const toggleModal = useCallback(() => {
    setModal(!modal)
  }, [setModal, modal])

  return (
    <>
      <h3 className={styles.ttl}>
        <span className={`ivy ${styles.big}`}>{en}</span>
        <span className={styles.sm}>{jp}</span>
      </h3>
      <article className={styles.side}>
        <BlogPattern10 posts={posts} />
      </article>
      <button type="button" className={`btn3 ${styles.btn}`} onClick={toggleModal}>一覧を見る</button>
      <Modal show={modal} close={toggleModal} posts={posts} en={en} jp={jp} />
    </>
  );
}

export default MypageSide;