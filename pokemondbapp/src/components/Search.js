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
    <div>
      <input  value={props.searchTerm} onChange={onChange} id="defaultValue" placeholder={props.default}/>
    </div>
    )

  }
  export default Search;