import axios from '@/lib/axios'; // カスタムフック
import { useEffect, useRef, useState } from "react";

const PostEditor = ({
  handleChange,
  value = "",
  uploadPath,
  matter = false,
  release = false,
  salon = false,
}) => {
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

  let placeholder = null
  if (matter) {
    placeholder = `■条件
案件に応募してほしい方の希望条件を書きましょう！例を参考に記入ください。

・フォロワー数が2000人以上の方限定

・25歳以上の方限定

・21時以降も連絡が取れる方限定

■依頼内容の詳細
案件の詳しい内容を伝えましょう！どんな人に何をお願いしたいのか等…できるだけ詳しく書くと応募者が集まりやすいです！

商品発売、創作活動の宣伝をしたいのでご協力いただける方がいましたらお願いしたいです。
尚、SNSなどでの拡散は、商品の購入に興味がある方に効果的な方法をお持ちの方に限らせていただきます。
【参考URL】
https://example.jp/

■仕事の流れ
応募者に案件の流れを伝えましょう！例参考に記入ください。

（例）
①まずはZOOMで打合せを行います！新製品についての詳しい説明をさせていただきます♪
②その後サンプルをお渡し（ご自宅まで郵送）…

`
  } else if (release) {
    placeholder = "こちらにご入力ください"
  } else if (salon) {
    placeholder = `■活動内容
案件に応募してほしい方の希望条件を書きましょう！例を参考に記入ください。

・フォロワー数が2000人以上の方限定

・25歳以上の方限定

・21時以降も連絡が取れる方限定

■詳細
案件の詳しい内容を伝えましょう！どんな人に何をお願いしたいのか等…できるだけ詳しく書くと応募者が集まりやすいです！

商品発売、創作活動の宣伝をしたいのでご協力いただける方がいましたらお願いしたいです。

尚、SNSなどでの拡散は、商品の購入に興味がある方に効果的な方法をお持ちの方に限らせていただきます。

【参考URL】
https://example.jp/

`
  }

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          editor={CustomEditor}
          data={value}
          config={{
            extraPlugins: [uploadPlugin],
            placeholder: placeholder,
            mediaEmbed: {
              previewsInData: true,
            },
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