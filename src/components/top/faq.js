import { faqs } from '@/lib/top/constants';
import styles from '@/styles/top/components/faq.module.scss'
import { useRef, useState } from 'react';
import Container from "./Layout/container";

const Faq = () => {
  const [target, setTarget] = useState(200)
  const ref = useRef()

  const handleClick = (index) => {
    if (target === index) {
      return setTarget(200)
    }

    setTarget(index)
  }

  return (
    <section id="faq" className={styles.faqArea}>
      <Container small900>
        <h2 className="ttl1 center">
          <span className="sm">よくあるご質問</span>
        </h2>
        <div className={styles.faqBox}>
          {faqs.map((faq, index) => (
            <dl className={target === index ? styles.on : null} key={index}>
              <dt onClick={() => handleClick(index)}>
                <span className="en">Q</span>
                <p>{faq.qs}</p>
                <div>
                  {target === index ? "ー" : "＋"}
                </div>
              </dt>
              <dd
                ref={ref}
                style={
                  target === index ?
                  {maxHeight: ref.current.scrollHeight,}
                  :
                  {maxHeight: "0px"}
                }
              >
                {faq.as}
              </dd>
            </dl>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Faq;