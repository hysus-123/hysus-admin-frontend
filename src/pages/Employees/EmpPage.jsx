import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container, Typography , Button} from '@mui/material';
import GauravImage from '../../assets/gourav.png';
import SickIcon from '@mui/icons-material/Sick';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TodayIcon from '@mui/icons-material/Today';
import StickyHeader from '../../components/EmployeeComponent/StickyHeader';
import InfoComponent from '../../components/EmployeeComponent/InfoComponent';
import ScrollTabs from '../../components/EmployeeComponent/ScrollTab';

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
            <StickyHeader/>
        </Grid>

        <Grid item xs={12} sm={3}>
            <InfoComponent/>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Typography  ><h5>Joining Date- <span>12 Aug 2021</span></h5></Typography>
              <div>
                <Button variant='contained' color='error'>Logout</Button>
              </div>
            </Grid>

            <Grid item xs={12} >
              <ScrollTabs/>
            </Grid>
          </Grid>
        </Grid>
      
      </Grid>
    </Box>
    </Container>
    </>
  );
}
