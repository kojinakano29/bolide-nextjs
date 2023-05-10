import styles from '@/styles/corapura/components/nameCard.module.scss'
import dummy from '@/images/corapura/common/dummy4.svg'
import { useCallback, useState } from 'react'

const NameCard = ({ data, slider = false }) => {
    const [modal, setModal] = useState(false)

    const handleClickModal = useCallback(async () => {
        if (!slider) {
            setModal(prevState => !prevState)
        }
    }, [setModal])

    return (
        <>
            {slider ? (
                <a
                    href={`/corapura/${
                        data.c_profile.user.account_type === 0
                            ? 'influencer'
                            : 'company'
                    }/${data.c_profile.user.id}`}
                    className={`${styles.nameCard} hoverEffect`}>
                    <img
                        src={
                            data.thumbs
                                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.thumbs}`
                                : dummy.src
                        }
                        alt="名刺"
                    />
                </a>
            ) : (
                <button
                    type="button"
                    className={`${styles.nameCard} hoverEffect`}
                    onClick={handleClickModal}>
                    <img
                        src={
                            data.thumbs
                                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.thumbs}`
                                : dummy.src
                        }
                        alt="名刺"
                    />
                </button>
            )}

            {modal ? (
                <div className="modalArea" onClick={handleClickModal}>
                    <div
                        className={styles.modalBox}
                        onClick={e => e.stopPropagation()}>
                        <div className={`${styles.nameCard}`}>
                            <img
                                src={
                                    data.thumbs
                                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.thumbs}`
                                        : dummy.src
                                }
                                alt="名刺"
                            />
                        </div>
                        <p className={styles.txt}>{data.title}</p>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default NameCard
