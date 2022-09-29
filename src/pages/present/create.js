import styles from '@/styles/components/createPresent.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { createRef, useCallback, useRef } from 'react';

const CreatePresent = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const imageRef = useRef(null)
  const txtInput = [
    {name: 'title', type: 'text'},
    {name: 'offer', type: 'text'},
    {name: 'limit', type: 'date'},
  ]
  const txtRefs = useRef(txtInput.map(() => createRef(null)))

  const onPostForm = useCallback(async(data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post('/api/liondor/present/store', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => console.log(res))
  }, [])

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault()
    onPostForm({
      thumbs: imageRef.current.files[0],
      title: txtRefs.current[0].current.value,
      offer: txtRefs.current[1].current.value,
      limit: txtRefs.current[2].current.value,
    })
  }, [onPostForm])

  return (
    <section className={styles.createSection}>
      <form onSubmit={onSubmitHandler}>
        <input type="file" accept="image/*" ref={imageRef} />
        {txtInput.map((input, index) => (
          <input type={input.type} name={input.name} ref={txtRefs.current[index]} key={index} />
        ))}
        <button>新規作成</button>
      </form>
    </section>
  );
}

export default CreatePresent;