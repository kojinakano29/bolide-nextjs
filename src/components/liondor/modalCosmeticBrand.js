import styles from '@/styles/liondor/components/modalBrand.module.scss'
import { cosmetic } from '@/lib/liondor/constants'
import { useFormContext } from 'react-hook-form'
import { useCallback } from 'react'

const ModalCosmeticBrand = ({show, close, cosmetics, setCosmetics}) => {
  const { register } = useFormContext()

  const handleCheckCosmeBrand = useCallback((e) => {
    if(cosmetics.includes(e.target.value)) {
      setCosmetics(
        cosmetics.filter((item) => (item !== e.target.value))
      )
    } else {
      setCosmetics([...cosmetics, e.target.value])
    }
  }, [cosmetics, setCosmetics])

  return (
    <div className={`${styles.modalWrap} ${show ? styles.open : ''}`} onClick={close}>
      <div className={styles.modalBox}>
        <div className={styles.topFlex}>
          <h3 className={styles.name} onClick={(e) => e.stopPropagation()}>好きなコスメブランドを選択</h3>
          <p className={styles.close}>&#10005;</p>
        </div>
        <article className={styles.modalArticle} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalCont}>
            <nav className={styles.modalNav}>
              <ul>
                {cosmetic.map((item, index) => (
                  <li key={index}>
                    <a href={`#cosmetic${item.initial}`}>{item.initial}</a>
                    <div className={styles.hr}></div>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className={styles.brandList}>
              {cosmetic.map((item, index) => (
                <li id={`cosmetic${item.initial}`} key={index}>
                  <h4>{item.initial}</h4>
                  <div className={styles.brandInputBox}>
                    {item.group.map((gr) => (
                      <label key={gr.name}>
                        <input
                          type="checkbox"
                          id={gr.name}
                          value={gr.name}
                          {...register("cosmetic", {required: true})}
                          onChange={handleCheckCosmeBrand}
                          checked={cosmetics.includes(gr.name)}
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

export default ModalCosmeticBrand;