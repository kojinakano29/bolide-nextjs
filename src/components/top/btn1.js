import styles from '@/styles/top/components/btn1.module.scss'
import Link from "next/link";

const Btn1 = ({txt, link, submit = false, disabled = false}) => {
  return (
    <>
      {link ?
        <Link href={link}>
          <a className={`${styles.btn} hoverEffect`}>{txt}</a>
        </Link>
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