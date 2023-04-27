import styles from '@/styles/corapura/components/info.module.scss'
import { DateFormat } from '@/components/corapura'

const Info = ({data, detail = false}) => {
  // console.log(data)

  return (
    <div className={styles.infoBox}>
      {data.map((info, index) => (
        <div className={styles.infoItem} key={index}>
          <p className={styles.date}><DateFormat dateString={info.created_at} /></p>
          <a className={styles.ttl} href={info.link} target="_blank">{info.title}</a>
          {detail ? null :
            <a href={`/corapura/${info?.c_profile?.user?.account_type === 0 ? 'influencer' : 'company'}/${info?.c_profile?.user?.id}`} className={`${styles.company} hoverEffect`}>
              <div className={styles.logoBox}>
                {info.c_profile.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${info.c_profile.thumbs}`} alt="プロフィール画像" /> : null}
              </div>
              {info.c_profile.nicename}
            </a>
          }
        </div>
      ))}
    </div>
  );
}

export default Info;