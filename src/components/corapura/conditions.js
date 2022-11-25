import styles from '@/styles/corapura/components/conditions.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faClock,
  faMoneyCheckDollar,
  faUserGroup,
  faSackDollar,
  faPeopleGroup,
  faGlobe,
  faPeopleRobbery,
  faCoins,
  faHashtag
} from '@fortawesome/free-solid-svg-icons'

const Conditions = ({data}) => {
  return (
    <article className={styles.conditionsBox}>
      {data.date ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faCalendarCheck} />
            実施日
          </div>
          <p className={styles.txt}>{data.date}</p>
        </div>
      : null}
      {data.limite_date ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faClock} />
            募集期間
          </div>
          <p className={styles.txt}>{data.limite_date}</p>
        </div>
      : null}
      {data.reward ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faMoneyCheckDollar} />
            謝礼
          </div>
          <p className={styles.txt}>{data.reward}</p>
        </div>
      : null}
      {data.number_of_people ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faUserGroup} />
            募集人数
          </div>
          <p className={styles.txt}>{data.number_of_people}</p>
        </div>
      : null}
      {data.hope_reward ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faSackDollar} />
            希望謝礼
          </div>
          <p className={styles.txt}>{data.hope_reward}</p>
        </div>
      : null}
      {data.recruitment_quota ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faPeopleGroup} />
            募集可能枠
          </div>
          <p className={styles.txt}>{data.recruitment_quota}</p>
        </div>
      : null}
      {data.speciality ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faGlobe} />
            専門分野
          </div>
          <p className={styles.txt}>{data.speciality}</p>
        </div>
      : null}
      {data.suporter ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faPeopleRobbery} />
            支援者数
          </div>
          <p className={styles.txt}>{data.suporter}</p>
        </div>
      : null}
      {data.amount_of_suport ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faCoins} />
            支援総額
          </div>
          <p className={styles.txt}>{data.amount_of_suport}</p>
        </div>
      : null}
      {data.medium ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faHashtag} />
            媒体
          </div>
          <p className={styles.txt}>{data.medium}</p>
        </div>
      : null}
    </article>
  );
}

export default Conditions;