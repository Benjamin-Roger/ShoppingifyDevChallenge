import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const ItemSearch = () => (
  <div style={{ float: `right`, width: `350px`, margin: `10px` }}>
    <form noValidate autoComplete="off">
      <TextField
        style={{
          boxShadow: `rgba(0,0,0,.3) 5px 5px 5px`,
          width: `100%`,
          borderRadius: 4,
          backgroundColor: `#fff`
        }}
        id="search-item"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        }} />
    </form>
  </div>
)

export default ItemSearch;