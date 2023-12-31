import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Modal, TextField , FormControlLabel, FormGroup, Checkbox} from '@mui/material';
import Add from '@mui/icons-material/Add';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
  // const [annual_package, setAnnual_package] = useState(newrow ? newrow.annual_package : 0);
  // const [basic_salary, setBasic_salary] = useState(newrow ? newrow.basic_salary : 0);
  // const [joining_bonus, setJoining_bonus] = useState(newrow ? newrow.joining_bonus : 0);
  const [assets, setAssets] = useState(newrow ? newrow.assets : '');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const id = props.passId;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setSnackbarOpen(false);
  };


  const addSalary = (id) =>{
    const payrollData = {
        gross_salary,
        assets,
        includePF, 
        includeESIC
      }
      console.log(payrollData);
    axios.patch(`${base_url}/payroll/${id}`, payrollData)
    .then((response)=>{
        console.log(response);
        setOpen(false);
        setSnackbarMessage('Payroll Salary Added successfully');
        setSnackbarOpen(true);
        props.fetchEmpData();
    })
    .catch((err)=>{
          console.log(err);
          setSnackbarMessage('Error submitting attendance');
          setSnackbarOpen(true);
    })
  }

  return (
    
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Button onClick={handleOpen} variant="contained" sx={{backgroundColor:'#2E3B55',borderRadius:'20px', marginRight:'10px'}} size='small'>
      <Add/>Edit 
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-salary" sx={{ mt: 2 }}>
            <TextField
              label="Enter Gross Salary(in months)"
              style={{ width: '100%' }}
              value={gross_salary}
              onChange={(e) => setGross_salary(e.target.value)}
            />
          </Typography>
          {/* <Typography id="modal-modal-package" sx={{ mt: 2 }}>
            <TextField
              label="Enter Annual Package"
              style={{ width: '100%' }}
              value={annual_package}
              onChange={(e) => setAnnual_package(e.target.value)}
            />
          </Typography> */}
          {/* <Typography id="modal-modal-basic-salary" sx={{ mt: 2 }}>
            <TextField
              label="Enter Basic Pay(in month)"
              style={{ width: '100%' }}
              value={basic_salary}
              onChange={(e) => setBasic_salary(e.target.value)}
            />
          </Typography> */}
          {/* <Typography id="modal-modal-joining_bonus" sx={{ mt: 2 }}>
            <TextField
              label="Enter Joining Bonus"
              style={{ width: '100%' }}
              value={joining_bonus}
              onChange={(e) => setJoining_bonus(e.target.value)}
            />
          </Typography> */}
          <Typography id="modal-modal-assets" sx={{ mt: 2 }}>
            <TextField
              label="Enter Any Assets"
              style={{ width: '100%' }}
              value={assets}
              onChange={(e) => setAssets(e.target.value)}
            />
          </Typography>

          <FormGroup>
            <FormControlLabel control={<Checkbox 
            checked={includePF} // Bind the checked property to the state variable
            onChange={(e) => setIncludePF(e.target.checked)}
            /> 
            }
            label="want to include PF" />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox 
            checked={includeESIC} // Bind the checked property to the state variable
            onChange={(e) => setIncludeESIC(e.target.checked)}
            /> 
            }
            label="want to include ESIC" />
          </FormGroup>

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
