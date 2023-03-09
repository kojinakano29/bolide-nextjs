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
  faHashtag,
  faBagShopping,
  faRulerVertical,
  faSignal,
} from '@fortawesome/free-solid-svg-icons'

const Conditions = ({data}) => {
  return (
    <article className={styles.conditionsBox}>
      {data.date ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faCalendarCheck} />
            掲載日
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
          <p className={styles.txt}>{data.created_at.substring(0, 10).replace(/-/g, '.')}~<br className="tab" />{data.limite_date}</p>
        </div>
      : null}
      {data.reward && data.c_cat.id !== 18 ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faMoneyCheckDollar} />
            謝礼
          </div>
          <p className={styles.txt}>{data.reward === 0 ? "詳細を確認ください" : data.reward}</p>
        </div>
      : null}
      {data.reward === 0 && data.c_cat.id !== 18 ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faMoneyCheckDollar} />
            謝礼
          </div>
          <p className={styles.txt}>詳細を確認ください</p>
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
            希望金額
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
            目標支援者数
          </div>
          <p className={styles.txt}>{data.suporter}</p>
        </div>
      : null}
      {data.amount_of_suport ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faCoins} />
            目標支援総額
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
      {data.reward && data.c_cat.id === 18 ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faMoneyCheckDollar} />
            参加費
          </div>
          <p className={styles.txt}>{data.reward === 0 ? "詳細を確認ください" : data.reward}</p>
        </div>
      : null}
      {data.reward === 0 && data.c_cat.id === 18 ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faMoneyCheckDollar} />
            参加費
          </div>
          <p className={styles.txt}>詳細を確認ください</p>
        </div>
      : null}
      {data.brand ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faBagShopping} />
            ブランド/メーカー
          </div>
          <p className={styles.txt}>{data.brand}</p>
        </div>
      : null}
      {data.size ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faRulerVertical} />
            大きさ/サイズ
          </div>
          <p className={styles.txt}>{data.size}</p>
        </div>
      : null}
      {data.item_state ?
        <div className={styles.cont}>
          <div className={styles.cat}>
            <FontAwesomeIcon icon={faSignal} />
            使用状況/状態
          </div>
          <p className={styles.txt}>{data.item_state}</p>
        </div>
      : null}
    </article>
  );
}

export default Conditions;