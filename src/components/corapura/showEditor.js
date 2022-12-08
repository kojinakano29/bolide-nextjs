import { convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { useState } from "react";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(mod => mod.Editor),
  { ssr: false }
)

const ShowEditor = ({data}) => {
  const content = data.content
  const [editorState, setEditorState] = useState(() => {
    if (content) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    } else {
      return EditorState.createEmpty()
    }
  })

  return (
    <Editor
      editorState={editorState}
      toolbarHidden
      readOnly
      localization={{ locale: "ja" }}
    />
  )
}

export default ShowEditor;