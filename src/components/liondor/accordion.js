import styles from '@/styles/liondor/components/accordion.module.scss'
import { useRef, useState } from 'react';

const Accordion = ({faq}) => {
  const [target, setTarget] = useState(200)
  const ref = useRef()

  const handleClick = (index) => {
    if (target === index) {
      return setTarget(200)
    }

    setTarget(index)
  }

  return (
    <div className={styles.accordionBox}>
      {faq.map((item, index) => (
        <dl key={index}>
          <dt onClick={() => handleClick(index)}>
            <p className={`ivy ${styles.icon}`}>Q</p>
            <p className={styles.qs}>{item.question}</p>
            <p className={styles.state}>{target === index ? "－" : "＋"}</p>
          </dt>
          <dd
            ref={ref}
            style={
              target === index
              ?
              {
                maxHeight: ref.current.scrollHeight,
              }
              :
              { maxHeight: "0px" }
            }
          >
            <p className={styles.as}>{item.answer}</p>
          </dd>
        </dl>
      ))}
    </div>
  );
}

export default Accordion;