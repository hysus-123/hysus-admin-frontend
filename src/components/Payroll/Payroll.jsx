import React, {useEffect} from 'react'
import { Box, Container, Card, Typography } from '@mui/material'
import SideBar from '../../pages/Sidebar/Sidebar'
import PayrollTable from './PayrollTable';
import axios from 'axios';


const Payroll = () => {
  
  useEffect(()=>{
    fetchData();
  },[])
  
  const base_url = process.env.REACT_APP_BASE_URL;
  
  const fetchData = () =>{
    axios.get(`${base_url}/employee`)
    .then((response)=>{
      console.log(response);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  return (
    <>
      <Box sx={{display:'flex'}}>
        <SideBar/>
        <Container>
          <Card sx={{mt:2}}>
            <Typography sx={{textAlign:'center'}}>Payroll</Typography>
          </Card>
          <PayrollTable/>
        </Container>
      </Box>
    </>
  )
}

export default Payroll
