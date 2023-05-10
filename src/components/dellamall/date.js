import { parseISO, format } from 'date-fns'

const DateFormat = ({ dateString }) => {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, 'yyyy.MM.dd')}</time>
}

export default DateFormat
