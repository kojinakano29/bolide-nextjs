import styles from '@/styles/liondor/components/modalBrand.module.scss'
import { brand } from '@/lib/liondor/constants'
import { useFormContext } from 'react-hook-form'
import { useCallback } from 'react'

const ModalBrand = ({show, close, brands, setBrands}) => {
  const { register } = useFormContext()

  const handleCheckBrand = useCallback((e) => {
    if(brands.includes(e.target.value)) {
      setBrands(
        brands.filter((item) => (item !== e.target.value))
      )
    } else {
      setBrands([...brands, e.target.value])
    }
  }, [brands, setBrands])

  return (
    <div className={`${styles.modalWrap} ${show ? styles.open : ''}`} onClick={close}>
      <div className={styles.modalBox}>
        <div className={styles.topFlex}>
          <h3 className={styles.name} onClick={(e) => e.stopPropagation()}>好きなブランドを選択</h3>
          <p className={styles.close}>&#10005;</p>
        </div>
        <article className={styles.modalArticle} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalCont}>
            <nav className={styles.modalNav}>
              <ul>
                {brand.map((item, index) => (
                  <li key={index}>
                    <a href={`#brand${item.initial}`}>{item.initial}</a>
                    <div className={styles.hr}></div>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className={styles.brandList}>
              {brand.map((item, index) => (
                <li id={`brand${item.initial}`} key={index}>
                  <h4>{item.initial}</h4>
                  <div className={styles.brandInputBox}>
                    {item.group.map((gr) => (
                      <label key={gr.name}>
                        <input
                          type="checkbox"
                          id={gr.name}
                          value={gr.name}
                          {...register("brand", {required: true})}
                          onChange={handleCheckBrand}
                          checked={brands.includes(gr.name)}
                        />
                        {gr.name}
                      </label>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

export default ModalBrand;