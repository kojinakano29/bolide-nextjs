import styles from '@/styles/corapura/components/release.module.scss'
import dummy from '@/images/corapura/common/dummyRelease.svg'
import view from '@/images/corapura/parts/material_view.svg'

const Release = ({ data, detail = false, swiper = false }) => {
    // console.log(data)

    return (
        <>
            <a
                href={`/corapura/press_release/${data.id}`}
                className={`${styles.releaseLink} ${
                    swiper ? styles.swiper : null
                }`}>
                <div className={styles.imgBox}>
                    <img
                        src={
                            data.thumbs
                                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.thumbs}`
                                : dummy.src
                        }
                        alt="プレスリリースのサムネイル画像"
                    />
                </div>
                <p className={styles.ttl}>{data.title}</p>
                <div className={`${styles.view} en`}>
                    <img src={view.src} alt="viewのアイコン" />
                    {data.c_pr_counts_count}view
                </div>
                {!detail ? (
                    <>
                        {/* {data.c_tags.map((tag, index) => (
						<p className={styles.tag} key={index}>{tag.name}</p>
						))} */}
                        {data.c_tags.length !== 0 ? (
                            <p className={styles.tag}>{data.c_tags[0].name}</p>
                        ) : null}
                    </>
                ) : null}
            </a>
            {!detail ? (
                <a
                    href={`/corapura/${
                        data?.user?.account_type === 0
                            ? 'influencer'
                            : 'company'
                    }/${data?.user?.id}`}
                    className={`${styles.company} hoverEffect`}>
                    <div className={styles.logoBox}>
                        {data.user.c_profile.thumbs ? (
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.user.c_profile.thumbs}`}
                                alt="プロフィール画像"
                            />
                        ) : null}
                    </div>
                    {data.user.c_profile.nicename}
                </a>
            ) : null}
        </>
    )
}

export default Release
