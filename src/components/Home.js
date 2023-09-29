import { Box } from '@mui/material'
import React , {useState, useEffect}from 'react'
import SideBar from '../pages/Sidebar/Sidebar';
import {Container, Typography, Button, Card, Grid} from '@mui/material';
// import { TextareaAutosize } from '@mui/material';
// import ListUpdate from './ListUpdate';
// import axios from 'axios';
import SelectTime from './Home/SelectTime';
import StatusChart from './Home/StatusChart';
import UpcomingBirthDay from './Home/UpcomingBirthDay';
import UpdateInfo from './Home/UpdateInfo';

const Home = () => {
  

  return (
    <>
      <Box sx={{display: 'flex', backgroundColor:'#ded9d9'}}>
        <SideBar/>
        <Container sx={{mt:2}}>
          <Typography variant="h4" sx={{textAlign: 'center', fontFamily:'poppins'}}>Overview</Typography>
          <Grid container spacing={2} sx={{mt:2}}>
          <Grid item xs={12} sm={6}>
              
                  <SelectTime />
            </Grid>

            <Grid item xs={12} sm={6}>
              <UpcomingBirthDay/>
            </Grid>

            <Grid item xs={12} sm={6}> 
              <UpdateInfo/>
            </Grid>
        
            <Grid item xs={12} sm={6}>
                  <StatusChart />
            </Grid>

          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Home
