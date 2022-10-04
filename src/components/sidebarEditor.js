import axios from '@/lib/axios'; // カスタムフック
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw, convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(mod => mod.Editor),
  { ssr: false }
)

const SidebarEditor = ({setEditorContent}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

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

    return await axios.post('/api/liondor/sidebar/imagesave', data)
    .then((res) => {
      const link = `http://localhost:8000/storage/${res.data}`
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

export default SidebarEditor;