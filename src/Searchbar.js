import React from 'react';
import { Grid, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const Searchbar = ({ value, onChange }) => {
  return (
    <Grid item style={{ marginBottom: "25px", marginTop: "20px" }}>
      <TextField
        variant="outlined"
        placeholder="Search"
        fullWidth
        defaultValue={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default Searchbar;