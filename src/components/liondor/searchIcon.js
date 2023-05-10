import styles from '@/styles/liondor/components/searchIcon.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

const SearchIcon = ({ humOpen }) => {
    const router = useRouter()

    const { register, handleSubmit } = useForm()

    const onSubmit = useCallback(data => {
        // console.log(data)

        router.push(`/liondor/search/?s=${data.search}`)
    }, [])

    return (
        <div className={`${styles.iconBox} ${humOpen ? null : styles.hidden}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.searchBtn}>
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={humOpen ? { color: '#fff' } : { color: '#000' }}
                    />
                    <input
                        type="text"
                        {...register('search')}
                        placeholder="SEARCH FOR INSPIRATION"
                        className={humOpen ? styles.open : ''}
                    />
                </label>
            </form>
        </div>
    )
}

export default SearchIcon
