import styles from '@/styles/components/createSidebar.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useRef, useState } from 'react'
import { SidebarEditor } from '@/components';

const CreateSidebar = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [editorContent, setEditorContent] = useState()

  const ttlRefs = useRef(null)
  const orderRefs = useRef(null)
  const stateRefs = useRef(null)

  const onPostForm = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post('/api/liondor/sidebar/store', params, {
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
      title: ttlRefs.current.value,
      content: editorContent,
      order: orderRefs.current.value,
      state: stateRefs.current.value
    })
  }, [onPostForm, editorContent])

  return (
    <section className={styles.createSection}>
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="title" ref={ttlRefs} />
        <div>エディター</div>
        <SidebarEditor setEditorContent={setEditorContent} />
        <input type="number" name="order" ref={orderRefs} />
        <select name="state" ref={stateRefs}>
          <option value="0">下書き</option>
          <option value="1">公開済み</option>
        </select>
        <button>新規作成</button>
      </form>
    </section>
  );
}

export default CreateSidebar;