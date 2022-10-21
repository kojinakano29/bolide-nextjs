import styles from '@/styles/liondor/components/showEditor.module.scss'
import { convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { useState } from "react";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(mod => mod.Editor),
  { ssr: false }
)

const ShowEditor = ({posts}) => {
  const content = posts.posts.content
  const [editorState, setEditorState] = useState(() => {
    if (content) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    } else {
      return EditorState.createEmpty()
    }
  })

  return (
    <div className={styles.editorBody}>
      <Editor
        editorState={editorState}
        toolbarHidden
        readOnly
        localization={{ locale: "ja" }}
      />
    </div>
  )
}

export default ShowEditor;