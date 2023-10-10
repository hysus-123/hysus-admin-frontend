import React from 'react'
import { Box, Container, Typography, Card, TextField, Button } from '@mui/material'
import SideBar from '../../pages/Sidebar/Sidebar'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import HolidayCalendar from './HolidayCalendar';
import axios from 'axios';

const Holiday = () => {

    const [holidayData, setHolidayData] = React.useState([]); // State to store holiday data

  React.useEffect(()=>{
    fetchHolidays();
  },[])

  const base_url = process.env.REACT_APP_BASE_URL;

  const fetchHolidays = () => {
    axios
      .get(`${base_url}/holiday`)
      .then((response) => {
        console.log(response.data);
        setHolidayData(response.data); // Store the holiday data in state
      })
      .catch((err) => {
        console.log(err);
        setHolidayData([]); // Reset the state if there's an error
      });
  };
  return (
    <>
      <Box sx={{display: 'flex', backgroundColor:'#ded9d9'}}>
        <SideBar/>
        <Container sx={{mt:2}}>
            <Typography variant='h4' sx={{textAlign:'center', fontFamily:'poppins'}}>
                Holidays
            </Typography>
            <Card sx={{opacity:'0.75'}}>
                <Typography sx={{fontFamily:'poppins', fontWeight:'bold', textDecoration:'underline'}}>
                    Select Holiday Date
                </Typography>
                <div style={{display:"flex"}}>
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker orientation="landscape" />
                    </LocalizationProvider> */}
                    <HolidayCalendar/>
                    {/* <div style={{margin:'auto', display:'flex', flexDirection:'column', gap:4}}>
                        <Typography>Title</Typography>
                        <TextField placeholder="Enter Title" size='small'/>
                        <Typography>Comment</Typography>
                        <TextField placeholder="Enter Comment" size='small' />
                        <Typography >
                            <Button variant="contained">Save</Button>
                        </Typography>
                    </div> */}
                </div>
                
            </Card>

            <Card>
            <ul>
              {holidayData.map((holiday) => (
                <li key={holiday.id}>
                  <strong>{holiday.title}</strong> - {holiday.comment}, Date: {holiday.date}
                </li>
              ))}
            </ul>
            </Card>
        </Container>
        </Box>
    </>
  )
}

export default Holiday
