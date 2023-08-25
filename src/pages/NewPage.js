import React, {useState, useEffect} from 'react'
import {Paper, Container, Grid, Typography, Button , Card} from '@mui/material';
import hysusLogo from '../assets/hysus.png';
import gouravImg from '../assets/gourav.png';
import newImage from '../assets/WhatsApp Image 2023-08-24 at 3.03.39 PM.jpeg';
import './NewPage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewPage = () => {
    const {id} = useParams();

    useEffect(()=>{
        employeeProfile(id);
    },[id])

    const employeeProfile=(id)=>{
        console.log(id,"id");
        axios.get(`https://hysus-admin-backend-production.up.railway.app/api/employee/${id}`)
        .then(response =>{
            console.log(response,"data fetched");
        })
        .catch(err =>{
            console.log(err, "errr");
        })
    }
  return (
    <Paper elevation={2}>
       <div style={{textAlign:'center'}}>
            <img src={hysusLogo} alt="hysusLogo" width={200} />
       </div>
       <div style={{textAlign:'center'}}>
            <Typography variant='body1' sx={{fontWeight:'bold'}}> Active Profile</Typography>
       </div>
       <Grid container spacing={2} >
            <Grid item xs={12} sm={6}>
                <Container>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
                        <div style={{ marginBottom: '20px',  }} >
                            {/* <div style={{border:'2px solid black', borderRadius:'240px', width:'280px' }}> */}
                                <img src={gouravImg} alt="" width="100%" style={{ maxWidth: '200px' }} />

                            {/* </div> */}
                        </div>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Gourav Shrivastav</Typography>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '8px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Id:</Typography>
                            <Typography>HYS-87465</Typography>
                        </div>

                        <Typography sx={{ fontWeight: 'bold', mt: 1 }}>Digital Marketing Manager</Typography>

                        <Typography sx={{ fontWeight: 'bold', mt: 2 }}>Official Phone Numbers:</Typography>
                        <Typography><span style={{ fontWeight: 'bold' }}>India:</span> 8757785767</Typography>
                        <Typography><span style={{ fontWeight: 'bold' }}>USA:</span> 8757785767</Typography>
                        <Typography sx={{ mt: 2 }}><span style={{ fontWeight: 'bold' }}>Zoom/Skype:</span> hysus@skype.com</Typography>
                        <Typography sx={{ mt: 2 }}><span style={{ fontWeight: 'bold' }}>Email Id:</span> hysus@gmail.com</Typography>
                        <Button variant='contained' sx={{ backgroundColor: '#325094', marginTop: '20px' }}>Add Contact</Button>
                    </div>
                </Container>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Container>
                    <div style={{ marginTop: '80px' }}>
                        <Typography variant='h4' sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ paddingLeft: '' }}>what we offer</span>
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
                            Google AdSense, Google Analytics, Google Tag Manager, Search Engine Marketing, E-commerce SEO
                        </Typography>

                        <Typography sx={{ fontWeight: 'bold', mt: '20px' }}>
                            LinkedIn: Check
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
  )
}

export default NewPage
