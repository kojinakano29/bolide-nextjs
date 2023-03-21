import axios from '@/lib/axios';
import styles from '@/styles/dellamall/components/createMall.module.scss'
import { useCallback, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Btn01 } from '@/components/dellamall';
import Container from './Layouts/container';
import { CreateMallContext } from '@/pages/dellamall/mypage/[id]';

const CreateMallMypage = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { handleClickPopup, setCreateMall, user } = useContext(CreateMallContext)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const processing = useRef(false)

  const onCreateMall = useCallback(async (data) => {
    if (processing.current) return
    processing.current = true
    await csrf()

    await axios.post(`/api/dellamall/mall/store`, data)
    .then((res) => {
      // console.log(res)
      setCreateMall(res.data.mall)
      alert("モールを作成しました。")
      handleClickPopup()
    })
    .catch((e) => {
      console.error(e)
      alert("モールの作成に失敗しました。")
    })

    processing.current = false
  }, [])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    let lock = 0
    if (data.lock) {
      lock = 1
    }

    onCreateMall({
      user_id: user?.id,
      name: data.name,
      lock: lock,
    })
  }, [onCreateMall, user])

  return (
    <div className={styles.createMallModal} onClick={handleClickPopup}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container small900>
          <div className={styles.createMallBox} onClick={(e) => e.stopPropagation()}>
            <img
              className={`${styles.closeBtn} hoverEffect`}
              src="/dellamall/close.svg"
              alt="閉じるアイコン"
              onClick={handleClickPopup}
            />
            <h3 className="ttl2">新規モールを作成する</h3>
            <dl>
              <dt><label htmlFor="name">名前</label></dt>
              <dd>
                <input type="text" id="name" {...register("name", {required: true})} placeholder="モール名" />
                {errors.name && <p className={`orange ${styles.error}`}>※こちらの項目は入力必須です</p>}
              </dd>
            </dl>
            <dl>
              <dt><label htmlFor="lock">プライベート</label></dt>
              <dd>
                <input type="checkbox" id="lock" {...register("lock")} />
              </dd>
            </dl>
            <div className={styles.btnBox}>
              <Btn01 txt="作成する" />
            </div>
          </div>
        </Container>
      </form>
    </div>
  );
}

export default CreateMallMypage;