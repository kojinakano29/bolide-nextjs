import styles from '@/styles/components/container.module.scss'

const Container = ({children, small = false}) => {
  return (
    <div className={small ? styles.small : styles.default}>
      {children}
    </div>
  );
}

export default Container;