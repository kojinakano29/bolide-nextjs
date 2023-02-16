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
      ${plan.color === "bj" ? styles.bj : null}
    `}>
      <button
        type="button"
        aria-controls={`planGraph${num}`}
        aria-expanded={!isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{isOpen ? "ー" : "＋"}</div>
        <img src={plan.name} alt="" />
        {plan.color === "bj" ?
          <span>※プレミアムプランを含みます</span>
        : null}
      </button>
      <div
        id={`planGraph${num}`}
        className={styles.graphBox}
        aria-hidden={!isOpen}
        ref={accordionRef}
      >
        {plan.color === "bj" ?
        <img src={plan.graph} alt="" />
        :
        plan.graph.map((item, index) => (
          <dl key={index}>
            <dt className={styles.left}>{item.left}</dt>
            <dd className={styles.center}>
              {item.center === 1 ?
                <img src="/top/graph_check.svg" alt="" />
              : null}
              {item.center === 2 ?
                <img src="/top/graph_limit.svg" alt="" />
              : null}
              {item.center === 3 ?
                <img src="/top/graph_none.svg" alt="" />
              : null}
              {item.text1 !== "" ?
                <span className={styles.txt}>{item.text1}</span>
              : null}
            </dd>
            <dd className={styles.right}>
              {item.right === 1 ?
                <img src="/top/graph_check.svg" alt="" />
              : null}
              {item.right === 2 ?
                <img src="/top/graph_limit.svg" alt="" />
              : null}
              {item.right === 3 ?
                <img src="/top/graph_none.svg" alt="" />
              : null}
              {item.text2 !== "" ?
                <span className={styles.txt}>{item.text2}</span>
              : null}
            </dd>
          </dl>
        ))}
        {plan.color === "marche" ?
          <p className={styles.note}>※の項目は別途マルシェドールでの会員登録が必要です</p>
        : null}
      </div>
    </div>
  );
}

export default Plan;