import styles from '@/styles/dellamall/components/container.module.scss'

const Container = ({children, small = false, small900 = false}) => {
  return (
    <div className={`
      ${small ? styles.small : styles.default}
      ${small900 ? styles.small900 : ''}
    `}>
      {children}
    </div>
  );
}

export default Container;