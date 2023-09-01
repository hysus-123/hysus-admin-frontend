import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Apply For Leave</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Casual leave</MenuItem>
          <MenuItem value={20}>Sick leave</MenuItem>
          <MenuItem value={30}>Maternity leave</MenuItem>
          <MenuItem value={40}>Paternity leave</MenuItem>
          <MenuItem value={50}>Annual leave</MenuItem>
          <MenuItem value={60}>ULWP leave</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
