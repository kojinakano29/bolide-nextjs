import styles from '@/styles/dellamall/components/shopSort.module.scss'
import sortIcon from '@/images/dellamall/shopSearch/sort.svg'
import accountIcon from '@/images/dellamall/shopSearch/account.svg'
import Image from 'next/image';
import { useCallback, useContext, useState } from 'react';
import { SortContextSearch } from '@/pages/dellamall/search';

const ShopSortSearch = () => {
  const { sort, setSort, account, setAccount } = useContext(SortContextSearch)
  const [openSort, setOpenSort] = useState(false)
  const [openAccount, setOpenAccount] = useState(false)

  const sorts = [
    {name: "新着順", value: "new"},
    {name: "いいね数", value: "good"},
    {name: "保存数", value: "mall"},
    {name: "コメント数", value: "comment"},
  ]

  const accounts = [
    {name: "すべて", value: "all"},
    {name: "公式のみ", value: "official"},
    {name: "非公式のみ", value: "notofficial"},
  ]

  const handleClickOpenSort = useCallback(async () => {
    setOpenSort(prevState => !prevState)
  }, [])

  const handleClickOpenAccount = useCallback(async () => {
    setOpenAccount(prevState => !prevState)
  }, [])

  const handleClickSort = useCallback(async (e) => {
    await setSort({
      name: e.target.textContent,
      value: e.target.value,
    })
    await setOpenSort(false)
  }, [])

  const handleClickAccount = useCallback(async (e) => {
    await setAccount({
      name: e.target.textContent,
      value: e.target.value,
    })
    await setOpenAccount(false)
  }, [])

  return (
    <div className={styles.sortBox}>
      <div className={styles.sort}>
        <button type="button" className={styles.btn} onClick={handleClickOpenSort}>
          <div className={styles.icon}>
            <Image
              src={sortIcon}
              alt="ソートアイコン"
              layout="responsive"
              sizes="20px"
              priority
            />
          </div>
          <p className={styles.state}>並べ替え{sort ? `：${sort.name}` : null}</p>
        </button>
        {openSort ?
          <div className={styles.box}>
            {sorts.map((item, index) => (
              <button
                key={index}
                type="button"
                className={sort.value === item.value ? styles.current : ""}
                value={item.value}
                onClick={handleClickSort}
              >{item.name}</button>
            ))}
          </div>
        : null}
      </div>
      <div className={styles.sort}>
        <button type="button" className={styles.btn} onClick={handleClickOpenAccount}>
          <div className={styles.icon}>
            <Image
              src={accountIcon}
              alt="アカウントアイコン"
              layout="responsive"
              sizes="20px"
              priority
            />
          </div>
          <p className={styles.state}>アカウント{account ? `：${account.name}` : null}</p>
        </button>
        {openAccount ?
          <div className={styles.box}>
            {accounts.map((item, index) => (
              <button
                key={index}
                type="button"
                className={account.value === item.value ? styles.current : ""}
                value={item.value}
                onClick={handleClickAccount}
              >{item.name}</button>
            ))}
          </div>
        : null}
      </div>
    </div>
  );
}

export default ShopSortSearch;