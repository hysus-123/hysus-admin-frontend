import React, {useEffect , useState} from 'react';
import { Grid, Typography, Container, Card } from '@mui/material';
import { useParams } from 'react-router-dom';

import { format } from 'date-fns';
import axios from 'axios';

const FullDetails = () => {
    
  const [data, setData] = useState([]);
  const [formattedBirthDate, setFormattedBirthDate] = useState('');
  const [formattedJoiningDate, setFormattedJoiningDate] = useState('');

    const {id} = useParams();
    useEffect(()=>{
        fetchAllData(id);
    }, [id]);

    const fetchAllData = (id)=>{
        console.log(id, "id");
        axios
        .get(`https://hysus-admin-backend-production.up.railway.app/api/employee/${id}`)
        .then(response =>{
            console.log(response.data, "data");
            const formattedDate = format(new Date(response.data.birth_date), 'MMMM d, yyyy');
            setFormattedBirthDate(formattedDate);

            const formattedJoiningDate = format(new Date(response.data.joining_date), 'MMMM d, yyyy');
            setFormattedJoiningDate(formattedJoiningDate);
            setData(response.data);
        })
        .catch(err =>{
            console.log(err, "err");
        })
    }

    return (
        <Container sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                {/* Employee Details */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <Container>
                            <Typography variant='h5' sx={{ textDecoration: 'underline', fontWeight: 'bold', marginBottom: 2 }}>
                                Employee Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Employee Id:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1' >{data.empId}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Full Name:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>{data.name}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Department:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'> </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Designation:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>Full Name Lorem ipsum dolor, </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Status:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>Active </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Joining Date:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>Full Name Lorem ipsum dolor, </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Office Number:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>Full Name Lorem ipsum dolor</Typography>
                                </Grid>
                            </Grid>
                        </Container>
                    </Card>
                </Grid>

                {/* Contact Details */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <Container>
                            <Typography variant='h5' sx={{ textDecoration: 'underline', fontWeight: 'bold', marginBottom: 2 }}>
                                Contact Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Email Id:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>asdfs@gmail.com</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Skype Id:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>sdfsdkYpe@skype.com</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>LinkedIn:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>sdfsdkYpe@skype.com</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Phone:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>+91345738934</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Current Address:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, accusamus!</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Parmanent Address:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>Lorem ipsum, dolor sit amet consectetur adipisicing.</Typography>
                                </Grid>
                            </Grid>

                        </Container>
                    </Card>
                </Grid>

                {/* Other Details */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <Container>
                            <Typography variant='h5' sx={{ textDecoration: 'underline', fontWeight: 'bold', marginBottom: 2 }}>
                                Other Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Birth Date:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'> 12 August 2002</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Spouce Name:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>Lorem, ipsum dolor.</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Alternative Number:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>+9187748343</Typography>
                                </Grid>

                            </Grid>

                        </Container>
                    </Card>
                </Grid>

                {/* Bank Details */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <Container>
                            <Typography variant='h5' sx={{ textDecoration: 'underline', fontWeight: 'bold', marginBottom: 2 }}>
                                Bank Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Bank Name:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>State Bank of India</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Account Number:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>9874328935873</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>IFSC Number:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='body1'>ssbi38838sh</Typography>
                                </Grid>

                            </Grid>

                        </Container>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default FullDetails
