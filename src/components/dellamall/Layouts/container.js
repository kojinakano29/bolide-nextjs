import styles from '@/styles/dellamall/components/container.module.scss'

const Container = ({children, small = false, small900 = false, big = false}) => {
  return (
    <div className={`
      ${small ? styles.small : styles.default}
      ${small900 ? styles.small900 : ''}
      ${big ? styles.big : ''}
    `}>
      {children}
    </div>
  );
}

export default Container;