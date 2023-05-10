import { parseISO, format } from 'date-fns'

const DateFormat = ({ dateString }) => {
    const date = parseISO(dateString)

    return (
        <>
            {dateString ? (
                <time dateTime={dateString}>
                    {format(date, 'yyyy年MM月dd日')}
                </time>
            ) : null}
        </>
    )
}

export default DateFormat
