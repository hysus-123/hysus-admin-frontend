import React,{useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Modal, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({level, deptId,id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reportData, setReportData] = useState([]);
  const [emp_name, setEmp_name] = useState('');

//   useEffect(()=>{
//     fetchReportTo(level, deptId);
//   },[level, deptId])

  const base_url = process.env.REACT_APP_BASE_URL

  const fetchReportTo = (level, deptId) =>{
    setOpen(true);
    
    axios.get(`${base_url}/employee?level=${level}&deptId=${deptId}`)
    .then((response)=>{
        console.log(response, "from level and dept");
        setReportData(response.data);
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  const handleSubmit = (id) =>{
    const reportObj = {
        reported_to: emp_name
    }
    axios.patch(`${base_url}/employee/${id}`, reportObj)
    .then((response)=>{
        console.log(response);
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  return (
    <div>
      <Button color='secondary' variant='contained' onClick={()=>fetchReportTo(level,deptId)}>Report To</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <FormControl fullWidth size='small'>
              <InputLabel id="emp_name">Employee Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="emp_name"
                value={emp_name}
                label="Employee Name"
                
                onChange={(e)=>setEmp_name(e.target.value)}
              >
                {reportData.map((type)=>(
                  <MenuItem value={type.id}>{type.employee_name}</MenuItem>
                ))}
                
              </Select>
            </FormControl>
          </Typography>
          <Button variant='contained' onClick={()=>handleSubmit(id)}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
