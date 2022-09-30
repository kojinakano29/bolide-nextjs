import styles from '@/styles/components/CreatePost.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useRef, useState } from 'react'
import { PostEditor } from '@/components';

// SSG
// export const getStaticProps = async () => {
//   const res = await fetch(`${process.env.API_DOMAIN}/api/liondor/post/create`)
//   const data = await res.json()

//   return {
//     props: {
//       posts: data
//     }
//   }
// }

// SSR
export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.API_DOMAIN}/api/liondor/post/create`)
  const data = await res.json()

  return {
      props: {
          posts: data
      }
  }
}

const CreatePost = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const userIdRef = useRef(null)
  const catIdRefs = useRef(null)
  const catChildIdRefs = useRef(null)
  const seriesIdRefs = useRef(null)
  const ttlRefs = useRef(null)
  const thumbRefs = useRef(null)
  const mvRefs = useRef(null)
  const subTtlRefs = useRef(null)
  const discRefs = useRef(null)
  const stateRefs = useRef(null)

  const onPostForm = useCallback(async(data) => {
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

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault()
    onPostForm({
      user_id: userIdRef.current.value,
      l_category_id: catChildIdRefs.current.value,
      l_series_id: seriesIdRefs.current.value,
      title: ttlRefs.current.value,
      thumbs: thumbRefs.current.files[0],
      mv: mvRefs.current.files[0],
      sub_title: subTtlRefs.current.value,
      discription: discRefs.current.value,
      content: editorContent,
      state: stateRefs.current.value,
    })
  }, [onPostForm])

  const log = () => {
    console.log(userIdRef.current.value);
    console.log(catIdRefs.current.value);
    console.log(catChildIdRefs.current.value);
    console.log(seriesIdRefs.current.value);
    console.log(ttlRefs.current.value);
    console.log(thumbRefs.current.files[0]);
    console.log(mvRefs.current.files[0]);
    console.log(subTtlRefs.current.value);
    console.log(discRefs.current.value);
    console.log(editorContent)
    console.log(stateRefs.current.value);
  }

  const [cat, setCat] = useState([posts.category[0]])
  const handleCat = (e) => {
    setCat(posts.category.filter((item) => {
      return item.id.toString() === e.target.value
    }))
  }

  const [editorContent, setEditorContent] = useState()

  return (
    <section className={styles.createSection}>
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="user_id" value="1" ref={userIdRef} onChange={log} />
        <select name="l_category_id" ref={catIdRefs} onChange={handleCat}>
          {posts.category.map((cat, index) => (
            <option value={index+1} key={index+1}>{cat.name}</option>
          ))}
        </select>
        <select name="child_category" ref={catChildIdRefs} onChange={log}>
          {cat[0]?.child_category?.map((cat) => (
            <option value={cat.id} key={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select name="l_series_id" ref={seriesIdRefs} onChange={log}>
          {posts.series.map((series, index) => (
            <option value={index+1} key={index+1}>{series.name}</option>
          ))}
        </select>
        <input type="text" name="title" ref={ttlRefs} onChange={log} />
        <input type="file" name="thumbs" accept="image/*" ref={thumbRefs} onChange={log} />
        <input type="file" name="mv" accept="image/*" ref={mvRefs} onChange={log} />
        <textarea name="sub_title" ref={subTtlRefs} onChange={log}></textarea>
        <textarea name="discription" ref={discRefs} onChange={log}></textarea>
        <div>エディター</div>
        <PostEditor setEditorContent={setEditorContent} />
        <select name="state" ref={stateRefs} onChange={log}>
          <option value="0">下書き</option>
          <option value="1">公開済み</option>
        </select>
        <button>新規作成</button>
      </form>
    </section>
  );
}

export default CreatePost;