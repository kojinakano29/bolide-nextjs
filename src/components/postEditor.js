import axios from '@/lib/axios'; // カスタムフック
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw, convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(mod => mod.Editor),
  { ssr: false }
)

const PostEditor = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [editorState, setEditorState] = useState()

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }

  const handleImageUpload = useCallback(async (file) => {
    await csrf()

    const data = new FormData();
    data.append('image', file)

    await axios.post('/api/liondor/post/imagesave', data)
    .then((res) => {
      console.log(res)
      // const link = `${process.env.API_DOMAIN_IMAGE_PATH}/`
      return {data: {link: res}}
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  // const onSave = async (ContentState) => {
  //   const Object = convertToRaw(ContentState)
  //   const data = JSON.stringify(Object)
  //   console.log(data)
  // }

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        placeholder="Writting Here!!"
        editorStyle={{
          boxSizing: "border-box",
          border: "1px solid #ddd",
          cursor: "text",
          padding: "16px",
          borderRadius: "2px",
          marginBottom: "2em",
          boxShadow: "inset 0px 1px 8px -3px #ababab",
          background: "#fefefe",
          // minHeight: editorMinHeight,
        }}
        localization={{ locale: "ja" }}
        toolbar={{
          options: ["inline", "blockType", "list", "textAlign", "link", "image", "history"],
          inline: {
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
            ],
          },
          list: {
            options: ["unordered", "ordered"],
          },
          textAlign: {
            options: ["center"],
          },
          image: {
            uploadCallback: handleImageUpload,
            alt: { present: true, mandatory: true },
            previewImage: true,
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