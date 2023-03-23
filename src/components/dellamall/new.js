import styles from '@/styles/dellamall/components/new.module.scss'
import Container from './Layouts/container';

const NewBtn = ({top = false}) => {
  return (
    <section className={`${styles.new} ${top ? styles.top : null}`}>
      <Container small>
        <h2 className="ttl1 center mb40">{top ? '新規のお客様はこちら' : '今すぐ会員登録'}</h2>
        <div className={styles.login__newList}>
          <a href="/dellamall/officialRequest" className={`${styles.login__newItem} btn4 hoverEffect`}>公式ショップ申請の方</a>
          <a href="/dellamall/contact/?type=captcha" className={`${styles.login__newItem} btn4 hoverEffect`}>
            無料キャプチャ申請の方
            <span>※ショップオーナー様</span>
          </a>
          <a href="/register/?plan=free" className={`${styles.login__newItem} btn4 hoverEffect`}>一般ユーザー（フリー）</a>
        </div>
      </Container>
    </section>
  );
}

export default NewBtn;