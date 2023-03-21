import styles from '@/styles/corapura/components/editor.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '@/components/corapura/Layout/container';
import { CreateUserForm, EditUserForm, GuidePopup, Loader } from '@/components/corapura';
import axios from '@/lib/axios';
import { zips, skillList } from '@/lib/corapura/constants';

export const UserContext = createContext()

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/mypage/edit/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const EditUser = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const profile = posts.c_profile
  const option = posts.c_profile_option
  const tags = profile.c_tags.map((tag) => {
    return tag.name
  })
  const skills = option.c_user_skills.map((skill) => {
    return skill.name
  })
  const tagStr = tags.join(',')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'corapura'})
  const [disabled, setDisabled] = useState(false)
  const [popup, setPopup] = useState(false)
  const [mode, setMode] = useState("")
  const [type, setType] = useState("")
  const [targetId, setTargetId] = useState()
  const [sns, setSns] = useState(option.c_user_socials)
  const [cards, setCards] = useState(posts.c_cards)
  const [likes, setLikes] = useState(posts.c_likes)
  const [editData, setEditData] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nicename: profile.nicename,
      title: profile.title,
      tag: tagStr,
      zip: profile.zip,
      profile: profile.profile,
      appeal_text: option.appeal_text,
      brand: option.brand,
      skill: skills,
    },
    mode: "onChange",
  })
  const [preview1, setPreview1] = useState(profile.image1 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image1}` : "")
  const [preview2, setPreview2] = useState(profile.image2 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image2}` : "")
  const [preview3, setPreview3] = useState(profile.image3 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image3}` : "")
  const [previewIcon, setPreviewIcon] = useState(profile.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.thumbs}` : "")
  const [previewAppeal, setPreviewAppeal] = useState(option.appeal_image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${option.appeal_image}` : "")

  const previews = [
    preview1,
    preview2,
    preview3,
  ]

  const onLoadCheck = useCallback(async (message, redirect) => {
    alert(message)
    router.push({
      pathname: redirect,
    })
  }, [])

  useEffect(() => {
    if (user && user?.account_type !== 0) {
      if (user?.id !== profile.id && user?.account_type < 3) {
        onLoadCheck("このページの閲覧権限がありません。", "/corapura")
      }
    }
  }, [user])

  const handleChangeImage = useCallback(async (e, num) => {
    const { files } = e.target
    if (files[0]) {
      if (num === 1) {
        setPreview1(window.URL.createObjectURL(files[0]))
      } else if (num === 2) {
        setPreview2(window.URL.createObjectURL(files[0]))
      } else if (num === 3) {
        setPreview3(window.URL.createObjectURL(files[0]))
      } else if (num === 4) {
        setPreviewIcon(window.URL.createObjectURL(files[0]))
      } else if (num === 5) {
        setPreviewAppeal(window.URL.createObjectURL(files[0]))
      }
    } else {
      if (num === 1) {
        setPreview1("")
      } else if (num === 2) {
        setPreview2("")
      } else if (num === 3) {
        setPreview3("")
      } else if (num === 4) {
        setPreviewIcon("")
      } else if (num === 5) {
        setPreviewAppeal("")
      }
    }
  }, [setPreview1, setPreview2, setPreview3, setPreviewIcon, setPreviewAppeal])

  const onProfileUpdate = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post(`/api/corapura/mypage/update/${profile.id}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log(res)
    }).catch((e) => {
      console.error(e)
      alert("プロフィールの編集に失敗しました。")
    })
  }, [profile])

  const onUserProfileUpdate = useCallback(async (data) => {
    await csrf

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post(`/api/corapura/mypage/c_user_profile/update/${option.id}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log(res)
      alert("プロフィールを編集しました。")
      router.reload()
    }).catch((e) => {
      console.error(e)
    })
  }, [option])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    setDisabled(true)

    await onProfileUpdate({
      user_id: user?.id,
      nicename: data.nicename,
      title: data.title,
      tag: data.tag,
      zip: data.zip,
      profile: data.profile,
      image1: data.image1.length !== 0 ? data.image1[0] : profile.image1,
      image2: data.image2.length !== 0 ? data.image2[0] : profile.image2,
      image3: data.image3.length !== 0 ? data.image3[0] : profile.image3,
      thumbs: data.thumbs.length !== 0 ? data.thumbs[0] : profile.thumbs,
    })

    await onUserProfileUpdate({
      c_profile_id: profile.id,
      appeal_image: data.appeal_image.length !== 0 ? data.appeal_image[0] : option.appeal_image,
      appeal_text: data.appeal_text,
      brand: data.brand,
      skill: data.skill.join(','),
    })

    await setDisabled(false)
  }, [setDisabled, onProfileUpdate, onUserProfileUpdate, user, profile])

  const handleClickCreate = async (type) => {
    setMode("create")
    setPopup(prevState => !prevState)
    setType(type)
  }

  const handleClickEdit = async (type, id) => {
    setMode("edit")
    setPopup(prevState => !prevState)
    setType(type)
    setTargetId(id)

    if (disabled) return
    setDisabled(true)
    await csrf()

    if (type === "card") {
      await axios.post(`/api/corapura/card/edit/${id}`)
      .then((res) => {
        // console.log(res)
        setEditData(res.data)
      }).catch(e => console.error(e))
    } else if (type === "like") {
      await axios.post(`/api/corapura/like/edit/${id}`)
      .then((res) => {
        // console.log(res.data)
        setEditData(res.data)
      }).catch(e => console.error(e))
    } else if (type === "sns") {
      await axios.post(`/api/corapura/mypage/c_user_social/edit/${id}`)
      .then((res) => {
        // console.log(res)
        setEditData(res.data)
      }).catch(e => console.error(e))
    }

    await setDisabled(false)
  }

  const handleClickDelete = async (type, id) => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    if (type === "card") {
      await axios.delete(`/api/corapura/card/delete`, {
        data: {
          c_card_id: id,
          c_profile_id: profile.id,
        }
      }).then((res) => {
        // console.log(res)
        alert("削除しました。")
        setCards(res.data)
      }).catch((e) => {
        console.error(e)
        alert("削除できませんでした。")
      })
    } else if (type === "like") {
      await axios.delete(`/api/corapura/like/delete`, {
        data: {
          c_like_id: id,
          c_profile_id: profile.id,
        }
      }).then((res) => {
        // console.log(res)
        alert("削除しました。")
        setLikes(res.data)
      }).catch((e) => {
        console.error(e)
        alert("削除できませんでした。")
      })
    } else if (type === "sns") {
      await axios.delete(`/api/corapura/mypage/c_user_social/delete`, {
        data: {
          c_user_social_id: id,
          c_profile_id: profile.id,
        }
      }).then((res) => {
        // console.log(res)
        alert("削除しました。")
        setSns(res.data)
      }).catch((e) => {
        console.error(e)
        alert("削除できませんでした。")
      })
    }

    await setDisabled(false)
  }

  return (
    <>
      <section className="cont1">
        <Container small>
          {user ?
            <form onSubmit={handleSubmit(onSubmit)}>
              <article className={styles.profileFlex}>
                <div className={styles.profileLeft}>
                  {previews.map((preview, index) => (
                    <div key={index}>
                      <div className={`
                        ${styles.imgBox}
                        ${user?.account_type === 0 ? styles.user : null}
                      `} key={index}>
                        {preview ? <img src={preview} alt="プレビュー画像" /> : null}
                      </div>
                      <label className={`hoverEffect ${styles.fileBtn}`}>
                        ファイルから画像を選択
                        <span>アップロード</span>
                        <input
                          type="file"
                          accept="image/*"
                          {...register(`image${index+1}`)}
                          onChange={(e) => handleChangeImage(e, index+1)}
                        />
                      </label>
                    </div>
                  ))}
                </div>
                <div className={styles.profileRight}>
                  <div className={styles.iconFlex}>
                    <div className={styles.iconBox}>
                      {previewIcon ? <img src={previewIcon} alt="プレビュー画像" /> : null}
                    </div>
                    <GuidePopup txt={`アイコンを登録してみましょう♪\n\n企業様であれば、オフィス外観やオフィス内風景、会社ロゴ(マーク)、代表者様の素敵なお写真など…\n御社を表すトレードマークのようなイメージをここに登録してみましょう。\n\nユーザー様であれば、ご自身の宣材写真やブランドロゴ、好きなもの、趣味に関するもの、景色など…\nご自身を象徴する素敵な一枚をここに登録してみましょう。\n\n※推奨画像サイズ：\n【ユーザー様】小アイコン80×80、アイキャッチ374×374\n【企業様】小アイコン80×80、アイキャッチ496×496`} />
                    <label className={`hoverEffect ${styles.fileBtn}`}>
                      ファイルから画像を選択
                      <span>アップロード</span>
                      <input
                        type="file"
                        accept="image/*"
                        {...register("thumbs")}
                        onChange={(e) => handleChangeImage(e, 4)}
                      />
                    </label>
                  </div>
                  <dl>
                    <dt>
                      <label htmlFor="nicename">{user?.account_type === 0 ? "ニックネーム" : "企業名"}を入力ください</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="nicename"
                        {...register("nicename", {required: true})}
                      />
                      {errors.nicename && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="title">{user?.account_type === 0 ? "キャッチコピー" : "業種"}を入力ください</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="title"
                        {...register("title", {required: true})}
                      />
                      {errors.title && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="tag">{user?.account_type === 0 ? "自分を表す・関連するタグ" : "業種に合ったタグを入力ください"}</label>
                      <GuidePopup txt={`自分を表す・関連するタグを設定できます。\nタグの入力方法\n「タグ①,タグ②,タグ③」のようなかたちで入力可能です。\n\n「例）撮影依頼,美容室,カットモデル」\n※タグ同士を区切る時は必ず、半角カンマ「,」でお願いします。`} />
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="tag"
                        {...register("tag", {required: true})}
                      />
                      {errors.tag && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>都道府県</dt>
                    <dd>
                      <select {...register("zip")}>
                        {zips.map((zip, index) => (
                          <option value={zip} key={index}>{zip}</option>
                        ))}
                      </select>
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="profile">{user?.account_type === 0 ? "自己紹介" : "事業内容"}を入力ください</label>
                    </dt>
                    <dd>
                      <textarea id="profile" {...register("profile", {required: true})}></textarea>
                      {errors.profile && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>得意分野を選択ください</dt>
                    <dd className={styles.skillScroll}>
                      {skillList.map((skill, index) => (
                        <label key={index}>
                          <input
                            type="checkbox"
                            value={skill}
                            {...register("skill", {required: true})}
                          />
                          {skill}
                        </label>
                      ))}
                      {errors.skill && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="brand">プロデュースブランド</label>
                    </dt>
                    <dd>
                      <input
                        type="url"
                        id="brand"
                        {...register("brand")}
                      />
                      {errors.brand && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  <dl>
                    <dt>アピール画像</dt>
                    <dd>
                      <div className={styles.imgBox}>
                        {previewAppeal ? <img src={previewAppeal} alt="プレビュー画像" /> : null}
                      </div>
                      <label className={`hoverEffect ${styles.fileBtn}`}>
                        ファイルから画像を選択
                        <span>アップロード</span>
                        <input
                          type="file"
                          accept="image/*"
                          {...register("appeal_image")}
                          onChange={(e) => handleChangeImage(e, 5)}
                        />
                      </label>
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="appeal_text">アピールテキスト</label>
                    </dt>
                    <dd>
                      <textarea id="appeal_text" {...register("appeal_text", {required: true})}></textarea>
                      {errors.appeal_text && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                </div>
              </article>
              <div className={styles.submitFlex}>
                <button
                  className={`${styles.submitBtn} hoverEffect`}
                  disabled={disabled}
                >編集</button>
              </div>
            </form>
          : <Loader />}
        </Container>
      </section>

      {user ?
        <section className={styles.editorArea}>
          <Container small>
            <div className={styles.editorBox}>
              <div className={styles.ttlFlex}>
                <h4 className={styles.ttl2}>SNSリンク先</h4>
                <button
                  type="button"
                  className={`${styles.btn} hoverEffect`}
                  onClick={() => handleClickCreate("sns")}
                >新規作成</button>
              </div>
              <article className={styles.listBox}>
                {sns?.map((sns, index) => (
                  <div className={styles.list} key={index}>
                    <p className={styles.txt}>{sns.name}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={`${styles.btn} hoverEffect`}
                        onClick={() => handleClickEdit("sns", sns.id)}
                      >編集</button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleClickDelete("sns", sns.id)}
                      >削除</button>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <div className={styles.editorBox}>
              <div className={styles.ttlFlex}>
                <h4 className={styles.ttl2}>名刺</h4>
                <button
                  type="button"
                  className={`${styles.btn} hoverEffect`}
                  onClick={() => handleClickCreate("card")}
                >新規作成</button>
              </div>
              <article className={styles.listBox}>
                {cards?.map((card, index) => (
                  <div className={styles.list} key={index}>
                    <p className={styles.txt}>{card.title}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={`${styles.btn} hoverEffect`}
                        onClick={() => handleClickEdit("card", card.id)}
                      >編集</button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleClickDelete("card", card.id)}
                      >削除</button>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <div className={styles.editorBox}>
              <div className={styles.ttlFlex}>
                <h4 className={styles.ttl2}>推し活・ホビー</h4>
                <button
                  type="button"
                  className={`${styles.btn} hoverEffect`}
                  onClick={() => handleClickCreate("like")}
                >新規作成</button>
              </div>
              <article className={styles.listBox}>
                {likes?.map((like, index) => (
                  <div className={styles.list} key={index}>
                    <p className={styles.txt}>{like.title}</p>
                    <div className={styles.btnBox}>
                      <button
                        type="button"
                        className={`${styles.btn} hoverEffect`}
                        onClick={() => handleClickEdit("like", like.id)}
                      >編集</button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => handleClickDelete("like", like.id)}
                      >削除</button>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.submitFlex}>
                <button
                  className={`${styles.submitBtn} hoverEffect`}
                  disabled={disabled}
                >編集</button>
              </div>
              <p className={styles.editDesc}>
                ※こちらの「編集」ボタンは基本情報に対するボタンです。
                <br/>SNSリンク先以降の情報の更新とは別になります。
              </p>
            </form>
          </Container>
        </section>
      : null}

      {popup ?
        <UserContext.Provider value={{
          profile,
          option,
          type,
          targetId,
          setSns,
          setCards,
          setLikes,
          handleClickCreate,
          handleClickEdit,
          disabled,
          setDisabled,
          editData,
          setEditData,
        }}>
          {mode === "create" ? <CreateUserForm /> : <EditUserForm />}
        </UserContext.Provider>
      : null}
    </>
  );
}

export default EditUser;

EditUser.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}