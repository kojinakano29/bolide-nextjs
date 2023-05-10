import styles from '@/styles/corapura/components/faq.module.scss'
import { useCallback, useState } from 'react'
import Container from './Layout/container'
import plus from '@/images/corapura/parts/plus.svg'
import minus from '@/images/corapura/parts/minus.svg'
import { Btn } from '@/components/corapura'

const Faq = ({ faqs }) => {
    const [current, setCurrent] = useState()
    const [more, setMore] = useState(false)

    const before = faqs.filter((faq, index) => {
        return index < 4
    })

    const after = faqs.filter((faq, index) => {
        return index > 3
    })

    const handleClickFaq = useCallback(
        async num => {
            if (num === current) {
                setCurrent(null)
                return
            }
            setCurrent(num)
        },
        [current, setCurrent],
    )

    const handleClickMore = useCallback(async () => {
        setMore(prevState => !prevState)
    }, [setMore])

    return (
        <article className={styles.faqBox}>
            <Container small900>
                <h3 className={styles.ttl}>よくあるご質問</h3>
                <div className={styles.faq}>
                    {before.map((faq, index) => (
                        <dl
                            className={
                                current === index ? styles.current : null
                            }
                            key={index}>
                            <dt onClick={() => handleClickFaq(index)}>
                                <div>Q</div>
                                <p>{faq.qs}</p>
                                <img
                                    src={
                                        current === index ? minus.src : plus.src
                                    }
                                    alt="アイコン"
                                />
                            </dt>
                            <dd>
                                <p>{faq.as}</p>
                            </dd>
                        </dl>
                    ))}
                    {more
                        ? after.map((faq, index) => (
                              <dl
                                  className={
                                      current === index + 4
                                          ? styles.current
                                          : null
                                  }
                                  key={index + 4}>
                                  <dt onClick={() => handleClickFaq(index + 4)}>
                                      <div>Q</div>
                                      <p>{faq.qs}</p>
                                      <img
                                          src={
                                              current === index + 4
                                                  ? minus.src
                                                  : plus.src
                                          }
                                          alt="アイコン"
                                      />
                                  </dt>
                                  <dd>
                                      <p>{faq.as}</p>
                                  </dd>
                              </dl>
                          ))
                        : null}
                </div>
                {!more ? (
                    <div className="btnCover" onClick={handleClickMore}>
                        <Btn txt="さらに見る" />
                    </div>
                ) : null}
            </Container>
        </article>
    )
}

export default Faq
