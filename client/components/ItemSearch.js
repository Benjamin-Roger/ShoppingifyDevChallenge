import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import {useState} from 'react';

const ItemSearch = ({ handleFilterUpdate }) => {

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value.toLowerCase());
    handleFilterUpdate(e.target.value);
  };

  return (
    <div style={{ float: `right`, width: `350px`, margin: `10px` }}>
      <form noValidate autoComplete="off">
        <TextField
          style={{
            boxShadow: `rgba(0,0,0,.3) 5px 5px 5px`,
            width: `100%`,
            borderRadius: 4,
            backgroundColor: `#fff`
          }}
          value={value}
          onChange={handleChange}
          id="search-item"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }} />
      </form>
    </div>
  )
}

export default ItemSearch;