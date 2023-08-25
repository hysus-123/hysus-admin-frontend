import React , {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { Container, Grid, Button } from '@mui/material';
import image from '../assets/gourav.png'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/Dashboard.css';
import { format } from 'date-fns';
import CustomizedSwitches from '../components/switch';
import { Link } from 'react-router-dom';

const EmpDashboard = () => {
  const {id} = useParams();
  const [data, setData] = useState([]);
  const [formattedBirthDate, setFormattedBirthDate] = useState('');
  // const [formattedJoiningDate, setFormattedJoiningDate] = useState('');
  console.log(id, 'id in dashboard page');

  useEffect(()=>{
    showUserDetails(id);
  },[id])

  function showUserDetails(id){
    axios.get(`https://hysus-admin-backend-production.up.railway.app/api/employee/${id}`)
    .then(response =>{
      console.log(response);
      console.log(response.data.as_department.department, "response.as_department");
      const formattedDate = format(new Date(response.data.birth_date), 'MMMM d, yyyy');
      setFormattedBirthDate(formattedDate);

      // const formattedJoiningDate = format(new Date(response.data.joining_date), 'MMMM d, yyyy');
      // setFormattedJoiningDate(formattedJoiningDate);
      setData(response.data);
    })
    .catch(err=>{
      console.log(err);
    })
  }


  return (
    <Container>
      <div style={{display: 'flex', flexDirection:'row', justifyContent:'flex-end'}}>
      <CustomizedSwitches />
      </div>
      <Grid container spacing={3} >
        {/* Part 1 */}
        <Grid item xs={12} md={4} >
          <Card>
            <CardContent>
              <div style={{display:"flex",flexDirection:"column", alignItems:"center", textAlign:"center"}}>
                <img src={image} alt='Profile' style={{ height: '300px' }} />
              {/* </div> */}
                <div style={{ textAlign: 'center' }}>
                  <Typography variant='h4'>{data.name}</Typography>
                  <Typography variant='body1'>{data.emp_id}</Typography>
                  <Typography variant='body1'>{data.as_designation?.position}</Typography>
                  <Typography variant='body1'>{data.as_department?.department}</Typography>
                  <div style={{marginTop:"10px"}}>
                    <Button variant='contained' color='primary'>
                      Follow
                    </Button>
                    <Button variant='contained' color='primary' style={{ marginLeft: 8 }}>
                      Message
                    </Button>
                  </div>
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
                      <Typography variant='body1' > {data.name}</Typography>
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
                      <Typography variant='body1'>{data.phone}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant='subtitle1' sx={{fontWeight:'bold'}}>Birth Date</Typography>
                    </Grid>
                    <Grid item xs={12} md={9}  className='paddingAdd'>
                      <Typography variant='body1'>{formattedBirthDate}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant='subtitle1' sx={{fontWeight:'bold'}}>Address</Typography>
                    </Grid>
                    <Grid item xs={12} md={9}  className='paddingAdd'>
                      <Typography variant='body1'>{data.current_address}</Typography>
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
  );
};

export default EmpDashboard;
