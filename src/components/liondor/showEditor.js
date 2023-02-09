import parse, { domToReact } from 'html-react-parser'

const replace = (node) => {
  if (node.name === 'a') {
    return (
      <a {...node.attribs} rel="noreferrer">
        { domToReact(node.children) }
      </a>
    )
  }
}

const ShowEditor = ({ value = "" }) => {
  return (
    <div className="ck-content">
      {value ?
        parse(value, {replace})
      : null}
    </div>
  )
}

export default ShowEditor;