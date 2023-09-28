import React from 'react';
import Table from '../components/Table';
import { Container, Typography, Box} from '@mui/material';
import SideBar from './Sidebar/Sidebar';


const EmployeeList = () => {
  return (
    <>
      <Box sx={{display:'flex'}}>
        <SideBar/>
        <Container sx={{marginTop:'10px'}}>
            <Typography variant='h5' sx={{textAlign:'center',fontFamily:'cursive'}}>
                Employee List
            </Typography>
            <Table sx={{marginTop:'10px'}}/>
        </Container>
      </Box>
    </>
  );
}

export default EmployeeList;
