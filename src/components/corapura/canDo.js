import styles from '@/styles/corapura/components/canDo.module.scss'
import { canDoLeft, canDoRight, canDoImage } from '@/lib/corapura/constants'
import ttl from '@/images/corapura/common/corapura.svg'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { Link as Scroll } from 'react-scroll'

const CanDo = () => {
    const [current, setCurrent] = useState(1)

    const handleClickTab = useCallback(
        async num => {
            setCurrent(num)
        },
        [setCurrent],
    )

    return (
        <article className={styles.cont2__flex}>
            <div className={styles.cont2__flexLeft}>
                <h2 className={styles.cont2__ttl}>
                    <img src={ttl.src} alt="CORAPURA" />
                    <span>でできること</span>
                </h2>
                <div className={styles.cont2__list}>
                    <div className={styles.listBox}>
                        {canDoLeft.map((can, index) => (
                            <Scroll
                                to="current"
                                smooth={true}
                                duration={100}
                                offset={-50}
                                className={`${styles.cont2__item} ${
                                    current === index + 1
                                        ? styles.current
                                        : null
                                }`}
                                key={can.name}
                                onClick={() => handleClickTab(index + 1)}
                                onMouseEnter={() => handleClickTab(index + 1)}>
                                <div className={styles.cont2__item__left}>
                                    {current === index + 1 ? (
                                        <img
                                            className={styles.click__after}
                                            src={can.af.src}
                                            alt={`${can.name}のアイコン`}
                                        />
                                    ) : (
                                        <img
                                            className={styles.click__before}
                                            src={can.bf.src}
                                            alt={`${can.name}のアイコン`}
                                        />
                                    )}
                                </div>
                                <div className={styles.cont2__item__right}>
                                    <p className={styles.cont2__item__name}>
                                        {can.name}
                                        {can.name2 ? <br /> : null}
                                        {can.name2 ? can.name2 : null}
                                    </p>
                                    {current === index + 1 ? (
                                        <p className={styles.cont2__item__desc}>
                                            {can.txt}
                                        </p>
                                    ) : null}
                                </div>
                            </Scroll>
                        ))}
                    </div>
                    <div className={styles.listBox}>
                        {canDoRight.map((can, index) => (
                            <Scroll
                                to="current"
                                smooth={true}
                                duration={100}
                                offset={-50}
                                className={`${styles.cont2__item} ${
                                    current === index + 7
                                        ? styles.current
                                        : null
                                }`}
                                key={can.name}
                                onClick={() => handleClickTab(index + 7)}
                                onMouseEnter={() => handleClickTab(index + 7)}>
                                <div className={styles.cont2__item__left}>
                                    {current === index + 7 ? (
                                        <img
                                            className={styles.click__after}
                                            src={can.af.src}
                                            alt={`${can.name}のアイコン`}
                                        />
                                    ) : (
                                        <img
                                            className={styles.click__before}
                                            src={can.bf.src}
                                            alt={`${can.name}のアイコン`}
                                        />
                                    )}
                                </div>
                                <div className={styles.cont2__item__right}>
                                    <p className={styles.cont2__item__name}>
                                        {can.name}
                                        {can.name2 ? <br /> : null}
                                        {can.name2 ? can.name2 : null}
                                    </p>
                                    {current === index + 7 ? (
                                        <p className={styles.cont2__item__desc}>
                                            {can.txt}
                                        </p>
                                    ) : null}
                                </div>
                            </Scroll>
                        ))}
                    </div>
                </div>
            </div>
            {canDoImage.map((img, index) => (
                <div
                    id={current === index + 1 ? 'current' : null}
                    className={`${styles.cont2__right} ${
                        current === index + 1 ? styles.current : null
                    }`}
                    key={index}>
                    <Image
                        src={img.url}
                        alt={img.alt}
                        layout="responsive"
                        priority
                    />
                </div>
            ))}
        </article>
    )
}

export default CanDo
