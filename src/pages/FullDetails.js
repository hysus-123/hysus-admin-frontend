import React, {useEffect , useState} from 'react';
import { Grid, Typography, Container, Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import SideBar from './Sidebar/Sidebar';

const FullDetails = () => {
    
  const [data, setData] = useState([]);
  const [formattedBirthDate, setFormattedBirthDate] = useState('');
//   const [formattedJoiningDate, setFormattedJoiningDate] = useState('');

    const {id} = useParams();
    useEffect(()=>{
        fetchAllData(id);
    }, [id]);

    const base_url = process.env.REACT_APP_BASE_URL
    const fetchAllData = (id)=>{
        console.log(id, "id");
        axios
        .get(`${base_url}/employee/${id}`)
        .then(response =>{
            console.log(response.data.as_designation.as_department.department, "data");
            const formattedDate = format(new Date(response.data.birth_date), 'MMMM d, yyyy');
            setFormattedBirthDate(formattedDate);

            // const formattedJoiningDate = format(new Date(response.data.joining_date), 'MMMM d, yyyy');
            // setFormattedJoiningDate(formattedJoiningDate);
            setData(response.data);
        })
        .catch(err =>{
            console.log(err, "err");
        })
    }

    return (
        <>
        <Box sx={{display:'flex'}}>
            <SideBar/>
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
                                        <Typography variant='body1' >HYS-{data.emp_id}</Typography>
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
                                        <Typography variant='body1'> {data.as_designation?.as_department?.department}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Designation:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.as_designation?.position} </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Status:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.status} </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Joining Date:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.joining_date} </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Office Number:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.office_number}</Typography>
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
                                        <Typography variant='body1'>{data.emp_id}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Skype Id:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.skype_id}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>LinkedIn:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.linkedin_link}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Phone:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.phone}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Correspondence Address:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.current_address}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Parmanent Address:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.permanent_address}</Typography>
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
                                        <Typography variant='body1'>{data.birth_date}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Spouse Name:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.spouse_name}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Alternative Number:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.alternative_number}</Typography>
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
                                        <Typography variant='body1'>{data.bank_name}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Account Number:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.account_num}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>IFSC Number:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.ifsc_num}</Typography>
                                    </Grid>

                                </Grid>

                            </Container>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
        </>
    )
}

export default FullDetails
