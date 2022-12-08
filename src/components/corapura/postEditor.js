import axios from '@/lib/axios'; // カスタムフック
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw, convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(mod => mod.Editor),
  { ssr: false }
)

const PostEditor = ({
  setEditorContent,
  content,
  edit = false,
  matter = false,
  release = false,
  salon = false,
}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  let imageSave = null
  let placeholder = null
  if (matter) {
    imageSave = "/api/corapura/post/imagesave"
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
    imageSave = "/api/corapura/pr/imagesave"
  } else if (salon) {
    imageSave = "/api/corapura/salon/imagesave"
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

  const [editorState, setEditorState] = useState(() => {
    if (content !== "undefined" && edit) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    } else {
      return EditorState.createEmpty()
    }
  })

  if (edit) {
    useEffect(() => {
      const data = convertToRaw(editorState.getCurrentContent())
      const strData = JSON.stringify(data)
      setEditorContent(strData)
    }, [])
  }

  const onEditorStateChange = async (state) => {
    const data = convertToRaw(editorState.getCurrentContent())
    const strData = JSON.stringify(data)
    await setEditorContent(strData)
    await setEditorState(state)
  }

  const blockRendererFn = useCallback((contentBlock) => {
    if (contentBlock.getType() === "atomic") {
      const entityKey = contentBlock.getEntityAt(0)
      if (!entityKey) {
        return null
      }
      const entity = editorState.getCurrentContent().getEntity(entityKey)
      if (!entity) {
        return null
      }
      if (entity.getType() === "IMAGE") {
        const data = entity.getData()
        return {
          component: ImageComponent,
          editable: false,
          props: {
            src: data
          }
        }
      }
    }
    return null
  }, [])

  const ImageComponent = (props) => {
    return <img src={props.blockProps.src.src} alt={props.blockProps.src.alt} />
  }

  const handleImageUpload = useCallback(async (file) => {
    await csrf()

    const data = new FormData();
    data.append('image', file)

    return await axios.post(imageSave, data)
    .then((res) => {
      const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${res.data}`
      return {data: {link: link}}
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        blockRendererFn={blockRendererFn}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        placeholder={placeholder}
        editorStyle={{
          boxSizing: "border-box",
          border: "1px solid #000",
          cursor: "text",
          padding: "16px",
          minHeight: "400px",
        }}
        localization={{ locale: "ja" }}
        toolbar={{
          options: ["inline", "blockType", "fontSize", "list", "textAlign", "colorPicker", "link", "image", "history"],
          inline: {
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
            ],
          },
          blockType: {
            options: ['Normal', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
          },
          list: {
            inDropdown: true,
            options: ['unordered', 'ordered', 'indent', 'outdent'],
          },
          textAlign: {
            inDropdown: true,
            options: ['left', 'center', 'right'],
          },
          image: {
            uploadCallback: handleImageUpload,
            alt: { present: true, mandatory: true },
            previewImage: true,
            alignmentEnabled: false,
            inputAccept: 'image/webp,image/jpeg,image/jpg,image/png',
          },
          link: {
            options: ["link"],
          },
        }}
      />
    </div>
  )
}

export default PostEditor;