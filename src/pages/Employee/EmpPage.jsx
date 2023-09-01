import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container, Typography , Button} from '@mui/material';
import GauravImage from '../../assets/gourav.png';
import EmpCard from './EmpCard';
import SickIcon from '@mui/icons-material/Sick';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import OpenModal from './OpenModal';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TodayIcon from '@mui/icons-material/Today';
import BarChart from './BarChart';
import TableForLeave from './TableForLeave';
import ScrollTabs from './ScrollTabs';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function EmpPage() {
  return (
    <>
    <Container>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} component='center'>
          <Item sx={{backgroundColor:'aliceblue', width:'90%', textAlign:'center'}}>
            <marquee behavior="scroll" scroll-amount="2" width="100%" direction="left" height="20px" style={{paddingBottom:'10px'}}>
              <div  style={{fontWeight: 'bold', display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
              <p>This is sample scrolling text.</p>
              <p>This is sample  text.</p>
              <p>This is sample scrolling text.</p>
              </div>
            </marquee>
          </Item>
        </Grid>
        <Grid item xs={12} sm={3}>
        <Item style={{width:'70%',margin:'auto', backgroundColor:'aliceblue'}}>
            <img src={GauravImage} alt="Gaurav " width="100%" />
            <Typography>
              Gaurav Shrivastav
            </Typography>
            <Typography>
              HYS-234234
            </Typography>
            <Typography>
              Full Stack Developer
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <Item><h1>WELCOME TO THE DASHBOARD</h1></Item>
            </Grid> */}
            <Grid item xs={12} sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Typography  ><h5>Joining Date- <span>12 Aug 2021</span></h5></Typography>
              <div>
                <Button variant='contained' color='error'>Logout</Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <ScrollTabs/>
              
            </Grid>
            <Grid item xs={12} >
              {/* <Typography sx={{marginTop:'10px'}}> */}
                <OpenModal/>
              {/* </Typography> */}
            
            </Grid>
            <Grid container spacing ={2} sx={{margin:'auto',display:'flex', justifyContent:'center'}}>

              <Grid item xs={12} sm={3} md={3} >
                <EmpCard title="Sick Leave" components={<SickIcon />}/>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <EmpCard title="Casual Leave" components={<ConnectingAirportsIcon />}/>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <EmpCard title="Earned Leave" components={<EmojiEventsIcon/>}/>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <EmpCard title="Annual Leave" components={<TodayIcon/>}/>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
        <Grid item xs={12} sm={3}>
          
        </Grid>
        <Grid item xs={12} sm={9}>
          <Item>
            <Typography>Leave Status</Typography>
            <TableForLeave/>
          </Item>
        </Grid>
        
      </Grid>
    </Box>
    </Container>
    </>
  );
}
