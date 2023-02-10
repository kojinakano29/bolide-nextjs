import styles from '@/styles/dellamall/components/adminList.module.scss'
import PageLayoutDellamall from "@/components/Layouts/PageLayoutDellamall";
import Container from '@/components/dellamall/Layouts/container';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Btn01 } from '@/components/dellamall';

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DELLAMALL}/shop/official_comments/${params.id}`)
  const data = await res.json()

  return {
      props: {
          posts: data
      }
  }
}

const CommentList = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'dellamall'})

  const onLoadCheck = async () => {
    if (user?.account_type === 0) {
      router.push('/dellamall/')
    }
  }

  // useEffect(() => {
  //   if (user) {
  //     onLoadCheck()
  //   }
  // }, [user])

  const handleClickDelete = async (commentId) => {
    await csrf()

    await axios.delete(`/api/dellamall/comment/delete`, {
      data: {
        user_id: user?.id,
        comment_id: commentId,
      }
    }).then((res) => {
      // console.log(res)
      alert("コメントを削除しました。")
      router.reload()
    }).catch((e) => {
      console.error(e)
    })
  }

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl2">コメント一覧</h2>
        <article className={styles.listBox}>
          {posts.map((comment, index) => (
            <div className={styles.list} key={index}>
              <p className={styles.content}>{comment.content}</p>
              <div className={styles.btnBox}>
                <button
                  type="button"
                  className={styles.delete}
                  onClick={() => handleClickDelete(comment.id)}
                >削除</button>
              </div>
            </div>
          ))}
        </article>
        <Btn01 txt="ショップ一覧へ戻る" link="/dellamall/admin/shop" />
      </Container>
    </section>
  );
}

export default CommentList;

CommentList.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}