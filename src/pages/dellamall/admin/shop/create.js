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

const CreateShop = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'dellamall'})
  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  })
  const [preview, setPreview] = useState()
  const [officialCheck, setOfficialCheck] = useState(true)
  const [imgName, setImgName] = useState("")

  useEffect(() => {
    if (user) {
      if (user?.account_type > 2) {
        setOfficialCheck(false)
      }
    }
  }, [user])

  const onShopCreate = useCallback(async (data) => {
    await csrf()

    await axios.post('/api/dellamall/shop/store', data)
    .then((res) => {
      // console.log(res)
      alert("ショップを作成しました。")
      router.push({
        pathname: '/dellamall/admin/shop/',
      })
    }).catch((e) => {
      console.error(e)
      alert("ショップの作成に失敗しました。")
    })

    await setDisabled(false)
  }, [setDisabled])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    setDisabled(true)

    onShopCreate({
      user_id: user?.id,
      url: data.url,
      name: data.name,
      tag: data.tag,
      description: data.description,
      thumbs: preview,
      imgname: imgName,
    })
  }, [setDisabled, onShopCreate, user, preview, imgName])

  const handleClickSiteData = async (url) => {
    // console.log(url)
    await setDisabled(true)
    await csrf()

    await axios.post('/api/dellamall/shop_create_url', {
      url: url,
    }).then((res) => {
      // console.log(res)
      if (res.data !== "すでにショップがあります") {
        setValue("name", res.data.title)
        setValue("tag", res.data.keyword)
        setValue("description", res.data.description)
        setPreview(res.data.imgsrc)
        setImgName(res.data.imgname)
        alert("サイト情報の取得に成功しました。")
      } else {
        alert(res.data)
      }
    }).catch((e) => {
      console.error(e)
      alert("サイト情報の取得に失敗しました。")
    })

    await setDisabled(false)
  }

  return (
    <section className={`${styles.adminForm} cont1`}>
      <Container small>
        <h2 className="ttl2">ショップ作成</h2>
        {user ?
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
                      {preview ? <img src={preview} alt="" /> : <div className={styles.imgNone}>ショップのキャプチャが入ります</div>}
                    </div>
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
                    />
                    {errors.url && <p className={styles.error}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                {disabled ? <Loader /> :
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btn2} hoverEffect`}
                    onClick={() => handleClickSiteData(getValues("url"))}
                    disabled={disabled}
                  >サイト情報を取得する</button>
                }
                <dl>
                  <dt>
                    <label htmlFor="name">サイト名</label>
                  </dt>
                  <dd>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: true })}
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
            <div className={styles.check}>
              <label>
                <span className={styles.require}>必須</span>
                <input type="checkbox" {...register("check", {required: true})} />
                <Link href="/dellamall/terms">
                  <a  target="_blank">利用規約</a>
                </Link>
                に同意する
              </label>
              {errors.check && <p className={`orange ${styles.error} ${styles.error2}`}>※こちらの項目は入力必須です</p>}
            </div>
            <button
              className={`${styles.btn} hoverEffect`}
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