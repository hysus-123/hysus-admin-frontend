import React from 'react';
import LeaveModal from '../../../components/EmployeeComponent/LeaveModal';
import EmployeeCard from '../../../components/EmployeeComponent/EmployeeCard';
import { Grid } from '@mui/material';
import SickIcon from '@mui/icons-material/Sick';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TodayIcon from '@mui/icons-material/Today';
import LeaveStatusTable from '../../../components/EmployeeComponent/LeaveStatusTable';

const LeaveComponent = () => {
  return (
    <>
    <LeaveModal/>
    <Grid container spacing={2} sx={{overflowX :'scroll', mt:2}}>
        <Grid item xs={12} sm={3}>
            <EmployeeCard title="Sick Leave" components={<SickIcon />}/>
        </Grid>
        <Grid item xs={12} sm={3}>
            <EmployeeCard title="Casual Leave" components={<ConnectingAirportsIcon />}/>
        </Grid>
        <Grid item xs={12} sm={3}>
            <EmployeeCard title="Earned Leave" components={<EmojiEventsIcon/>}/>
        </Grid>
        <Grid item xs={12} sm={3}>
            <EmployeeCard title="Annual Leave" components={<TodayIcon/>}/>
        </Grid>
    </Grid>
    <LeaveStatusTable/>
    </>
  )
}

export default LeaveComponent
