import React from 'react'
import { Box, Container , Grid} from '@mui/material'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import AttendanceTable from '../components/AttendanceTable';

import SideBar from './Sidebar/Sidebar'

const Attendance = () => {
  return (
    <>
      <Box sx={{display:'flex'}}>
        <SideBar/>
        <Grid container spacing={1} sx={{ml:2}}>
            {/* <Grid item xs={12} sm={2.3}>
                <p>Attendance</p>
                <Calendar/>
            </Grid> */}
            <Grid item xs={12} sm={10} sx={{ml:2, mt:5, margin:'auto'}}>
                <AttendanceTable style={{marginTop:'20px'}}/>
            </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Attendance
