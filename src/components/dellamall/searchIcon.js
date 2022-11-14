import styles from '@/styles/dellamall/components/searchIcon.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

const SearchIcon = () => {
  const router = useRouter()

  const { register, handleSubmit } = useForm()

  const onSubmit = useCallback((data) => {
    // console.log(data)

    router.push(`/dellamall/search/?s=${data.search}`)
  }, [])

  return (
    <div className={styles.iconBox}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.searchBtn}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input
            type="text"
            {...register("search")}
            placeholder="SEARCH FOR INSPIRATION"
          />
        </label>
      </form>
    </div>
  );
}

export default SearchIcon;