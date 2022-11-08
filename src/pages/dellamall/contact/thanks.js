import { Btn01 } from '@/components/dellamall';
import Container from '@/components/dellamall/Layouts/container';
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall';
import styles from '@/styles/dellamall/components/form.module.scss'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ThanksContact = () => {
  const router = useRouter()

  useEffect(() => {
    const contact = sessionStorage.getItem('dellamallContact')

    if (!contact) {
      router.push('/dellamall/contact')
    }

    sessionStorage.removeItem('dellamallContact')
  }, [])

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl2">お問い合わせ</h2>
        <ul className={styles.currentCircle__list}>
          <li className={`${styles.currentCircle__item} ${styles.is_active}`}>
            <span className="en">01</span>
            入力
          </li>
          <li className={`${styles.currentCircle__item} ${styles.is_active}`}>
            <span className="en">02</span>
            確認
          </li>
          <li className={`${styles.currentCircle__item} ${styles.is_active}`}>
            <span className="en">03</span>
            完了
          </li>
        </ul>
        <div className={styles.desc}>
          <p className={styles.big}>送信が完了しました。</p>
          <p className={styles.sm}>
            お問合わせいただき誠にありがとうございました。
            <br/>お問い合わせ内容を確認させていただき、後ほど担当者よりご回答をさせていただきます。
            <br/>恐れ入りますが、今しばらくお待ちいただけますよう、よろしくお願い申し上げます。
          </p>
        </div>
        <Btn01 txt="TOPへ" link="/dellamall" />
      </Container>
    </section>
  );
}

export default ThanksContact;

ThanksContact.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}