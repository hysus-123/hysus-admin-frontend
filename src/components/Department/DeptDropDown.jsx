import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Modal, TextField} from '@mui/material';
import Add from '@mui/icons-material/Add';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const style = {
  position: 'absolute',
  top: '35%',
  left: '85%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const base_url = process.env.REACT_APP_BASE_URL

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [dept, setDept] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  
  const addDepartment = () =>{
    const deptData = {
        department: dept,
      }
    axios.post(`${base_url}/department`, deptData)
    .then((response)=>{
        console.log(response);
        deptData={
          department: ''
        }
        setOpen(false);
        setSnackbarMessage('Department created successfully');
        setSnackbarOpen(true);
    })
    .catch((err)=>{
          console.log(err, "error");
          console.log(err.error, "err.error")
          setSnackbarMessage('error');
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
      <Button onClick={handleOpen} variant="contained" sx={{backgroundColor:'#2E3B55',borderRadius:'20px', marginRight:'10px'}}>
      <Add/>Add Department
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              placeholder="Enter new department"
              style={{ height: '100%' }}
              value={dept}
              required
              onChange={(e) => setDept(e.target.value)}
            />
          </Typography>

          <Button
            variant="contained"
            sx={{ display: 'inline-block', float: 'right', mt: 3 }}
            onClick={addDepartment}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
