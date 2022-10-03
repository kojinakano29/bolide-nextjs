import { convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(mod => mod.Editor),
  { ssr: false }
)

const ShowEditor = ({posts}) => {
  const content = JSON.parse(posts.posts.content)
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  useEffect(() => {
    if (content) {
      setEditorState(EditorState.createWithContent(convertFromRaw(content)))
    } else {
      setEditorState(EditorState.createEmpty())
    }
  }, [])

  return (
    <div>
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