import React from 'react'
import { Card, Container, Typography } from '@mui/material'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const ManageDept = () => {
  return (
    <>
     <Card sx={{opacity:'0.75', filter: 'drop-shadow(5px 5px 4px gray)' }} >
        <Container sx={{mt:2, mb:2}}>
          <Typography variant='h6' sx={{textAlign:'center', fontFamily:'poppins'}}>
            <NotificationsActiveIcon style={{color:'#e2a600', }} />
            Manage Holiday</Typography>  
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar size="small"/>
            </LocalizationProvider>
        </Container>
      </Card>
    </>
  )
}

export default ManageDept
