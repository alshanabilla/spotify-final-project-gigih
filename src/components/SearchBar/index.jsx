import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { searchTrack } from '../../lib/fetchApi';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function SearchBar({ onSuccess }) {
    const accessToken = useSelector((state) => state.auth.accessToken);
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
              id="form-search_input"
              variant="outlined"
              placeholder="Search..."
              required
              value={text}
              onChange={handleInput}
              data-testid="form-search_input"
          />
          <Button 
              className="form-search_button"
              variant="contained" 
              type="submit"
              color="primary"
              disableElevation 
              data-testid="form-search_button"
          >
              Search
          </Button>
        </form>
      </div>
    )
  }
  
  export default SearchBar;
