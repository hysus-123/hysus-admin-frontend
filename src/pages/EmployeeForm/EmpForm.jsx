import React from 'react'
import EmployeeForm from '../../components/Form/EmployeeForm';
import SideBar from '../Sidebar/Sidebar';
import { Box } from '@mui/material';

const EmpForm = () => {
  return (
    <>
      <Box sx={{display:'flex'}}>   
      <SideBar/>     
      <EmployeeForm/>
      </Box>
    </>
    
  )
}

export default EmpForm;
