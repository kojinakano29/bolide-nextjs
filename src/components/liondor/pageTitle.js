import styles from '@/styles/liondor/components/pageTitle.module.scss'

const PageTitle = ({ title, ivy = false, mb0 = false }) => {
    return (
        <h2
            className={`
        ${styles.pageTitle}
        ${ivy ? 'ivy' : ''}
        ${mb0 ? styles.mb0 : ''}
      `}>
            {title}
        </h2>
    )
}

export default PageTitle
