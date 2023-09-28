import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import Typography from '@mui/material/Typography'; // Import Typography from MUI
import { Button, Card, Container } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LiveTimeClock from './LiveTimeClock';

export default function CustomTimeFormat() {
  const [value, setValue] = useState(dayjs('2022-04-17T1:00'));

  // Calculate hours and minutes
  const hours = value.hour();
  const minutes = value.minute();

  return (
    <>
        <Card sx={{opacity:'0.75', filter: 'drop-shadow(5px 5px 4px gray)'}}>
            <Container sx={{mt:2, mb:2}}>
             <Typography variant='h6' sx={{fontFamily:'poppins', textAlign:'center'}}>
                <SettingsIcon style={{color:'#e2a600', fontFamily:'poppins',mt:1}}/>
                Break Time Set
                </Typography>
                <LiveTimeClock/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimeField', 'TimeField', 'TimeField']} sx={{display: 'flex' ,mt:2,boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease'}}>
            <TimeField
            label="Select Time"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            format="HH:mm:ss"
            size='small'
            sx={{width:'40%',fontFamily:'poppins'}}
            />
            <Button variant='contained' size='small' sx={{width:'20%', borderRadius:'40px',fontFamily:'poppins', backgroundColor:'black', white:'white'}}>Select</Button>
            {/* Display the selected time in "1 hour 15 min" format */}
            <Typography variant="body1" sx={{fontFamily:'poppins', textAlign:'center', fontSize:'14px'}}>
            Selected Break Time: {hours} hour {minutes} min
            </Typography>
        </DemoContainer>
    </LocalizationProvider>
    </Container>
              </Card>
    </>

  );
}
