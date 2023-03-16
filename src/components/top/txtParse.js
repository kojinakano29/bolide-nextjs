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

const TxtParse = ({ value = "" }) => {
  return (
    value ?
      parse(value, {replace})
    : null
  )
}

export default TxtParse;