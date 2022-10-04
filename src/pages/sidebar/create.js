import styles from '@/styles/components/createSidebar.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useRef, useState } from 'react'
import { SidebarEditor } from '@/components';

const CreateSidebar = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [editorContent, setEditorContent] = useState()

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
      content: editorContent,
    })
  }, [onPostForm, editorContent])

  return (
    <section className={styles.createSection}>
      <form onSubmit={onSubmitHandler}>
        <div>エディター</div>
        <SidebarEditor setEditorContent={setEditorContent} />
        <button>新規作成</button>
      </form>
    </section>
  );
}

export default CreateSidebar;