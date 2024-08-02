import "./styleSheets/SearchStyles.css";

/**
 * Search
 *
 * This function creates a search bar that can be used.
 * The 'handler' prop determines what should happen when
 * the search value is changed.
 *
 * @author Owen Gittins
 */

function Search(props) {
  const onChange = (event) => props.handler(event.target.value);

  return (
    <div className="searchContainer">
      <input
        value={props.searchTerm}
        onChange={onChange}
        id="defaultValue"
        placeholder={props.default}
        className="searchBar"
      />
      {props.searchTerm && (
        <span className="searchClear" onClick={props.handleSearchClear}>
          &#10005;
        </span>
      )}
    </div>
  );
}
export default Search;
