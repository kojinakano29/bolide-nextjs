import styles from '@/styles/corapura/components/detailArea.module.scss'
import { useCallback, useContext, useState } from 'react';
import { CompanyContext } from './detailArea';
import dummy1 from '@/images/corapura/common/userDummy.svg'
import mail from '@/images/corapura/common/mail_icon.svg'
import facebook from '@/images/corapura/common/facebook_icon.svg'
import instagram from '@/images/corapura/common/instagram_icon.svg'
import axios from '@/lib/axios';
import { useAuth } from '@/hooks/auth';

const DetailAreaRight = ({influencer = false}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { profile, userInfo } = useContext(CompanyContext)
  const { user } = useAuth()

  const allFollower = profile.c_user_profile?.c_user_socials?.reduce((sum, i) => sum + i.follower, 0)

  const [disabled, setDisabled] = useState(false)
  const [followCheck, setFollowCheck] = useState(false)

  const handleClickFollow = useCallback(async () => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    if (followCheck) {
      await axios.delete('/api/corapura/follow/delete', {
        data: {
          following_user_id: user?.id,
          followed_user_id: userInfo.id,
        }
      }).then((res) => {
        console.log(res)
        setFollowCheck(false)
      }).catch((e) => {
        console.error(e)
      })
    } else {
      await axios.post('/api/corapura/follow/store', {
        following_user_id: user?.id,
        followed_user_id: userInfo.id,
      }).then((res) => {
        console.log(res)
        setFollowCheck(true)
      }).catch((e) => {
        console.error(e)
      })
    }

    await setDisabled(false)
  }, [disabled, setDisabled, user, followCheck, setFollowCheck])

  return (
    <>
      {!influencer ?
        <div className={styles.detailRight}>
          <div className={styles.detailHead}>
            <div className={styles.headLeft}>
              <img src={profile.thumbs ? profile.thumbs : dummy1.src} alt="" />
            </div>
            <div className={styles.headRight}>
              <p className={styles.type}>{profile.title}</p>
              <p className={styles.name}>{profile.nicename}</p>
              <div className={styles.tags}>
                <p className={styles.tag}>飲食店</p>
                <p className={styles.tag}>グルメ</p>
                <p className={styles.tag}>料理</p>
              </div>
            </div>
          </div>
          <div className={styles.followBox}>
            <p className={styles.count}>フォロワー{userInfo.c_followeds_count}人</p>
            <button
              type="button"
              className="hoverEffect"
              onClick={handleClickFollow}
            >フォローする</button>
          </div>
          <p className={styles.desc}>{profile.profile}</p>
          <div className={styles.infoGraph}>
            <dl>
              <dt>代表者</dt>
              <dd>{profile.c_company_profile.president}</dd>
            </dl>
            <dl>
              <dt>設立</dt>
              <dd>{profile.c_company_profile.maked}</dd>
            </dl>
            <dl>
              <dt>上場・非上場</dt>
              <dd>{profile.c_company_profile.jojo}</dd>
            </dl>
            <dl>
              <dt>資本金</dt>
              <dd>{profile.c_company_profile.capital}</dd>
            </dl>
            <dl>
              <dt>本社所在地</dt>
              <dd>{profile.c_company_profile.address}</dd>
            </dl>
            <dl>
              <dt>電話番号</dt>
              <dd>{profile.c_company_profile.tel}</dd>
            </dl>
          </div>
          <div className={styles.snsLink}>
            <p className={styles.snsTxt}>SNS LINK</p>
            <div className={styles.iconList}>
              {profile.c_company_profile.c_company_socials.length !== 0 ?
                profile.c_company_profile.c_company_socials.map((social, index) => (
                  <a className="hoverEffect" href="" target="_blank" key={index}>
                    <img src="" alt="" />
                  </a>
                ))
              : null}
              <a className="hoverEffect" href="" target="_blank">
                <img src={facebook.src} alt="" />
              </a>
              <a className="hoverEffect" href="" target="_blank">
                <img src={instagram.src} alt="" />
              </a>
            </div>
          </div>
          <div className={styles.siteUrl}>
            {profile.c_company_profile.site_url ?
              <>
                <p>コーポレートサイト</p>
                <a href={profile.c_company_profile.site_url} target="_balnk">{profile.c_company_profile.site_url}</a>
              </>
            : null}
            {profile.c_company_profile.shop_url ?
              <>
                <p>ECサイト</p>
                <a href={profile.c_company_profile.shop_url} target="_balnk">{profile.c_company_profile.shop_url}</a>
              </>
            : null}
          </div>
          <a href={`mailto:${userInfo.email}`} className={styles.btn}>
            <img src={mail.src} alt="" />
            <span>この企業にメッセージを送る</span>
          </a>
        </div>
      :
        <div className={styles.detailRight}>
          <div className={styles.detailHead}>
            <div className={styles.headLeft}>
              <img src={profile.thumbs ? profile.thumbs : dummy1.src} alt="" />
            </div>
            <div className={styles.headRight}>
              <p className={styles.catch}>{profile.c_user_profile.appeal_text}</p>
              <p className={styles.name}>{profile.nicename}</p>
              <p className={styles.type}>{profile.title}</p>
              <div className={styles.tags}>
                {profile.c_tags.map((tag, index) => (
                  <p className={styles.tag} key={index}>{tag.title}</p>
                ))}
                <p className={styles.tag}>飲食店</p>
                <p className={styles.tag}>グルメ</p>
                <p className={styles.tag}>料理</p>
              </div>
            </div>
          </div>
          <div className={styles.skills}>
            {profile.c_user_profile.c_user_skills.map((skill, index) => (
              <p className={styles.skill} key={index}>{skill.title}</p>
            ))}
            <p className={styles.skill}>相互フォロー</p>
            <p className={styles.skill}>仲間・友達募集</p>
            <p className={styles.skill}>お仕事募集</p>
          </div>
          <div className={styles.followBox}>
            <p className={styles.count}>フォロワー{userInfo.c_followeds_count}人</p>
            <button type="button" className="hoverEffect">フォローする</button>
          </div>
          <p className={styles.desc}>{profile.profile}</p>
          <div className={styles.snsLink}>
            <p className={styles.snsTxt}>SNS LINK</p>
            <p className={styles.followerAll}>All <span>{allFollower}</span></p>
            <div className={styles.followerBox}>
              {profile.c_user_profile.c_user_socials.length !== 0 ?
                profile.c_user_profile.c_user_socials.map((social, index) => (
                  <a className="hoverEffect" href={social.url} target="_blank" key={index}>
                    <img src="" alt="" />
                    {social.follower}
                  </a>
                ))
              : null}
            </div>
          </div>
          <div className={styles.siteUrl}>
            {profile.c_user_profile.brand ?
              <>
                <p>プロデュースブランド</p>
                <a href={profile.c_user_profile.brand} target="_balnk">{profile.c_user_profile.brand}</a>
              </>
            : null}
          </div>
          <a href={`mailto:${userInfo.email}`} className={styles.btn}>
            <img src={mail.src} alt="" />
            <span>このインフルエンサーに<br className="sp" />メッセージを送る</span>
          </a>
        </div>
      }
    </>
  );
}

export default DetailAreaRight;