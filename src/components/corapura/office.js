import styles from '@/styles/corapura/components/office.module.scss'

const Office = ({ data }) => {
    return (
        <article className={styles.officeBox}>
            {data.map((item, index) => (
                <div className={styles.card} key={index}>
                    <p className={styles.catch}>{item.category}</p>
                    <p className={styles.name}>{item.title}</p>
                    <p className={styles.address}>{item.content}</p>
                </div>
            ))}
        </article>
    )
}

export default Office
