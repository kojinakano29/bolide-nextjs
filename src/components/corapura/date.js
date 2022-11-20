import { parseISO, format } from 'date-fns'

const Date = ({ dateString }) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'yyyy.MM.dd')}</time>
}

export default Date