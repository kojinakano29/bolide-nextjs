import axios from '@/lib/liondor/axios'; // カスタムフック
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw, convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(mod => mod.Editor),
  { ssr: false }
)

const PostEditor = ({setEditorContent, content, edit = false}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

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

    return await axios.post('/api/liondor/post/imagesave', data)
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
        placeholder="本文"
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