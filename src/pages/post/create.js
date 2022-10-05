import styles from '@/styles/components/createPost.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useState } from 'react'
import { PostEditor } from '@/components';
import { useForm } from 'react-hook-form';
import Container from '@/components/Layouts/container';

// SSR
export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/post/create`)
  const data = await res.json()

  return {
      props: {
          posts: data
      }
  }
}

const CreatePost = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [editorContent, setEditorContent] = useState()

  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const catArray = posts.category
  const seriesArray = posts.series

  const onPostForm = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post('/api/liondor/post/store', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  const onSubmit = useCallback((data) => {
    console.log(data)

    onPostForm({
      user_id: data.user_id,
      l_category_id: data.child_category,
      l_series_id: data.l_series_id,
      title: data.title,
      thumbs: data.thumbs[0],
      mv: data.mv[0],
      sub_title: data.sub_title,
      discription: data.discription,
      content: editorContent,
      state: data.state,
    })
  }, [onPostForm, editorContent])

  const [cat, setCat] = useState([catArray[0]])
  const handleCat = (e) => {
    setCat(catArray.filter((item) => {
      return item.id.toString() === e.target.value
    }))
  }

  const [state, setState] = useState(false)
  const handleState = useCallback(() => {
    setState((prevState) => !prevState)
  }, [])

  return (
    <section className={styles.createSection}>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" defaultValue="1" {...register("user_id")} />
          <select {...register("l_category_id")} onChange={handleCat}>
            {catArray.map((cat, index) => (
              <option value={index+1} key={index+1}>{cat.name}</option>
            ))}
          </select>
          <select {...register("child_category")}>
            {cat[0].child_category.map((cat) => (
              <option value={cat.id} key={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select {...register("l_series_id")}>
            {seriesArray.map((series, index) => (
              <option value={index+1} key={index+1}>{series.name}</option>
            ))}
          </select>
          <label htmlFor="title">タイトル</label>
          <input type="text" id="title" {...register("title", { required: state })} />
          {errors.title && <p className="red">必須項目を入力してください</p>}
          <input type="file" accept="image/*" {...register("thumbs", { required: state })} />
          {errors.thumbs && <p className="red">必須項目を入力してください</p>}
          <input type="file" accept="image/*" {...register("mv", { required: state })} />
          {errors.mv && <p className="red">必須項目を入力してください</p>}
          <textarea {...register("sub_title", { required: state })}></textarea>
          {errors.sub_title && <p className="red">必須項目を入力してください</p>}
          <textarea {...register("discription", { required: state })}></textarea>
          {errors.discription && <p className="red">必須項目を入力してください</p>}
          <div>エディター</div>
          <PostEditor setEditorContent={setEditorContent} />
          <select {...register("state")} onChange={handleState}>
            <option value="0">下書き</option>
            <option value="1">公開済み</option>
          </select>
          <button>新規作成</button>
        </form>
      </Container>
    </section>
  );
}

export default CreatePost;