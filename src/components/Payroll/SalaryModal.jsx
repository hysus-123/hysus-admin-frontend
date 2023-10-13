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
  const [includePF, setIncludePF] = useState(false);
  const [includeESIC, setIncludeESIC] = useState(false);
  const [gross_salary, setGross_salary] = useState(newrow ? newrow.gross_salary : 0);
  const [assets, setAssets] = useState(newrow ? newrow.assets : '');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
  };

  const id = props.passId;

  const addSalary = (id) =>{
    console.log(id);
    console.log(selectedDate);
    // const salaryData = {
        
    //   }
    // axios.patch(`${base_url}/payroll/${id}`, salaryData)
    // .then((response)=>{
    //     console.log(response);
    //     setOpen(false);
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
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
          <TextField
            id="month-year-picker"
            label="Month and Year"
            type="month"
            value={selectedDate.toISOString().substr(0, 7)}
            onChange={handleDateChange}
            InputLabelProps={{
                shrink: true,
            }}
            fullWidth
            />
          </Typography>
          
          
          <Button
            variant="contained"
            sx={{ display: 'inline-block', float: 'right', mt: 3 }}
            onClick={()=>addSalary(id)}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
