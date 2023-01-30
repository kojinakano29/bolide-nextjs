import axios from '@/lib/axios';
import { useEffect, useRef, useState } from "react";

const PostEditor = ({ handleChange, value = "", uploadPath }) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [editorLoaded, setEditorLoaded] = useState(false)
  const editorRef = useRef()
  const { CKEditor, CustomEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      CustomEditor: require("ckeditor5-custom-build/build/ckeditor")
    }

    setEditorLoaded(true)
  }, [])

  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return loader.file.then(file => new Promise((resolve, reject) => {
          csrf()

          const imageData = new FormData()
          imageData.append("image", file)

          axios.post(uploadPath, imageData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then((res) => {
            // console.log(res)
            resolve({default: `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${res.data}`})
          }).catch((e) => {
            // console.log(e)
            reject(e)
          })
        }))
      }
    }
  }

  const uploadPlugin = (editor) => {
    editor.plugins._plugins.get("FileRepository").createUploadAdapter = loader => {
      return uploadAdapter(loader)
    }
  }

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          editor={CustomEditor}
          data={value}
          config={{
            extraPlugins: [uploadPlugin],
            placeholder: "こちらに入力してください"
          }}
          onChange={(event, editor) => {
            const editorData = editor.getData()
            handleChange(editorData)
            // console.log(editorData)
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  )
}

export default PostEditor;