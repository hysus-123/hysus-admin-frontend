import React from 'react'
import { Box, Container, Typography, Card, Button, Grid} from '@mui/material'
import SideBar from '../../pages/Sidebar/Sidebar';
import Add from '@mui/icons-material/Add';
import DeptTable from './DeptTable';

const Department = () => {
  return (
    <>
      <Box sx={{display: 'flex', backgroundColor:'#ded9d9'}}>
        <SideBar/>
        <Container sx={{mt:2}}>

          <Card>
            <Typography sx={{textAlign:'center', fontFamily:'poppins'}} variant='h5'>Departments</Typography>
            <div style={{display:'flex', justifyContent:'end'}}>
              <Button variant="contained" sx={{backgroundColor :'#2E3B55',  borderRadius:'20px', marginRight:'10px'}} size='small'><Add/> ADD Department</Button>
            </div>
            
            <div style={{padding:'4%'}}>
              Departments Names
              <div style={{display:'flex', justifyContent:'space-around'}}>
                <Button variant='contained' sx={{ backgroundColor:'#2E3B55'}}>Web Developer</Button>
                <Button variant='contained' sx={{ backgroundColor:'#2E3B55'}}>Marketing</Button>
                <Button variant='contained' sx={{ backgroundColor:'#2E3B55'}}>Graphics</Button>
                <Button variant='contained' sx={{ backgroundColor:'#2E3B55'}}>Bussiness Development</Button>
                <Button variant='contained' sx={{ backgroundColor:'#2E3B55'}}>Human Resource</Button>
              </div>
            </div>
          </Card>

          {/* <Grid container spacing={2} sx={{marginTop:2}}>
            <Grid item xs={12} sm={4}>
              <Card sx={{opacity:'0.75'}}>
                <Typography textAlign="center" variant='h6' fontFamily="poppins">Web Developer</Typography>
                <Typography>Employees: 34</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <Typography textAlign="center" variant='h6' fontFamily="poppins">Marketing</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <Typography textAlign="center" variant='h6' fontFamily="poppins">Graphics</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Card>
                <Typography textAlign="center" variant='h6' fontFamily="poppins">Bussiness Development</Typography>
              </Card>
            </Grid>

          </Grid> */}
          <Card sx={{mt:2}}>
            <DeptTable/> 
          </Card>
        </Container>
        </Box>
    </>
  )
}

export default Department
