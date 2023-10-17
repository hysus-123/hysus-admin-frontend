import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Modal, FormControlLabel, FormGroup, Checkbox} from '@mui/material';
import Add from '@mui/icons-material/Add';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const base_url = process.env.REACT_APP_BASE_URL

export default function BasicModal(props) {
  const newrow = props.newrow;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2023);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);

  };

  const id = props.passId;
  const emp_id = props.emp_id;

  const addSalary = (id, emp_id) =>{
    console.log(id);
    console.log(month, year);

    const salaryData = {
      emp_id,
      month, 
      year
    }
    axios.post(`${base_url}/salary/${id}`,salaryData)
    .then((response)=>{
      console.log(response.data);
      handleClose();
    })
    .catch((err)=>{
      console.log(err);
    })
   
  }   

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" sx={{backgroundColor:'#2E3B55',borderRadius:'20px', marginRight:'10px'}} size='small'>
      <Add/>Create 
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
        <Typography>
          <label>
            Month:
            <input type="number" value={month} onChange={handleMonthChange} />
          </label>
          <br />
          <label>
            Year:
            <input type="number" value={year} onChange={handleYearChange} />
          </label>
          <br />
          <p>You selected: Month {month} and Year {year}</p>
        </Typography>
          
          <Button
            variant="contained"
            sx={{ display: 'inline-block', float: 'right', mt: 3 }}
            onClick={()=>addSalary(id, emp_id)}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
