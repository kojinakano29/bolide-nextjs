import axios from '@/lib/axios'
import styles from '@/styles/dellamall/components/trend.module.scss'
import Link from 'next/link'
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

  const handleClickTrend = async (name) => {
    let path = {
      tag_i: name,
    }
    router.replace({
      pathname: `/dellamall/shop`,
      query: path,
    }).then(() => router.reload())
  }

  return (
    <>
      <p className={`${styles.title} ${mb40 ? styles.mb40 : ""}`}>TREND</p>
      {trends.length === 0 ? <Loader /> :
        <ul className={styles.trend__list}>
          {trends?.map((trend, index) => (
            <li className={styles.keyWord__item} key={index}>
              <button
                type="button"
                className="hoverEffect"
                onClick={() => handleClickTrend(trend.name)}
              >{trend.name}</button>
            </li>
          ))}
        </ul>
      }
    </>
  );
}

export default Trend;