import styles from '@/styles/corapura/components/detailTab.module.scss'
import { useCallback, useEffect, useState } from 'react'
import Container from './Layout/container'
import {
    User,
    Loader,
    MatterCard,
    Btn,
    Info,
    CardType1,
    CardType2,
    Release,
    NameCard,
    Coupon,
    Office,
} from '@/components/corapura'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'

const DetailTabCompany = ({ businesses, releases, matters, userInfo }) => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { user } = useAuth()
    const [disabled, setDisabled] = useState(false)
    const [disabled2, setDisabled2] = useState(false)
    const [disabled3, setDisabled3] = useState(false)
    const [tab1, setTab1] = useState(0)
    const [tab2, setTab2] = useState(0)
    const [tab3, setTab3] = useState(0)
    const [matter, setMatter] = useState([])
    const [matching, setMatching] = useState([])
    const [filterMatching, setFilterMatching] = useState([])
    const [business, setBusiness] = useState(
        businesses?.filter((b, index) => {
            return index < 6
        }),
    )
    const [office, setOffice] = useState([])
    const [filterOffice, setFilterOffice] = useState([])
    const [president, setPresident] = useState()
    const [presidentMore, setPresidentMore] = useState(false)
    const [nft, setNft] = useState([])
    const [filterNft, setFilterNft] = useState([])
    const [sdgs, setSdgs] = useState([])
    const [filterSdgs, setFilterSdgs] = useState([])
    const [release, setRelease] = useState(
        releases?.filter((r, index) => {
            return index < 3
        }),
    )
    const [card, setCard] = useState([])
    const [filterCard, setFilterCard] = useState([])
    const [salon, setSalon] = useState([])
    const [filterSalon, setFilterSalon] = useState([])
    const [coupon, setCoupon] = useState([])
    const [filterCoupon, setFilterCoupon] = useState([])
    const [sponsor, setSponsor] = useState([])
    const [filterSponsor, setFilterSponsor] = useState([])
    const [bookmarkList, setBookmarkList] = useState([])

    const onLoadCheck = async () => {
        await csrf()

        await axios
            .post('/api/corapura/post_bookmark/check', {
                user_id: user?.id,
            })
            .then(res => {
                // console.log(res)
                setBookmarkList(res.data)
            })
            .catch(e => {
                console.error(e)
            })
    }

    useEffect(async () => {
        if (disabled) return
        setDisabled(true)

        if (user) {
            await onLoadCheck()
            await setMatter(
                matters?.filter((m, index) => {
                    return index < 3
                }),
            )
        }

        await setMatter(
            matters?.filter((m, index) => {
                return index < 3
            }),
        )

        await setDisabled(false)
    }, [user])

    const handleClickMoreMatter = useCallback(async () => {
        setMatter(matters)
    }, [setMatter])

    const handleClickMoreMatching = useCallback(async () => {
        setFilterMatching(matching)
    }, [matching, setFilterMatching])

    const handleClickMoreBusiness = useCallback(async () => {
        setBusiness(businesses)
    }, [setBusiness])

    const handleClickMoreOffice = useCallback(async () => {
        setFilterOffice(office)
    }, [office, setFilterOffice])

    const handleClickMorePresident = useCallback(async () => {
        setPresidentMore(true)
    }, [setPresidentMore])

    const handleClickMoreNft = useCallback(async () => {
        setFilterNft(nft)
    }, [nft, setFilterNft])

    const handleClickMoreSdgs = useCallback(async () => {
        setFilterSdgs(sdgs)
    }, [sdgs, setFilterSdgs])

    const handleClickMoreRelease = useCallback(async () => {
        setRelease(releases)
    }, [releases, setRelease])

    const handleClickMoreCard = useCallback(async () => {
        setFilterCard(card)
    }, [card, setFilterCard])

    const handleClickMoreSalon = useCallback(async () => {
        setFilterSalon(salon)
    }, [salon, setFilterSalon])

    const handleClickMoreCoupon = useCallback(async () => {
        setFilterCoupon(coupon)
    }, [coupon, setFilterCoupon])

    const handleClickMoreSponsor = useCallback(async () => {
        setFilterSponsor(sponsor)
    }, [sponsor, setFilterSponsor])

    const handleClickTabBox1 = useCallback(async () => {
        setDisabled(true)
        await csrf()

        await axios
            .post(`/api/corapura/matching/tab_return`, {
                user_id: userInfo.id,
            })
            .then(res => {
                // console.log(res)
                setMatching(res.data)
                setFilterMatching(
                    res.data.filter((d, index) => {
                        return index < 5
                    }),
                )
            })
            .catch(e => {
                console.error(e)
            })

        await setDisabled(false)
    }, [setMatching, setFilterMatching, setDisabled])

    const handleClickTabBox2 = useCallback(
        async num => {
            setDisabled2(true)
            await csrf()

            if (num === 1) {
                await axios
                    .post(`/api/corapura/office/tab_return`, {
                        c_profile_id: userInfo.c_profile_id,
                    })
                    .then(res => {
                        // console.log(res)
                        setOffice(res.data)
                        setFilterOffice(
                            res.data.filter((o, index) => {
                                return index < 4
                            }),
                        )
                    })
                    .catch(e => {
                        console.error(e)
                    })
            } else if (num === 2) {
                await axios
                    .post(`/api/corapura/president/tab_return`, {
                        c_profile_id: userInfo.c_profile_id,
                    })
                    .then(res => {
                        // console.log(res)
                        setPresident(res.data[0])
                    })
                    .catch(e => {
                        console.error(e)
                    })
            } else if (num === 3) {
                await axios
                    .post(`/api/corapura/item/tab_return`, {
                        c_profile_id: userInfo.c_profile_id,
                    })
                    .then(res => {
                        // console.log(res)
                        setNft(res.data)
                        setFilterNft(
                            res.data.filter((o, index) => {
                                return index < 3
                            }),
                        )
                    })
                    .catch(e => {
                        console.error(e)
                    })
            } else if (num === 4) {
                await axios
                    .post(`/api/corapura/sust/tab_return`, {
                        c_profile_id: userInfo.c_profile_id,
                    })
                    .then(res => {
                        // console.log(res)
                        setSdgs(res.data)
                        setFilterSdgs(
                            res.data.filter((o, index) => {
                                return index < 3
                            }),
                        )
                    })
                    .catch(e => {
                        console.error(e)
                    })
            }

            await setDisabled2(false)
        },
        [
            setDisabled2,
            setOffice,
            setFilterOffice,
            setPresident,
            setNft,
            setFilterNft,
            setSdgs,
            setFilterSdgs,
        ],
    )

    const handleClickTabBox3 = useCallback(
        async num => {
            setDisabled3(true)
            await csrf()

            if (num === 1) {
                await axios
                    .post(`/api/corapura/card/tab_return`, {
                        c_profile_id: userInfo.c_profile_id,
                    })
                    .then(res => {
                        // console.log(res)
                        setCard(res.data)
                        setFilterCard(
                            res.data.filter((o, index) => {
                                return index < 3
                            }),
                        )
                    })
                    .catch(e => {
                        console.error(e)
                    })
            } else if (num === 2) {
                await axios
                    .post(`/api/corapura/salon/tab_return`, {
                        user_id: userInfo.id,
                    })
                    .then(res => {
                        // console.log(res)
                        setSalon(res.data)
                        setFilterSalon(
                            res.data.filter((o, index) => {
                                return index < 3
                            }),
                        )
                    })
                    .catch(e => {
                        console.error(e)
                    })
            } else if (num === 3) {
                await axios
                    .post(`/api/corapura/coupon/tab_return`, {
                        c_profile_id: userInfo.c_profile_id,
                    })
                    .then(res => {
                        // console.log(res)
                        setCoupon(res.data)
                        setFilterCoupon(
                            res.data.filter((o, index) => {
                                return index < 3
                            }),
                        )
                    })
                    .catch(e => {
                        console.error(e)
                    })
            } else if (num === 4) {
                await axios
                    .post(`/api/corapura/like/tab_return`, {
                        c_profile_id: userInfo.c_profile_id,
                    })
                    .then(res => {
                        // console.log(res)
                        setSponsor(res.data)
                        setFilterSponsor(
                            res.data.filter((o, index) => {
                                return index < 5
                            }),
                        )
                    })
                    .catch(e => {
                        console.error(e)
                    })
            }

            await setDisabled3(false)
        },
        [
            setDisabled3,
            setCard,
            setFilterCard,
            setSalon,
            setFilterSalon,
            setCoupon,
            setFilterCoupon,
            setSponsor,
            setFilterSponsor,
        ],
    )

    const handleClickTab1 = useCallback(
        async num => {
            setTab1(num)

            if (num === 0) {
                setMatter(
                    matters?.filter((m, index) => {
                        return index < 3
                    }),
                )
            }

            if (num === 1) {
                handleClickTabBox1()
            }
        },
        [setMatter, setTab1, handleClickTabBox1],
    )

    const handleClickTab2 = useCallback(
        async num => {
            setTab2(num)

            if (num === 0) {
                setBusiness(
                    businesses?.filter((b, index) => {
                        return index < 6
                    }),
                )
            } else {
                handleClickTabBox2(num)
            }
        },
        [setTab2, setBusiness, handleClickTabBox2],
    )

    const handleClickTab3 = useCallback(
        async num => {
            setTab3(num)

            if (num === 0) {
                setRelease(
                    releases?.filter((r, index) => {
                        return index < 3
                    }),
                )
            } else {
                handleClickTabBox3(num)
            }
        },
        [setTab3, setRelease, handleClickTabBox3],
    )

    return (
        <>
            <section className={styles.tabArea}>
                <Container small>
                    <div className={styles.tabBtnBox}>
                        <button
                            type="button"
                            className={`${tab1 === 0 ? styles.tabOn : null}`}
                            onClick={() => handleClickTab1(0)}>
                            この企業/ビジネスユーザー/自治体の案件一覧
                        </button>
                        <button
                            type="button"
                            className={`${tab1 === 1 ? styles.tabOn : null}`}
                            onClick={() => handleClickTab1(1)}>
                            コラプラした企業・ユーザー一覧
                        </button>
                    </div>
                </Container>
                <div className={styles.tabBox}>
                    <Container small>
                        {!disabled ? (
                            <>
                                {tab1 === 0 ? (
                                    <>
                                        <div className={styles.column3}>
                                            {matter.length !== 0 ? (
                                                matter.map((matter, index) => (
                                                    <MatterCard
                                                        matter={matter}
                                                        user={user}
                                                        bookmarkList={
                                                            bookmarkList
                                                        }
                                                        key={index}
                                                        detail
                                                    />
                                                ))
                                            ) : (
                                                <p className={styles.noneText}>
                                                    この企業の案件がありません
                                                </p>
                                            )}
                                        </div>
                                        {matter.length === 3 &&
                                        matters.length > 3 ? (
                                            <div
                                                className="btnCover"
                                                onClick={handleClickMoreMatter}>
                                                <Btn txt="さらに見る" />
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                                {tab1 === 1 ? (
                                    <>
                                        {filterMatching.length !== 0 ? (
                                            <User
                                                data={filterMatching}
                                                detail
                                            />
                                        ) : (
                                            <p className={styles.noneText}>
                                                まだコラプラした企業・ユーザーがいません
                                            </p>
                                        )}
                                        {filterMatching.length === 5 &&
                                        matching.length > 5 ? (
                                            <div
                                                className="btnCover"
                                                onClick={
                                                    handleClickMoreMatching
                                                }>
                                                <Btn txt="さらに見る" />
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                            </>
                        ) : (
                            <Loader />
                        )}
                    </Container>
                </div>
            </section>

            <section className={styles.tabArea}>
                <Container small>
                    <div className={`${styles.tabBtnBox} ${styles.five}`}>
                        <button
                            type="button"
                            className={`${tab2 === 0 ? styles.tabOn : null}`}
                            onClick={() => handleClickTab2(0)}>
                            ビジネス
                            <br />
                            インフォメーション
                        </button>
                        <button
                            type="button"
                            className={`${tab2 === 1 ? styles.tabOn : null}`}
                            onClick={() => handleClickTab2(1)}>
                            事業所/店舗/庁舎/支所
                        </button>
                        <button
                            type="button"
                            className={`${tab2 === 2 ? styles.tabOn : null}`}
                            onClick={() => handleClickTab2(2)}>
                            プレジデント/リーダー
                        </button>
                        <button
                            type="button"
                            className={`${tab2 === 3 ? styles.tabOn : null}`}
                            onClick={() => handleClickTab2(3)}>
                            NFT/製品・商品
                            <br />
                            特許・技術
                        </button>
                        <button
                            type="button"
                            className={`${tab2 === 4 ? styles.tabOn : null}`}
                            onClick={() => handleClickTab2(4)}>
                            SDGs/社会貢献
                        </button>
                    </div>
                </Container>
                <div className={styles.tabBox}>
                    <Container small>
                        {!disabled2 ? (
                            <>
                                {tab2 === 0 ? (
                                    <>
                                        {business.length !== 0 ? (
                                            <Info data={business} detail />
                                        ) : (
                                            <p className={styles.noneText}>
                                                ニュース/イベントがありません
                                            </p>
                                        )}
                                        {business.length === 6 &&
                                        businesses.length > 6 ? (
                                            <div
                                                className="btnCover"
                                                onClick={
                                                    handleClickMoreBusiness
                                                }>
                                                <Btn txt="さらに見る" />
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                                {tab2 === 1 ? (
                                    <>
                                        {filterOffice.length !== 0 ? (
                                            <Office data={filterOffice} />
                                        ) : (
                                            <p className={styles.noneText}>
                                                事務所・店舗がありません
                                            </p>
                                        )}
                                        {filterOffice.length === 4 &&
                                        office.length > 4 ? (
                                            <div
                                                className="btnCover"
                                                onClick={handleClickMoreOffice}>
                                                <Btn txt="さらに見る" />
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                                {tab2 === 2 ? (
                                    <>
                                        {president ? (
                                            <>
                                                <div
                                                    className={
                                                        styles.presidentBox
                                                    }>
                                                    {president?.thumbs ? (
                                                        <div
                                                            className={
                                                                styles.imgBox
                                                            }>
                                                            <img
                                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${president?.thumbs}`}
                                                                alt="プレジデント/リーダーの画像"
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div
                                                        className={
                                                            styles.right
                                                        }>
                                                        <p
                                                            className={
                                                                styles.ttl
                                                            }>
                                                            {president?.title}
                                                        </p>
                                                        <p
                                                            className={
                                                                styles.presidentDesc
                                                            }>
                                                            {
                                                                president?.top_text
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                {president && !presidentMore ? (
                                                    <div
                                                        className="btnCover"
                                                        onClick={
                                                            handleClickMorePresident
                                                        }>
                                                        <Btn txt="さらに見る" />
                                                    </div>
                                                ) : (
                                                    <p
                                                        className={
                                                            styles.presidentDesc
                                                        }>
                                                        {president?.content}
                                                    </p>
                                                )}
                                            </>
                                        ) : (
                                            <p className={styles.noneText}>
                                                プレジデント/リーダーがありません
                                            </p>
                                        )}
                                    </>
                                ) : null}
                                {tab2 === 3 ? (
                                    <>
                                        {filterNft.length !== 0 ? (
                                            <div className={styles.column3}>
                                                {filterNft.map((nft, index) => (
                                                    <CardType1
                                                        data={nft}
                                                        key={index}
                                                        cat
                                                        detail
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <p className={styles.noneText}>
                                                NFT/製品・商品特許・技術がありません
                                            </p>
                                        )}
                                        {filterNft.length === 3 &&
                                        nft.length > 3 ? (
                                            <div
                                                className="btnCover"
                                                onClick={handleClickMoreNft}>
                                                <Btn txt="さらに見る" />
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                                {tab2 === 4 ? (
                                    <>
                                        {filterSdgs.length !== 0 ? (
                                            <div className={styles.column3}>
                                                {filterSdgs.map(
                                                    (sdgs, index) => (
                                                        <CardType1
                                                            data={sdgs}
                                                            key={index}
                                                            detail
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <p className={styles.noneText}>
                                                SDGs/社会貢献がありません
                                            </p>
                                        )}
                                        {filterSdgs.length === 3 &&
                                        sdgs.length > 3 ? (
                                            <div
                                                className="btnCover"
                                                onClick={handleClickMoreSdgs}>
                                                <Btn txt="さらに見る" />
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                            </>
                        ) : (
                            <Loader />
                        )}
                    </Container>
                </div>
            </section>

            <section className={styles.tabArea}>
                <Container small>
                    <div className={`${styles.tabBtnBox} ${styles.five}`}>
                        <button
                            type="button"
                            className={`${tab3 === 0 ? styles.tabOn : null}`}
                            onClick={() => handleClickTab3(0)}>
                            プレスリリース
                        </button>
                        <button
                            type="button"
                            className={`${tab3 === 1 ? styles.tabOn : null}`}
                            onClick={() => handleClickTab3(1)}>
                            名刺
                        </button>
                        <button
                            type="button"
                            className={`${tab3 === 2 ? styles.tabOn : null}`}
                            onClick={() => handleClickTab3(2)}>
                            オンラインサロン
                        </button>
                        <button
                            type="button"
                            className={`${tab3 === 3 ? styles.tabOn : null}`}
                            onClick={() => handleClickTab3(3)}>
                            クーポン
                        </button>
                        <button
                            type="button"
                            className={`${tab3 === 4 ? styles.tabOn : null}`}
                            onClick={() => handleClickTab3(4)}>
                            スポンサー
                            <br />
                            マスコット
                        </button>
                    </div>
                </Container>
                <div className={styles.tabBox}>
                    <Container small>
                        {!disabled3 ? (
                            <>
                                {tab3 === 0 ? (
                                    <>
                                        {release.length !== 0 ? (
                                            <div className={styles.column3}>
                                                {release.map(
                                                    (release, index) => (
                                                        <Release
                                                            data={release}
                                                            key={index}
                                                            detail
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <p className={styles.noneText}>
                                                プレスリリースがありません
                                            </p>
                                        )}
                                        {release.length === 3 &&
                                        releases.length > 3 ? (
                                            <div
                                                className="btnCover"
                                                onClick={
                                                    handleClickMoreRelease
                                                }>
                                                <Btn txt="さらに見る" />
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                                {tab3 === 1 ? (
                                    <>
                                        {filterCard.length !== 0 ? (
                                            <div className={styles.column3}>
                                                {filterCard.map(
                                                    (card, index) => (
                                                        <NameCard
                                                            data={card}
                                                            key={index}
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <p className={styles.noneText}>
                                                名刺がありません
                                            </p>
                                        )}
                                        {filterCard.length === 3 &&
                                        card.length > 3 ? (
                                            <div
                                                className="btnCover"
                                                onClick={handleClickMoreCard}>
                                                <Btn txt="さらに見る" />
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                                {tab3 === 2 ? (
                                    <>
                                        {filterSalon.length !== 0 ? (
                                            <div className={styles.column3}>
                                                {filterSalon.map(
                                                    (salon, index) => (
                                                        <a
                                                            href={`/corapura/salon/${salon.id}`}
                                                            className={
                                                                styles.salonBox
                                                            }
                                                            key={index}>
                                                            <div
                                                                className={
                                                                    styles.imgBox
                                                                }>
                                                                {salon.thumbs ? (
                                                                    <img
                                                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${salon.thumbs}`}
                                                                        alt="オンラインサロンの画像"
                                                                    />
                                                                ) : null}
                                                            </div>
                                                            <p
                                                                className={
                                                                    styles.ttl
                                                                }>
                                                                {salon.title}
                                                            </p>
                                                            <p
                                                                className={
                                                                    styles.desc
                                                                }>
                                                                {salon.content
                                                                    ?.replace(
                                                                        /<[^>]+>/g,
                                                                        '',
                                                                    )
                                                                    ?.replace(
                                                                        /&nbsp;/g,
                                                                        '',
                                                                    )
                                                                    ?.substring(
                                                                        0,
                                                                        45,
                                                                    )}
                                                            </p>
                                                            <div
                                                                className={
                                                                    styles.tags
                                                                }>
                                                                {salon?.c_tags?.map(
                                                                    (
                                                                        tag,
                                                                        index,
                                                                    ) => (
                                                                        <p
                                                                            className={
                                                                                styles.tag
                                                                            }
                                                                            key={
                                                                                index
                                                                            }>
                                                                            {
                                                                                tag.name
                                                                            }
                                                                        </p>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </a>
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <p className={styles.noneText}>
                                                オンラインサロンがありません
                                            </p>
                                        )}
                                        {filterSalon.length === 3 &&
                                        salon.length > 3 ? (
                                            <div
                                                className="btnCover"
                                                onClick={handleClickMoreSalon}>
                                                <Btn txt="さらに見る" />
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                                {tab3 === 3 ? (
                                    <>
                                        {filterCoupon.length !== 0 ? (
                                            <div className={styles.column3}>
                                                {filterCoupon.map(
                                                    (coupon, index) => (
                                                        <Coupon
                                                            data={coupon}
                                                            key={index}
                                                            detail
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <p className={styles.noneText}>
                                                クーポンがありません
                                            </p>
                                        )}
                                        {filterCoupon.length === 3 &&
                                        coupon.length > 3 ? (
                                            <div
                                                className="btnCover"
                                                onClick={handleClickMoreCoupon}>
                                                <Btn txt="さらに見る" />
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                                {tab3 === 4 ? (
                                    <>
                                        {filterSponsor.length !== 0 ? (
                                            <CardType2
                                                data={filterSponsor}
                                                detail
                                            />
                                        ) : (
                                            <p className={styles.noneText}>
                                                スポンサー・マスコットがありません
                                            </p>
                                        )}
                                        {filterSponsor.length === 5 &&
                                        sponsor.length > 5 ? (
                                            <div
                                                className="btnCover"
                                                onClick={
                                                    handleClickMoreSponsor
                                                }>
                                                <Btn txt="さらに見る" />
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                            </>
                        ) : (
                            <Loader />
                        )}
                    </Container>
                </div>
            </section>
        </>
    )
}

export default DetailTabCompany
