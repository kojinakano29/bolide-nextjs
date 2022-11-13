import styles from '@/styles/dellamall/components/adminForm.module.scss'
import { Loader } from "@/components/dellamall";
import Container from "@/components/dellamall/Layouts/container";
import PageLayoutDellamall from "@/components/Layouts/PageLayoutDellamall";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

const CreateShop = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth'})
  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [preview, setPreview] = useState()

  const handleChangeFile = useCallback((e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview(window.URL.createObjectURL(files[0]))
    } else {
      setPreview("")
    }
  }, [])

  const onShopCreate = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post('/api/dellamall/shop/store', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      console.log(res)
    }).catch((e) => {
      console.error(e)
    })
  }, [])

  const onSubmit = useCallback(async (data) => {
    console.log(data)
    setDisabled(true)

    onShopCreate({
      user_id: user?.id,
      url: data.url,
      name: data.name,
      tag: data.tag,
      description: data.description,
      thumbs: data.thumbs[0],
    })
  }, [onShopCreate ,user])

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl2">ショップ作成</h2>
        {user ?
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.infoTtl}>基本情報</h3>
            <article className={styles.infoFlex}>
              <div className={styles.infoLeft}>
                <dl>
                  <dt>
                    <label htmlFor="thumbs">キャプチャ画像</label>
                  </dt>
                  <dd>
                    <input
                      type="file"
                      id="thumbs"
                      accept="image/*"
                      {...register("thumbs")}
                      onChange={handleChangeFile}
                    />
                    <div className={styles.imgBox}>
                      <img src={preview} alt="サイトのTOPページのキャプチャが入ります" />
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <label htmlFor="permission">キャプチャの表示・非表示</label>
                  </dt>
                  <dd>
                    <input
                      type="checkbox"
                      id="permission"
                      {...register("image_permission")}
                    />
                  </dd>
                </dl>
              </div>
              <div className={styles.infoRight}>
                <dl>
                  <dt>
                    <label htmlFor="url">サイトURL</label>
                  </dt>
                  <dd>
                    <input
                      type="text"
                      id="url"
                      {...register("url", { required: true })}
                      placeholder="https://xxxyyy.....jp"
                    />
                    {errors.url && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <label htmlFor="name">サイト名</label>
                  </dt>
                  <dd>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: true })}
                      placeholder="サイト名、お店の名前を入れてください"
                    />
                    {errors.name && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <label htmlFor="tag">関連タグ</label>
                  </dt>
                  <dd>
                    <textarea id="tag" {...register("tag")}></textarea>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <label htmlFor="desc">サイト説明文</label>
                  </dt>
                  <dd>
                    <textarea
                      id="desc"
                      {...register("description")}
                      placeholder="ショップの紹介をしてください！&#10;「○○がおいしい洋菓子店」「オンライン限定商品も豊富」など"
                    ></textarea>
                  </dd>
                </dl>
              </div>
            </article>
            <button
              className={styles.btn}
              disabled={disabled}
            >作成</button>
          </form>
        : <Loader />}
      </Container>
    </section>
  );
}

export default CreateShop;

CreateShop.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}