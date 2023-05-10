import styles from '@/styles/corapura/components/guidePopup.module.scss'
import { useCallback, useState } from 'react'

const GuidePopup = ({ txt }) => {
    const [popup, setPopup] = useState(false)

    const handleClickPopup = useCallback(async () => {
        setPopup(prevState => !prevState)
    }, [setPopup])

    return (
        <>
            <button
                type="button"
                className={`${styles.questionIcon} ${
                    popup ? styles.on : null
                } hoverEffect`}
                onClick={handleClickPopup}>
                ?
            </button>

            {popup ? (
                <div
                    className={styles.questionPopup}
                    onClick={handleClickPopup}>
                    <div
                        className={styles.questionBox}
                        onClick={e => e.stopPropagation()}>
                        {txt}
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default GuidePopup
