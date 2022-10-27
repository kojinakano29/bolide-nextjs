import Container from '@/components/Layouts/container'
import PageLayout from '@/components/Layouts/PageLayout'
import { PageTitle } from '@/components/liondor'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import styles from '@/styles/liondor/components/adminList.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// SSR
export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/faq/admin`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const AdminFaq = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth'})

  useEffect(() => {
    onLoadCheck()
  }, [user])

  const onLoadCheck = () => {
    if (user?.account_type < 2) {
      alert("このページにはアクセスできません。")
      router.push(`/liondor`)
    }
  }

  const [disabled, setDisabled] = useState(false)
  const faqs = posts.faq
  const faqCompany = faqs.filter((faq) => {
    return faq.type === 1
  })
  const faqUser = faqs.filter((faq) => {
    return faq.type === 0
  })

  const onClickDelete = async (post) => {
    setDisabled(true)
    await csrf()

    await axios.delete(`/api/liondor/faq/delete/${post.id}`)
    .then((res) => {
      // console.log(res)
      alert("よくある質問を削除しました。")
      router.reload()
    })
    .catch((e) => {
      console.error(e)
      alert("よくある質問の削除に失敗しました。")
    })

    await setDisabled(false)
  }

  return (
    <section className="cont1">
      <PageTitle title="よくあるご質問一覧" />
      {user?.account_type > 2 ?
        <Container small900>
          <Link href="/liondor/present/create">
            <a className={`btn2 ${styles.create}`}>新規作成</a>
          </Link>
          <article className={styles.article}>
            <h3 className={styles.faqTtl}>企業様向け</h3>
            <ul>
              {faqCompany?.map((item, index) => (
                <li key={index}>
                  <Link href={`/liondor/faq/edit/${item.id}`}>
                    <a className={styles.ttl}>{item.question}</a>
                  </Link>
                  <div className={styles.btnBox}>
                    <Link href={`/liondor/faq/edit/${item.id}`}>
                      <a className={styles.edit}>編集</a>
                    </Link>
                    <button className={styles.delete} onClick={() => onClickDelete(item)} disabled={disabled}>削除</button>
                  </div>
                </li>
              ))}
            </ul>
          </article>
          <article className={styles.article}>
            <h3 className={styles.faqTtl}>ユーザー向け</h3>
            <ul>
              {faqUser?.map((item, index) => (
                <li key={index}>
                  <Link href={`/liondor/faq/edit/${item.id}`}>
                    <a className={styles.ttl}>{item.question}</a>
                  </Link>
                  <div className={styles.btnBox}>
                    <Link href={`/liondor/faq/edit/${item.id}`}>
                      <a className={styles.edit}>編集</a>
                    </Link>
                    <button className={styles.delete} onClick={() => onClickDelete(item)} disabled={disabled}>削除</button>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </Container>
        : null
      }
    </section>
  );
}

export default AdminFaq;

AdminFaq.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}