import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loader = () => {
    return (
        <div className="loader-icon">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
    )
}

export default Loader
