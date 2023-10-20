import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Modal, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import Add from '@mui/icons-material/Add';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const base_url = process.env.REACT_APP_BASE_URL

export default function BasicModal({department}) {
  const [open, setOpen] = useState(false);
  const [dept, setDept] = useState('');
  const [deptt, setDeptt] = useState('');
  const [position, setPosition] = useState('');
  const [level, setLevel] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLevelChange = (event) => {
    const newLevel = parseInt(event.target.value, 10);
    setLevel(newLevel);
  };

  console.log(department, "setDepartment");
  const addDesignation = () =>{
    const desigData = {
        department: deptt,
        position,
        level,
      }

      axios.post(`${base_url}/designation`,desigData)
      .then((response)=>{
        console.log("add new designation");
        console.log(response.data);
      })
      .catch((err)=>{
        console.log(err);
      })
    
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" sx={{backgroundColor:'#2E3B55',borderRadius:'20px', marginRight:'10px'}}>
      <Add/>Add Designation
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography>
            <FormControl fullWidth variant='outlined'>
              <InputLabel id="department">Department</InputLabel>
          <Select
              fullWidth
              label="Department"
              name="department"
              value={deptt}
              onChange={(e)=> setDeptt(e.target.value)}
              
            >
              {department.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.department}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
            </Typography>
          <Typography id="modal-modal-level" sx={{ mt: 2 }}>
            <TextField
              label="Enter level"
              style={{ height: '100%' }}
              value={level}
              required
              onChange={handleLevelChange}
            />
          </Typography>
          <Typography id="modal-modal-desgination" sx={{ mt: 2 }}>
            <TextField
              label="Enter new designation"
              style={{ height: '100%' }}
              value={position}
              required
              onChange={(e) => setPosition(e.target.value)}
            />
          </Typography>

          <Button
            variant="contained"
            sx={{ display: 'inline-block', float: 'right', mt: 3 }}
            onClick={addDesignation}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
