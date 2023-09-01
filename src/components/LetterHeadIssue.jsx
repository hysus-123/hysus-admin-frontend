import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 , mt:2}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Letter Head Issue By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="LetterHead Issue By"
          onChange={handleChange}
        >
          <MenuItem value={10}>abc</MenuItem>
          <MenuItem value={20}>xyz</MenuItem>
          <MenuItem value={30}>pqr</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
