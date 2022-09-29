import styles from '@/styles/components/search.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Search = ({humOpen}) => {
  return (
    <div className={styles.iconBox}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        style={humOpen ? {color: "#fff"} : {color: "#000"}}
      />
    </div>
  );
}

export default Search;