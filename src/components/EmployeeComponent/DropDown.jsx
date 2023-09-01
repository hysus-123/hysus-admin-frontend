import React , {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [leave, setLeave] = useState('');

  const handleChange = (event) => {
    setLeave(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Apply For Leave</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={leave}
          label="Leave"
          onChange={handleChange}
        >
          <MenuItem value={1}>Casual leave</MenuItem>
          <MenuItem value={2}>Sick leave</MenuItem>
          <MenuItem value={3}>Maternity leave</MenuItem>
          <MenuItem value={4}>Paternity leave</MenuItem>
          <MenuItem value={5}>Annual leave</MenuItem>
          <MenuItem value={6}>ULWP leave</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
