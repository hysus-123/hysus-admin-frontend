import React, { useEffect, useState } from 'react'
import { Box, Card, Typography, Container, Button , TextField, Modal} from '@mui/material'
import SideBar from '../../pages/Sidebar/Sidebar';
import axios from 'axios';
import LeaveTypeTable from './LeaveTypeTable';

const LeaveStatus = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [leaveData , setLeaveData] = useState({
    type: "",
    leave_code: "",
    description:"",
  })

  const base_url = process.env.REACT_APP_BASE_URL

  const handleModalClose = () => {
    setModalOpen(false);
  };
  
  const handleLeaveType = () =>{
    setModalOpen(true);
  }

  const submitLeaveTypes = () =>{
    
    axios.post(`${base_url}/leavetype`, leaveData)
    .then((response)=>{
      console.log(response);
      setLeaveData({
        type:"",
        leave_code:"",
        description:""
      })
      handleModalClose();
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setLeaveData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <>
        <Container sx={{mt:2}}>
          <Card>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <Typography variant='h5' sx={{p:3}}>Leave Types</Typography>
              <Button variant='contained' color='secondary' sx={{m:3}} onClick={handleLeaveType}>Add Leave Type</Button>
            </div>
            <LeaveTypeTable/>
          </Card>
        </Container>

        <Modal open={modalOpen} onClose={handleModalClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Card sx={{p:3}}>
          <TextField
            label="Type"
            name="type"
            sx={{mt:2}}
            value={leaveData.type}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Leave Code"
            name="leave_code"
            sx={{mt:2}}
            value={leaveData.leave_code}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            sx={{mt:2}}
            value={leaveData.description}
            onChange={handleInputChange}
            fullWidth
          />
          <Button variant='contained' sx={{mt:2}} onClick={submitLeaveTypes}>Save Changes</Button>
        </Card>
        </div>
      </Modal>
    </>
  )
}

export default LeaveStatus
