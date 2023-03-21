import styles from '@/styles/dellamall/components/adminForm.module.scss'
import { GuidePopup, Loader } from "@/components/dellamall";
import Container from "@/components/dellamall/Layouts/container";
import PageLayoutDellamall from "@/components/Layouts/PageLayoutDellamall";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from 'next/link';

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DELLAMALL}/shop/edit/${params.id}`)
  const data = await res.json()

  return {
      props: {
          posts: data
      }
  }
}

const EditShop = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'dellamall'})
  const [disabled, setDisabled] = useState(false)
  const tags = posts?.d_tags
  const tags2 = tags?.map((item) => {return item.name})
  const tagStr = tags2?.join(',')
  const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
    defaultValues: {
      url: posts.url,
      name: posts.name,
      tag: tagStr,
      description: posts.description && posts.description !== "undefined" ? posts.description : "",
    },
    mode: "onChange",
  })
  const [preview, setPreview] = useState(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${posts.thumbs}`)
  const [officialCheck, setOfficialCheck] = useState(true)

  useEffect(() => {
    if (user) {
      if (posts.official_user_id === user?.id || user?.account_type > 2) {
        setOfficialCheck(false)
      }

      if (user?.id !== posts.user_id && user?.account_type < 3) {
        router.push(`/dellamall/mypage/${user?.id}`)
      }
    }
  }, [user])

  const handleChangeFile = useCallback((e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview(window.URL.createObjectURL(files[0]))
    } else {
      setPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${posts.thumbs}`)
    }
  }, [])

  const onShopEdit = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post(`/api/dellamall/shop/update/${posts.id}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      // console.log(res)
      alert("ショップを編集しました。")
    }).catch((e) => {
      console.error(e)
      alert("ショップの編集に失敗しました。")
    })

    await setDisabled(false)
  }, [setDisabled])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    setDisabled(true)

    onShopEdit({
      user_id: user?.id,
      url: data.url,
      name: data.name,
      tag: data.tag,
      description: data.description,
      thumbs: data.thumbs && data.thumbs?.length !== 0 ? data.thumbs[0] : posts.thumbs,
    })
  }, [setDisabled, onShopEdit, user, preview])

  return (
    <section className={`${styles.adminForm} cont1`}>
      <Container small>
        <h2 className="ttl2">ショップ編集</h2>
        {user?.id === posts.user_id || user?.account_type > 2 ?
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.infoTtl}>基本情報</h3>
            <p className={styles.desc}>
              ※ショップ作成時の注意事項
              <br/>・既に同じURLのサイトがデラモールに登録されている場合は、重複したショップの作成はできません。
              <br/>・モール型ショップの場合は個々のショップではなく、モールショップのTOPのURLをお貼りください。
              <br/>・公式ショップ申請をされていない場合、サイトURL・関連タグ以外の情報は入力できません。
            </p>
            <article className={styles.infoFlex}>
              <div className={styles.infoLeft}>
                <dl>
                  <dt>
                    <label htmlFor="thumbs">キャプチャ画像</label>
                  </dt>
                  <dd>
                    <div className={styles.imgBox}>
                      {preview ? <img src={preview} alt="プレビュー画像" /> : <div className={styles.imgNone}>ショップのキャプチャが入ります</div>}
                    </div>
                    <label htmlFor="thumbs" className={`${styles.thumbsBox} ${officialCheck ? styles.disabled : 'hoverEffect'}`}>
                      キャプチャを選択する
                      <input
                        type="file"
                        id="thumbs"
                        accept="image/*"
                        {...register("thumbs")}
                        onChange={handleChangeFile}
                        disabled={officialCheck}
                      />
                    </label>
                  </dd>
                </dl>
              </div>
              <div className={styles.infoRight}>
                <dl>
                  <dt>
                    <label htmlFor="url">サイトURL</label>
                    <br/>
                    <span>
                      ※必ずサイトTOPページのURLを入力ください！
                      <br/>※公式ショップ登録したい方で、URLが登録できない場合にはお問合せください。(お問合せがリンク)
                    </span>
                  </dt>
                  <dd>
                    <input
                      type="text"
                      id="url"
                      {...register("url", { required: true })}
                      placeholder="https://xxxyyy.....jp"
                    />
                    {errors.url && <p className={styles.error}>必須項目を入力してください</p>}
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
                      disabled={officialCheck}
                    />
                    {errors.name && <p className={styles.error}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <label htmlFor="tag">関連タグ</label>
                    <GuidePopup txt={`●タグとは？\nそのショップの特徴やサービスなどに沿ったタグを付与できる機能です。\n検索時に同じタグが付いたショップを探すことも可能です。\n\n例えばアパレルショップであれば、「アパレル」「メンズ」「カジュアル」など…\n\n●タグの入力方法\n「タグ①,タグ②,タグ③」のようなかたちで入力可能です。\n↓\n「例）愛知県,ご飯,フレンチ」\n※タグ同士を区切る時は必ず、半角カンマ「,」でお願いします。\n\n●タグの数制限\n公式ショップは無制限で設定できますが、それ以外のショップは\n最大3つまでしか反映されません。`} />
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
                      disabled={officialCheck}
                    ></textarea>
                  </dd>
                </dl>
              </div>
            </article>
            <div className={styles.btnFlex}>
              <button
                className={`${styles.btn} hoverEffect`}
                disabled={disabled}
              >編集</button>
              <Link href="/dellamall/admin/shop">
                <a className={`${styles.btn} ${styles.btn3} hoverEffect`}>戻る</a>
              </Link>
            </div>
          </form>
        : <Loader />}
      </Container>
    </section>
  );
}

export default EditShop;

EditShop.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}