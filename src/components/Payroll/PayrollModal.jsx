import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Modal, TextField} from '@mui/material';
import Add from '@mui/icons-material/Add';
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
  const [annual_package, setAnnual_package] = useState(newrow ? newrow.annual_package : 0);
  const [basic_salary, setBasic_salary] = useState(newrow ? newrow.basic_salary : 0);
  const [joining_bonus, setJoining_bonus] = useState(newrow ? newrow.joining_bonus : 0);
  const [assets, setAssets] = useState(newrow ? newrow.assets : '');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const id = props.passId;


  const addSalary = (id) =>{
    const payrollData = {
        annual_package,
        basic_salary,
        joining_bonus,
        assets
      }
    axios.patch(`${base_url}/payroll/${id}`, payrollData)
    .then((response)=>{
        console.log(response);
        setOpen(false);
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" sx={{backgroundColor:'#2E3B55',borderRadius:'20px', marginRight:'10px'}}>
      <Add/>Add 
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-package" sx={{ mt: 2 }}>
            <TextField
              label="Enter Annual Package"
              style={{ width: '100%' }}
              value={annual_package}
              onChange={(e) => setAnnual_package(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-basic-salary" sx={{ mt: 2 }}>
            <TextField
              label="Enter Basic Pay(in month)"
              style={{ width: '100%' }}
              value={basic_salary}
              onChange={(e) => setBasic_salary(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-joining_bonus" sx={{ mt: 2 }}>
            <TextField
              label="Enter Joining Bonus"
              style={{ width: '100%' }}
              value={joining_bonus}
              onChange={(e) => setJoining_bonus(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-assets" sx={{ mt: 2 }}>
            <TextField
              label="Enter Any Assets"
              style={{ width: '100%' }}
              value={assets}
              onChange={(e) => setAssets(e.target.value)}
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
