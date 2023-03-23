import styles from '@/styles/top/components/btn1.module.scss'

const Btn1 = ({txt, link, submit = false, disabled = false, blank = false}) => {
  return (
    <>
      {link ?
        <a href={link} className={`${styles.btn} hoverEffect`} target={blank ? '_blank' : '_parent'}>{txt}</a>
      :
        <button
          type={submit ? "submit" : "button"}
          className={`${styles.btn} hoverEffect`}
          disabled={disabled}
        >{txt}</button>
      }
    </>
  );
}

export default Btn1;