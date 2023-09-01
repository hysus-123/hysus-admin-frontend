import React from 'react';
import EmpForm from '../components/Form';
import SideBar from './Sidebar/Sidebar';
import { Box, Container, Paper} from '@mui/material';

const Form = () => {
  return (
    <>
    <Box sx={{display: 'flex'}}>
      <SideBar/>
      <Container component={Paper} maxWidth="md" sx={{ mt: 2, p: 3 }}>
        <EmpForm/>
      </Container>
      
    </Box>
    </>
  );
}

export default Form;
