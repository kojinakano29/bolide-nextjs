import styles from '@/styles/corapura/components/editor.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import Container from '@/components/corapura/Layout/container';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import { GuidePopup, Loader, PostEditor } from '@/components/corapura';
import Link from 'next/link';

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/post/create`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const CreateMatter = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'corapura'})
  const [disabled, setDisabled] = useState(false)
  const [selector, setSelector] = useState(parseInt(1))
  const [required, setRequired] = useState(true)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onChange",
  })
  const [preview, setPreview] = useState()
  const [editorContent, setEditorContent] = useState("")
  const cats = posts.cat

  const onMatterCreate = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post(`/api/corapura/post/store`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      // console.log(res)
      alert("案件を作成しました。")
      router.push({
        pathname: '/corapura/editor/matter/[matterId]',
        query: { matterId: res.data.id },
      })
    }).catch((e) => {
      console.error(e)
    })

    await setDisabled(false)
  }, [setDisabled])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    setDisabled(true)

    onMatterCreate({
      user_id: user?.id,
      title: data.title,
      state: data.state,
      c_cat_id: data.c_cat_id,
      date: data?.date ? data.date : null,
      limite_date: data?.limite_date ? data.limite_date : null,
      reward: data?.reward ? data.reward : null,
      hope_reward: data?.hope_reward ? data.hope_reward : null,
      number_of_people: data?.number_of_people ? data.number_of_people : null,
      recruitment_quota: data?.recruitment_quota ? data.recruitment_quota : null,
      speciality: data?.speciality ? data.speciality : null,
      suporter: data?.suporter ? data.suporter : null,
      amount_of_suport: data?.amount_of_suport ? data.amount_of_suport : null,
      medium: data?.medium ? data.medium : null,
      brand: data?.brand ? data.brand : null,
      size: data?.size ? data.size : null,
      item_state: data?.item_state ? data.item_state : null,
      content: editorContent,
      thumbs: data.thumbs[0],
      tag: data.tag,
    })
  }, [setDisabled, onMatterCreate, user, editorContent])

  const handleChangeImage = useCallback(async (e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview(window.URL.createObjectURL(files[0]))
    } else {
      setPreview(null)
    }
  }, [setPreview])

  const handleChangeSelect = (e) => {
    setSelector(parseInt(e.target.value))
    reset({
      date: '',
      limite_date: '',
      reward: '',
      hope_reward: '',
      number_of_people: '',
      recruitment_quota: '',
      speciality: '',
      suporter: '',
      amount_of_suport: '',
      medium: '',
      brand: '',
      size: '',
      item_state: '',
    })
  }

  useEffect(() => {
    if (selector === 4 || selector === 5) {
      setRequired(false)
    } else {
      setRequired(true)
    }
  }, [selector])

  return (
    <>
      <section className="cont1">
        <Container small>
          {user ?
            <form onSubmit={handleSubmit(onSubmit)}>
              <article className={styles.matterFlex}>
                <div className={styles.matterLeft}>
                  <label className={`hoverEffect ${styles.fileBox}`}>
                    {preview ?
                      <img src={preview} alt="" />
                    :
                      "フォルダから画像を選択"
                    }
                    <input
                      type="file"
                      accept="image/*"
                      {...register('thumbs')}
                      onChange={handleChangeImage}
                    />
                  </label>
                </div>
                <div className={styles.matterRight}>
                  <dl>
                    <dt>
                      案件カテゴリーを選択ください
                      <GuidePopup txt={`あなたの投稿したい案件内容に関連したカテゴリを選択してください。\n選んだカテゴリに対してその下の記入項目も自動で変更されます。\n※項目を記入してからカテゴリを変更してしまうと初めから書き直しになってしまうので要注意`} />
                    </dt>
                    <dd>
                      <select {...register("c_cat_id")} onChange={(e) => handleChangeSelect(e)}>
                        {cats.map((cat, index) => (
                          <option value={cat.id} key={index}>{cat.name}</option>
                        ))}
                      </select>
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <label htmlFor="title">案件タイトルを入力ください</label>
                      <GuidePopup txt={`投稿する案件の大まかな内容を表すようなフレーズを入れてタイトルを設定しましょう。\n例）モデル募集！見習いスタイリストの練習モデルになってくれませんか？`} />
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
                      <label htmlFor="tag">案件に合ったタグを入力ください</label>
                      <GuidePopup txt={`その案件の内容に合ったタグを設定できます。\nタグの入力方法\n「タグ①,タグ②,タグ③」のようなかたちで入力可能です。\n\n「例）撮影依頼,美容室,カットモデル」\n※タグ同士を区切る時は必ず、半角カンマ「,」でお願いします。`} />
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
                </div>
              </article>

              <article className={styles.selectorArea}>
                {
                  selector === 2 ||
                  selector === 11 ||
                  selector === 13 ||
                  selector === 15 ||
                  selector === 18 ?
                  <dl>
                    <dt>掲載日</dt>
                    <dd>
                      <input
                        type="date"
                        {...register("date", {required: required})}
                      />
                      {errors.date && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector !== 19 ?
                  <dl>
                    <dt>募集期間</dt>
                    <dd>
                      <input
                        type="date"
                        {...register("limite_date", {required: required})}
                      />
                      {errors.limite_date && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 2 ||
                  selector === 11 ||
                  selector === 15 ?
                  <dl>
                    <dt>
                      <label htmlFor="reward">謝礼</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="reward"
                        {...register("reward", {required: required})}
                      />
                      {errors.reward && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 1 ||
                  selector === 2 ||
                  selector === 7 ||
                  selector === 8 ||
                  selector === 9 ||
                  selector === 11 ||
                  selector === 13 ||
                  selector === 14 ||
                  selector === 15 ||
                  selector === 16 ||
                  selector === 18 ?
                  <dl>
                    <dt>
                      <label htmlFor="number_of_people">募集人数</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="number_of_people"
                        {...register("number_of_people", {required: required})}
                      />
                      {errors.number_of_people && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 3 ||
                  selector === 4 ||
                  selector === 5 ||
                  selector === 8 ||
                  selector === 12 ||
                  selector === 13 ?
                  <dl>
                    <dt>
                      <label htmlFor="hope_reward">希望金額</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="hope_reward"
                        {...register("hope_reward", {required: required})}
                      />
                      {errors.hope_reward && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 3 ||
                  selector === 4 ||
                  selector === 5 ||
                  selector === 6 ||
                  selector === 12 ?
                  <dl>
                    <dt>
                      <label htmlFor="recruitment_quota">募集可能枠</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="recruitment_quota"
                        {...register("recruitment_quota", {required: required})}
                      />
                      {errors.recruitment_quota && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 10 ?
                  <dl>
                    <dt>
                      <label htmlFor="speciality">専門分野</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="speciality"
                        {...register("speciality", {required: required})}
                      />
                      {errors.speciality && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 17 ?
                  <dl>
                    <dt>
                      <label htmlFor="suporter">目標支援者数</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="suporter"
                        {...register("suporter", {required: required})}
                      />
                      {errors.suporter && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 17 ?
                  <dl>
                    <dt>
                      <label htmlFor="amount_of_suport">目標支援総額</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="amount_of_suport"
                        {...register("amount_of_suport", {required: required})}
                      />
                      {errors.amount_of_suport && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 19 ?
                  <dl>
                    <dt>
                      <label htmlFor="medium">媒体</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="medium"
                        {...register("medium", {required: required})}
                      />
                      {errors.medium && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 18 ?
                  <dl>
                    <dt>
                      <label htmlFor="reward">参加費</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="reward"
                        {...register("reward", {required: required})}
                      />
                      {errors.reward && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 4 ||
                  selector === 5 ?
                  <dl>
                    <dt>
                      <label htmlFor="brand">ブランド/メーカー</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="brand"
                        {...register("brand", {required: required})}
                      />
                      {errors.brand && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 4 ||
                  selector === 5 ?
                  <dl>
                    <dt>
                      <label htmlFor="size">大きさ/サイズ</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="size"
                        {...register("size", {required: required})}
                      />
                      {errors.size && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
                {
                  selector === 4 ||
                  selector === 5 ?
                  <dl>
                    <dt>
                      <label htmlFor="item_state">使用状況/状態</label>
                    </dt>
                    <dd>
                      <input
                        type="text"
                        id="item_state"
                        {...register("item_state", {required: required})}
                      />
                      {errors.item_state && <p className={styles.error}>必須項目を入力してください</p>}
                    </dd>
                  </dl>
                  : null
                }
              </article>

              <article className={styles.editArea}>
                <dl>
                  <dt>
                    本文
                    <GuidePopup txt={`■記入ツール\nテキストの大きさや色の変更、画像の追加など、このなかで色々なツールが使用できます。\n\n■B\n選択したテキストを太くすることができます。何かを強調したい時に使ってみてください。\n\n■U(アンダーバー)\n選択したテキストの下に下線を引くことができます。\n\n■I\n選択したテキストが斜めに表示されます。英語やローマ字をかっこよく見せることができます。\n\n■A↕\nテキストのサイズを調整できます。\n\n■A(アンダーバー)\nテキストの色をかえられます。\n\n■A（■）\nテキストに背景色を引くことができます。\n\n■A三\n選択肢の中からテキストの種類を変更できます。\n\n■ペンのマーク\n選択したテキストにハイライトを付けることができます。\n\n■(‐)\nリンク設定ができます。\n例えば、詳しくは別のWEBページを見てほしい…という時にそのWEBページのURLを設置できます。リンクを設置したいテキストを選択して、そのまま（ー）のマークをクリック。\n別タブでの表示設定も可能です。\n\n■”\nブロックオートです。選択したテキストをまとまりあるかたちで表示させます。\n例えば案件の概要と条件をそれぞれ選択して、ブロックオートをクリックすることで見やすくブロック分けされて区切られます。\n\n■・、1ー\n箇条書き設定ができます。・で箇条書きもしくは、先頭に数字を付けた箇条書きも可能です。\n\n■＝\nテキストの配置を変更できます。\n左寄せ、中央揃え、右寄せから選べます。\n\n■ソース\nコードの入力が可能です。\n※対応していないコードやコードが間違っている場合には、反映がされず入力したコードの内容は削除されますのでご注意ください。\n\n■画像マーク\n画像の挿入が可能です。\nPC内やスマホ内カメラホルダに入ってる画像のアップロードが可能です。\n\n■表\n表の作成が可能です。\n\n■ビデオマーク\nYouTube動画のURLを入力して、動画を表示させることができます。\n\n■←、→\n本文入力の状態を戻したり、進めたりできます。`} />
                  </dt>
                  <dd>
                    <PostEditor
                      handleChange={(editorContent) => {
                        setEditorContent(editorContent)
                      }}
                      uploadPath={`/api/corapura/post/imagesave`}
                      matter
                    />
                  </dd>
                </dl>
              </article>

              <div className={styles.checkArea}>
                <label>
                  <input
                    type="checkbox"
                    {...register("check", {required: true})}
                  />
                  <p className={styles.txt}>
                    <Link href={`/corapura/terms`}><a target="_blank">利用規約</a></Link>に同意します
                  </p>
                </label>
                {errors.check && <p className={styles.error}>チェック必須項目です</p>}
              </div>

              <div className={styles.submitFlex}>
                <button className={`${styles.submitBtn2} hoverEffect`} disabled={disabled}>
                  <label>
                    作成
                    <input
                      type="radio"
                      value="0"
                      {...register("state")}
                      disabled={disabled}
                    />
                  </label>
                </button>
                <button className={`${styles.submitBtn2} ${styles.submitBtn3} hoverEffect`} disabled={disabled}>
                  <label>
                    下書き保存
                    <input
                      type="radio"
                      value="4"
                      {...register("state")}
                      disabled={disabled}
                    />
                  </label>
                </button>
              </div>
            </form>
          : <Loader />}
        </Container>
      </section>
    </>
  );
}

export default CreateMatter;

CreateMatter.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}