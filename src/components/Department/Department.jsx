import React from 'react'
import { Box, Container, Typography, Card, Button, Grid} from '@mui/material'
import SideBar from '../../pages/Sidebar/Sidebar';
import DeptTable from './DeptTable';
import axios from 'axios';
import { useEffect } from 'react';
import DeptDropDown from './DeptDropDown';
import { useState } from 'react';

const Department = () => {
  const base_url = process.env.REACT_APP_BASE_URL
  const [department, setDepartment] = useState([])

  useEffect(()=>{
    fetchDepartment();
  },[])

  const fetchDepartment = () =>{
    axios.get(`${base_url}/department`)
    .then((response)=>{
      console.log(response.data);
      setDepartment(response.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <>
      <Box sx={{display: 'flex', backgroundColor:'#ded9d9'}}>
        <SideBar/>
        <Container sx={{mt:2}}>

          <Card>
            <Typography sx={{textAlign:'center', fontFamily:'poppins'}} variant='h5'>Departments</Typography>
            <div style={{display:'flex', justifyContent:'end'}}>
              <DeptDropDown/>
            </div>
            
            <div style={{padding:'4%'}}>
              Departments Names
              <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap'}}>
              {department.map((dept) => (
                <Button key={dept.id} variant='contained' sx={{ backgroundColor: '#2E3B55' }}>
                  {dept.department}
                </Button>
              ))}
                
              </div>
            </div>
          </Card>

          <Card sx={{mt:2}}>
            <DeptTable/> 
          </Card>
        </Container>
        </Box>
    </>
  )
}

export default Department
