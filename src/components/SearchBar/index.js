import React, { useState } from 'react';
import { searchTrack } from '../../lib/fetchApi';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

function SearchBar({ accessToken, onSuccess }) {
    const [text, setText] = useState('');
  
    const handleInput = (e) => {
      setText(e.target.value);
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await searchTrack(text, accessToken);
  
        const tracks = response.tracks.items;
        onSuccess(tracks);
      } catch (e) {
        alert(e);
      }
    }
  
    return (
      <div>
        <form className="form-search" onSubmit={handleSubmit}>
        <TextField
            className="form-search__input"
            id="search-input"
            defaultValue="Default Value"
            variant="outlined"
            placeholder="Search..."
            required
            value={text}
            onChange={handleInput}
         />
        <Button 
            className="form-search_button"
            variant="contained" 
            type="submit"
            color="primary"
            disableElevation 
        >
            Search
        </Button>
        </form>
      </div>
    )
  }
  
  export default SearchBar;