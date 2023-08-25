import React from 'react';
import Table from '../components/Table';
import { Container, Typography } from '@mui/material';

const EmployeeList = () => {
  return (
    <>

        <Container sx={{marginTop:'10px'}}>
            <Typography variant='h5' sx={{textAlign:'center'}}>
                EmployeeList
            </Typography>
            <Table sx={{marginTop:'10px'}}/>
        </Container>
    </>
  );
}

export default EmployeeList;
