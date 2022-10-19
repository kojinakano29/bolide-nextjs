import styles from '@/styles/components/blogTxt.module.scss'
import { Date } from '@/components'

const BlogTxt = (
  {
    cat,
    cat2,
    ttl,
    name,
    time,
    white = false,
    fs24 = false,
    fs22 = false,
    fs14 = false,
    tac = false,
    smallMb = false,
    mb0 = false,
  }
) => {
  const upperCat2 = cat2?.toUpperCase()

  return (
    <div className={
      `
        ${styles.blogTxt}
        ${white ? styles.white : ''}
        ${tac ? styles.tac : ''}
        ${smallMb ? styles.smallMb : ''}
        ${mb0 ? styles.mb0 : ''}
        ${fs24 ? styles.fs24 : ''}
        ${fs22 ? styles.fs22 : ''}
        ${fs14 ? styles.fs14 : ''}
      `
    }>
      {
        cat2 === undefined
        ?
        ''
        :
        <p className={styles.cat}>
          <span className={`en ${cat === undefined ? 'none' : ''}`}>{cat}</span>
          <span className={cat === undefined ? 'none' : styles.hr}></span>
          <span className="en">{cat === undefined ? upperCat2 : cat2}</span>
        </p>
      }
      <h3 className={
        `
          ${styles.singleTtl}
        `
      }>
        {ttl}
      </h3>
      <p className={styles.name}>
        <span className="en">BY</span>
        <span className="space"></span>
        <span className="en">{name}</span>
      </p>
      <p className={`en ${styles.time}`}><Date dateString={time} /></p>
    </div>
  );
}

export default BlogTxt;