import React, {useState, useEffect} from 'react'
import {Paper, Container, Grid, Typography, Button } from '@mui/material';
import hysusLogo from '../assets/hysus.png';
import newImage from '../assets/WhatsApp Image 2023-08-24 at 3.03.39 PM.jpeg';
import './NewPage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LinkedIn } from '@mui/icons-material';
import { Box } from '@mui/material';
import SideBar from './Sidebar/Sidebar';
import illustrateImge from '../assets/istockphoto-1325079945-612x612.jpg';

const NewPage = () => {
    const {id} = useParams();
    const [data , setData] = useState('');

    useEffect(()=>{
        employeeProfile(id);
    },[id])

    const employeeProfile=(id)=>{
        console.log(id,"id");
        axios.get(`https://hysus-admin-backend-production.up.railway.app/api/employee/${id}`)
        .then(response =>{
            console.log(response,"data fetched");
            console.log(response.data.status);
            setData(response.data);
            
        })
        .catch(err =>{
            console.log(err, "errr");
        })
    }
  return (
    <>
    <Box sx={{display:'flex'}}>
        
    <SideBar/>
    <Paper elevation={2}>
       <div style={{textAlign:'center'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{display:'flex', flexWrap:'wrap', }}>
                    <img src={hysusLogo} alt="hysusLogo" width={200} />
                    <div style={{textAlign:'center', marginRight:'20px', display:'flex', alignItems:'center'}}>
                            <input type="radio" style={{accentColor: data.status === 'active' ? 'green' : 'red'}}  defaultChecked={data.status === 'active'} />
                            <Typography variant='body1' sx={{fontWeight:'bold'}}> {data.status ==='active'?'Active':'Inactive'} Profile</Typography>
                    </div>
                </div>
                <div>
                    <Button variant='contained' color='primary' sx={{marginRight:'20px'}}>Login</Button>
                </div>
            </div>
       </div>
       {/* <div style={{textAlign:'center'}}>
            <Typography variant='body1' sx={{fontWeight:'bold'}}> {data.status ==='active'?'Active':'Inactive'} Profile</Typography>
       </div> */}
       <Grid container spacing={2} >
            <Grid item xs={12} sm={4}>
                <Container>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
                        <div style={{ marginBottom: '20px',  }} >
                            {/* <div style={{border:'2px solid black', borderRadius:'240px', width:'280px' }}> */}
                                <img src={data.img} alt="" width="100%" style={{ maxWidth: '200px' , filter: 'drop-shadow(5px 5px 4px gray)'}} />

                            {/* </div> */}
                        </div>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>{data.name}</Typography>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '8px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Id:</Typography>
                            <Typography>HYS-87465</Typography>
                        </div>

                        <Typography sx={{ fontWeight: 'bold', mt: 1 }}>{data.as_designation?.position}</Typography>

                        <Typography sx={{ fontWeight: 'bold', mt: 2 }}>Official Phone Numbers:</Typography>
                        <Typography><span style={{ fontWeight: 'bold' }}>India:</span> {data.phone}</Typography>
                        <Typography><span style={{ fontWeight: 'bold' }}>USA:</span> 8757785767</Typography>
                        <Typography sx={{ mt: 2 }}><span style={{ fontWeight: 'bold' }}>Zoom/Skype:</span>{data.skype_id}</Typography>
                        <Typography sx={{ mt: 2 }}><span style={{ fontWeight: 'bold' }}> Email Id:</span> {data.email}</Typography>
                        <Button variant='contained' sx={{ backgroundColor: '#325094', marginTop: '20px' }}>Add Contact</Button>
                    </div>
                </Container>
            </Grid>

            <Grid item xs={12} sm={8}>
                <Container>
                    <div style={{ marginTop: '40px' }}>
                        <Typography variant='h4' sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' , justifyContent:'start'}}>
                            <span style={{ paddingLeft: '' , fontFamily:'cursive'}}>what we offer</span>
                        </Typography>

                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <img className="responsive-image" src={newImage} alt="" />
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </Grid>
            
            <Grid item xs={12}>
                <Container>
                    <div style={{ marginTop: '40px' }}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                            Top Skills:
                        </Typography>
                        <Typography>
                            {data.skills}
                        </Typography>

                        <Typography sx={{  mt: '20px' }}>
                            {/* <span style={{fontWeight: 'bold', }}>LinkedIn:</span> */}
                            <a href= {data.linkedin_link} style={{color:'blue'}}> <LinkedIn/></a>
                        </Typography>

                        <div style={{ marginTop: '20px' }}>
                            <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                                Projects:
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                IMT Ghaziabad (Lead Generation For Distance PGDM Course)
                            </Typography>
                            <ul style={{ paddingLeft: '20px' }}>
                                <li>
                                    Managing & Monitoring Google Ad Campaigns for Generating Leads for Distance PGDM Course and College Branding in Delhi NCR. (Generating 70-80 Leads Per Day)
                                </li>
                                <li>
                                    Managing & Monitoring Google Ad Campaigns for Generating Leads for Distance PGDM Course and College Branding in Delhi NCR. (Generating 70-80 Leads Per Day)
                                </li>
                            </ul>
                        </div>

                        <div style={{ marginTop: '24px' }}>
                            <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                                Client Recommendations:
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Jean (CEO at 1MB LLC):
                            </Typography>
                            <Typography>
                                "I had the pleasure to work with Mark on several campaigns and it has always been a pleasure to deal with him and tap into his knowledge, experience, and ability to think outside the box to address and solve problems."
                            </Typography>
                        </div>
                    </div>
                </Container>
            </Grid>

       </Grid>

    </Paper>
    
    </Box>
    
    </>
  )
}

export default NewPage
