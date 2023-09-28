import React from 'react';
import { Card, Typography, Container } from '@mui/material';
import Avatar from 'react-avatar';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BirthdayImage from '../../assets/birthdayImage.webp'

const upcomingBirthdays = [
  { name: 'Aayush Kumar', date: '12 October 2023' },
  { name: 'Gaurav Shrivastav', date: '12 October 2023' },
  // Add more birthday entries as needed
];


const UpcomingBirthDay = () => {
    const cardStyle = {
        // backgroundImage: `url(${BirthdayImage})`, // Set the background image here
        // backgroundSize: 'cover', // Adjust as needed
        opacity:'0.75'

        
      };
  return (
    <>
      <Card sx={{ ...cardStyle , filter: 'drop-shadow(5px 5px 4px gray)' }} >
        <Container sx={{marginBottom:'5%',marginTop:'4%'}}>
          <Typography variant='h6' sx={{textAlign:'center', fontFamily:'poppins'}}>
            <NotificationsActiveIcon style={{color:'#e2a600', }} />
            UPCOMING BIRTHDAYS</Typography> 
          {upcomingBirthdays.length > 0 ? (
            upcomingBirthdays.map((birthday, index) => (
              <div key={index} style={{ display: 'flex', marginTop: '5%',alignItems:'center', justifyContent: 'space-between' ,backgroundColor: 'black',
              borderRadius: '16px', // Rounded corners for the background
              padding: '8px',}}>
                <div style={{display:'flex', alignItems:'center', gap:5}}>
                <Avatar name={birthday.name} round size='35' style={{color:'white', fontFamily:'poppins'}} />
                <Typography style={{color:'white', fontFamily:'poppins'}}>{birthday.name} </Typography>
                </div>
                
                <Typography style={{color:'white', fontFamily:'poppins'}}>{birthday.date}</Typography>
              </div>
            ))
          ) : (
            <Typography>No birthdays this week</Typography>
          )}
        </Container>
      </Card>
    </>
  );
};

export default UpcomingBirthDay;
