import styles from '@/styles/liondor/components/modal.module.scss'
import { BlogPattern10 } from '@/components/liondor'

const Modal = ({ show, close, posts, en, jp, present = false }) => {
    return (
        <div
            className={`${styles.modalWrap} ${show ? styles.open : ''}`}
            onClick={close}>
            <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                <h3 className={styles.ttl}>
                    <span className={`ivy ${styles.big}`}>{en}</span>
                    <span className={styles.sm}>{jp}</span>
                </h3>
                <article className={styles.article}>
                    <BlogPattern10 posts={posts} present={present} />
                </article>
            </div>
        </div>
    )
}

export default Modal
