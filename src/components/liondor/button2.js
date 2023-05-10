import styles from '@/styles/liondor/components/button2.module.scss'

const Button2 = ({ link, name, left = false, noto = false }) => {
    return (
        <>
            <a
                href={link}
                className={`${styles.button2} ${left ? styles.left : ''}`}>
                <span className={`${noto ? styles.noto : 'ivy'}`}>{name}</span>
            </a>
        </>
    )
}

export default Button2
