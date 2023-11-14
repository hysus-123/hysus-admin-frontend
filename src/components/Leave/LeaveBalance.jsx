import React, {useEffect, useState} from 'react';
import { Typography, Card, Button, Modal,MenuItem,
    Select,
    FormControl,
    InputLabel ,TextField } from '@mui/material';
import axios from 'axios';

const LeaveBalance = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [employee, setEmployee]= useState([]);
    const [leaveType, setLeaveType] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [balance, setBalance] = useState('');

    useEffect(()=>{
        fetchEmployee();
        fetchLeaveType();
    },[])

    const base_url = process.env.REACT_APP_BASE_URL;

    const fetchEmployee = () =>{
        axios.get(`${base_url}/employee`)
        .then((response)=>{
            console.log(response);
            setEmployee(response.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const fetchLeaveType = () =>{
        axios.get(`${base_url}/leavetype`)
        .then((response)=>{
            console.log(response);
            setLeaveType(response.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleModalClose = () => {
        setModalOpen(false);
      };

      const handleLeave = () =>{
        setModalOpen(true);
      }

      const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
      };
    
      const handleLeaveTypeChange = (event) => {
        setSelectedLeaveType(event.target.value);
      };

      const handleBalanceChange = (event) => {
        setBalance(event.target.value);
      };
    
      const handleSaveChanges = () => {
        console.log('Selected Employee:', selectedEmployee);
        console.log('Selected Leave Type:', selectedLeaveType);
        console.log('Selected balance:', balance);
        const balanceInt = parseInt(balance, 10);

        const balanceObj = {
            leave_type: selectedLeaveType,
            balance: balanceInt
        }
        console.log(balanceObj, "balanceObj");

        axios.post(`${base_url}/leave-balance/${selectedEmployee}`, balanceObj)
        .then((response)=>{
            console.log(response);
            setModalOpen(false);
        })
        .catch((err)=>{
            console.log(err);
        })

      };

  return (
    <>
     <Card>
        <Typography>
            <Button variant='contained' sx={{m:4}}  onClick={handleLeave}>Add Balance</Button>
        </Typography>

        <Modal open={modalOpen} onClose={handleModalClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Card sx={{p:3}}>
        <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id='employee-label'>Select Employee</InputLabel>
                <Select
                  labelId='employee-label'
                  id='employee-select'
                  value={selectedEmployee}
                  onChange={handleEmployeeChange}
                >
                  {employee.map((emp) => (
                    <MenuItem key={emp.id} value={emp.id}>
                      {emp.employee_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id='leave-type-label'>Select Leave Type</InputLabel>
                <Select
                  labelId='leave-type-label'
                  id='leave-type-select'
                  value={selectedLeaveType}
                  onChange={handleLeaveTypeChange}
                >
                  {leaveType.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Balance"
                name="balance"
                sx={{mt:2}}
                value={balance}
                onChange={handleBalanceChange}
                fullWidth
            />
          <Button variant='contained' sx={{mt:2}} onClick={handleSaveChanges}>Save Changes</Button>
        </Card>
        </div>
      </Modal>
    </Card> 

    <Card>
        <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id='employee-label'>Select Employee</InputLabel>
                <Select
                  labelId='employee-label'
                  id='employee-select'
                  value={selectedEmployee}
                  onChange={handleEmployeeChange}
                >
                  {employee.map((emp) => (
                    <MenuItem key={emp.id} value={emp.id}>
                      {emp.employee_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
    </Card>
    </>
  );
}

export default LeaveBalance;
