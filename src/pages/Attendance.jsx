import React from 'react'
import { Box, Container , Grid} from '@mui/material'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import AttendanceTabs from '../components/Attendance/Attendance';

import SideBar from './Sidebar/Sidebar'

const Attendance = () => {
  return (
    <>
      
        <AttendanceTabs style={{marginTop:'20px'}}/>
    </>
  )
}

export default Attendance
