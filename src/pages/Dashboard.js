import React , {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import { Container, Grid, Button ,CardContent, Typography, LinearProgress} from '@mui/material';
import image from '../assets/gourav.png'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/Dashboard.css';
import { format } from 'date-fns';
import CustomizedSwitches from '../components/switch';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import {Box} from '@mui/material';
import ReportToDialoge from '../components/ReportTo/ReportToDialoge';

const EmpDashboard = () => {
  const {id} = useParams();
  const [data, setData] = useState([]);
  const [formattedBirthDate, setFormattedBirthDate] = useState('');
  // const [formattedJoiningDate, setFormattedJoiningDate] = useState('');
  console.log(id, 'id in dashboard page');

  useEffect(()=>{
    showUserDetails(id);
  },[id])

  const base_url = process.env.REACT_APP_BASE_URL

  function showUserDetails(id){
    axios.get(`${base_url}/employee/${id}`)
    .then(response =>{
      console.log(response, 'response from backend');
      console.log(response.data.as_designation, "response.as_designation");
      // const formattedDate = format(new Date(response.data.birth_date), 'MMMM d, yyyy');
      // setFormattedBirthDate(formattedDate);

      // const formattedJoiningDate = format(new Date(response.data.joining_date), 'MM, dd, yyyy');
      // setFormattedJoiningDate(formattedJoiningDate);
      setData(response.data);
      console.log(setData(response.data), "hii");
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <>
    <Box sx={{display:'flex'}}>
    <Sidebar/>
    <Container>
      <div style={{display: 'flex', flexDirection:'row', justifyContent:'flex-end'}}>
      <CustomizedSwitches />
      </div>
      <Grid container spacing={3} >
        {/* Part 1 */}
        <Grid item xs={12} md={4} >
          <Card>
            <CardContent>
              <div style={{display:"flex",flexDirection:"column",gap:'10', alignItems:"center", textAlign:"center"}}>
                <img src={data.img} alt='Profile' style={{ height: '300px' }} />
              {/* </div> */}
                <div style={{ textAlign: 'center' }}>
                  <Typography variant='h4'>{data?.as_basicInfo?.name}</Typography>
                  <Typography variant='body1'>HYS-{data.emp_id}</Typography>
                  <Typography variant='body1'>{data.as_designation?.position}</Typography>
                  <ReportToDialoge level={data.as_designation?.level} deptId={data.as_designation?.as_department?.id} id={data.id}/>
                  {/* <Typography variant='body1'>{data.as_department?.department}</Typography> */}
                  
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        {/* Parts 2 and 3 */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant='h5' style={{marginBottom:"20px",textDecoration:'underline'}}>Personal Information</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3} >
                      <Typography variant='subtitle1' sx={{fontWeight:'bold'}}>Full Name</Typography>
                    </Grid>
                    <Grid item xs={12} md={9}  className='paddingAdd'>
                      <Typography variant='body1' > {data?.as_basicInfo?.name}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3} >
                      <Typography variant='subtitle1' sx={{fontWeight:'bold'}}>Email</Typography>
                    </Grid>
                    <Grid item xs={12} md={9}  className='paddingAdd'>
                      <Typography variant='body1'>{data.email}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant='subtitle1' sx={{fontWeight:'bold'}}>Phone</Typography>
                    </Grid>
                    <Grid item xs={12} md={9}  className='paddingAdd'>
                      <Typography variant='body1'>{data?.as_basicInfo?.phone}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant='subtitle1' sx={{fontWeight:'bold'}}>Skype Id:</Typography>
                    </Grid>
                    <Grid item xs={12} md={9}  className='paddingAdd'>
                      <Typography variant='body1'>{data.skype_id}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant='subtitle1' sx={{fontWeight:'bold'}}>Address</Typography>
                    </Grid>
                    <Grid item xs={12} md={9}  className='paddingAdd'>
                      <Typography variant='body1'>{data?.as_basicInfo?.employee_addresses[0]?.line1} </Typography>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9}>
                      <Button variant='contained' ><Link to={`/emp-fulldetails/${data.id}`} style={{textDecoration:'none', color:'white'}}>Full Details</Link></Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant='h5' style={{marginBottom:"20px", textDecoration:'underline'}}> Progress</Typography>
                  <div style={{marginTop:'10px'}}>
                    <Typography variant='subtitle1'>Developer</Typography>
                    <LinearProgress variant='determinate' value={20} />
                  </div>
                  <div style={{marginTop:'10px'}}>
                    <Typography variant='subtitle1'>Frontend Developer</Typography>
                    <LinearProgress variant='determinate' color='warning' value={90} />
                  </div>
                  <div style={{marginTop:'10px'}}>
                    <Typography variant='subtitle1'>Backend Developer</Typography>
                    <LinearProgress variant='determinate' color='success' value={50} />
                  </div>
                  <div style={{marginTop:'10px'}}>
                    <Typography variant='subtitle1'>Graphics Designer</Typography>
                    <LinearProgress variant='determinate' color='secondary' value={70} />
                  </div >
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    </Box>
    </>
  );
};

export default EmpDashboard;
