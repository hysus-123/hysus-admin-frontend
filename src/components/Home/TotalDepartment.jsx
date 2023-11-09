import React from 'react';
import { Card, Container, Typography, Button} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import GroupsIcon from '@mui/icons-material/Groups';

const TotalDepartment = ({dash}) => {

    const cardStyle = {
        opacity:'0.75',
        height:'100%'
    }
  return (
    <Card sx={{ ...cardStyle , filter: 'drop-shadow(5px 5px 4px gray)' }} >
        <Container sx={{mt:2, mb:2, height:'100%'}}>
          <Typography variant='h6' sx={{textAlign:'center', fontFamily:'poppins'}}>
            <NotificationsActiveIcon style={{color:'#e2a600', }} />
            Total Departments
        </Typography> 
        <Typography variant='h4' sx={{mt:2,height:'100%', width:'100%'}}>
            {/* <Button size='large' sx={{height:'100%', width:'100%'}}> */}
            <Typography sx={{display:'flex', justifyContent:'space-around' }}>
                <div style={{fontSize:'13vh'}}>
                    {dash.department}
                </div>
                <div >
                    <GroupsIcon sx={{fontSize:'13vh'}}/>
                </div>
            </Typography>
            {/* </Button> */}
        </Typography>
        </Container>
      </Card>
  );
}

export default TotalDepartment;
