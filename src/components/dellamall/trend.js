import axios from '@/lib/axios'
import styles from '@/styles/dellamall/components/trend.module.scss'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Loader } from '@/components/dellamall'

const Trend = ({mb40 = false}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const [trends, setTrends] = useState([])

  const onMount = useCallback( async () => {
    await csrf()

    await axios.post(`/api/dellamall/tag/list`)
    .then((res) => {
      // console.log(res)
      setTrends(res.data.filter((_, index) => {
        return index < 10
      }))
    }).catch((e) => {
      console.error(e)
    })
  }, [setTrends])

  useEffect(() => {
    onMount()
  }, [])

  const handleClickTrend = async (id) => {
    let path = {
      tag_id: id,
    }
    router.push({
      pathname: `/dellamall/shop`,
      query: path,
    })
  }

  return (
    <>
      <p className={`${styles.title} ${mb40 ? styles.mb40 : ""}`}>TREND</p>
      {trends.length === 0 ? <Loader /> :
        <ul className={styles.trend__list}>
          {trends?.map((trend, index) => (
            <li className={`${styles.keyWord__item} ${trend.id === parseInt(router.query.tag_id) ? styles.current : null}`} key={index}>
              <button
                type="button"
                className="hoverEffect"
                onClick={() => handleClickTrend(trend.id)}
              >{trend.name}</button>
            </li>
          ))}
        </ul>
      }
    </>
  );
}

export default Trend;