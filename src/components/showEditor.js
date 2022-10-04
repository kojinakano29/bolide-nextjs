import styles from '@/styles/components/showEditor.module.scss'
import { convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(mod => mod.Editor),
  { ssr: false }
)

const ShowEditor = ({posts}) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  useEffect(() => {
    const content = posts.posts.content

    if (content) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))))
    } else {
      setEditorState(EditorState.createEmpty())
    }
  }, [])

  return (
    <div className={styles.editorBody}>
      <Editor
        editorState={editorState}
        readOnly
        localization={{ locale: "ja" }}
        toolbar={{
          options: [],
        }}
      />
    </div>
  )
}

export default ShowEditor;