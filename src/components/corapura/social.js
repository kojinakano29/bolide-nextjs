import { socialNetworkingServiceIcons } from '@/lib/corapura/constants'
import styles from '@/styles/corapura/components/detailArea.module.scss'

const Social = ({ socials, user = false }) => {
    // console.log(socials)

    const allFollower = socials?.reduce((sum, i) => sum + i?.follower, 0)

    return (
        <>
            {user ? (
                <div className={styles.snsLink}>
                    <p className={styles.snsTxt}>SNS FOLLOWERS</p>
                    <p className={styles.followerAll}>
                        All <span>{allFollower.toLocaleString()}</span>
                    </p>
                    <div className={styles.followerBox}>
                        {socials.length !== 0
                            ? socials.map((social, index) => (
                                  <a
                                      className="hoverEffect"
                                      href={social.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      key={index}>
                                      <img
                                          src={
                                              socialNetworkingServiceIcons[
                                                  social.name
                                              ]
                                          }
                                          alt={social.name}
                                      />
                                      {social.follower.toLocaleString()}
                                  </a>
                              ))
                            : null}
                    </div>
                </div>
            ) : (
                <div className={styles.snsLink}>
                    <p className={styles.snsTxt}>SNS LINK</p>
                    <div className={styles.iconList}>
                        {socials.length !== 0
                            ? socials.map((social, index) => (
                                  <a
                                      className="hoverEffect"
                                      href={social.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      key={index}>
                                      <img
                                          src={
                                              socialNetworkingServiceIcons[
                                                  social.name
                                              ]
                                          }
                                          alt={social.name}
                                      />
                                  </a>
                              ))
                            : null}
                    </div>
                </div>
            )}
        </>
    )
}

export default Social
