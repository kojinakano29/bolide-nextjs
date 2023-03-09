import { parseISO, format } from 'date-fns'

const Date = ({ dateString }) => {
  const date = parseISO(dateString)

  return (
    <>
      {dateString ?
        <time dateTime={dateString}>{format(date, 'yyyy年MM月dd日')}</time>
      : null}
    </>
  )
}

export default Date