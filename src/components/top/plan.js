import useAccordion from '@/hooks/useAccordion';
import styles from '@/styles/top/components/plan.module.scss'

const Plan = ({plan, num}) => {
  const { isOpen, setIsOpen, accordionRef } = useAccordion({def: num === 0 ? true : false})

  return (
    <div className={`
      ${styles.item}
      ${plan.color === "corapura" ? styles.corapura : null}
      ${plan.color === "della" ? styles.della : null}
      ${plan.color === "liondor" ? styles.liondor : null}
      ${plan.color === "marche" ? styles.marche : null}
    `}>
      <button
        type="button"
        aria-controls={`planImg${num}`}
        aria-expanded={!isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{isOpen ? "ー" : "＋"}</div>
        <img src={plan.name} alt="" />
      </button>
      <div
        id={`planImg${num}`}
        className={styles.imgBox}
        aria-hidden={!isOpen}
        ref={accordionRef}
      >
        <img src={plan.graph} alt="" />
      </div>
    </div>
  );
}

export default Plan;