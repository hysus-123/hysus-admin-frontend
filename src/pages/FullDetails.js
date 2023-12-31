import React, {useEffect , useState} from 'react';
import { Grid, Typography, Container, Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import SideBar from './Sidebar/Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import EmployeeAddress from '../components/AddressEdit/AddressEdit';

const FullDetails = () => {
    
  const [data, setData] = useState([]);
//   const [formattedBirthDate, setFormattedBirthDate] = useState('');
//   const [formattedJoiningDate, setFormattedJoiningDate] = useState('');
const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            // console.log(response.data.as_designation.as_department.department, "data");
            // const formattedDate = format(new Date(response.data.birth_date), 'MMMM d, yyyy');
            // setFormattedBirthDate(formattedDate);

            // const formattedJoiningDate = format(new Date(response.data.joining_date), 'MMMM d, yyyy');
            // setFormattedJoiningDate(formattedJoiningDate);
            console.log(response.data);
            setData(response.data);
        })
        .catch(err =>{
            console.log(err, "err");
        })
    }

    const handleFormSubmit = (formData,employeeId) => {
        console.log(formData);
        axios.post(`${base_url}/employee-address/${employeeId}`,formData)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error('API error:', error);
          });
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
                                        <Typography variant='body1'>{data?.as_basicInfo?.name}</Typography>
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
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Provision Period End:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.end_date} </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Office Number:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.office_number}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Report To:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        {/* {data?.as_reported ? (
                                            data.as_reported.map((item) => (
                                            <Typography variant='body1'>{item.employee_name}</Typography>
                                            ))
                                        ) : (
                                            <Typography variant='body1'>No data available</Typography>
                                        )} */}
                                        {data?.as_reported?.employee_name}
                                        </Grid>
                                </Grid>
                            </Container>
                        </Card>
                    </Grid>

                    {/* Contact Details */}
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                                                <Typography variant='body1'>{data.email}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Personal Email Id:</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <Typography variant='body1'>{data.as_basicInfo?.personal_email}</Typography>
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
                                                <Typography variant='body1'>{data.as_basicInfo?.linkedin_link}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Phone:</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <Typography variant='body1'>{data.as_basicInfo?.phone}</Typography>
                                            </Grid>
                                            
                                        </Grid>

                                    </Container>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Container>
                                        <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <Typography variant='h5' sx={{ textDecoration: 'underline', fontWeight: 'bold', marginBottom: 2 }}>
                                            Address
                                        </Typography>
                                        <div>
                                        <Button variant="outlined" color="primary" onClick={handleOpen}>
                                            <EditIcon/>
                                        </Button>
                                        <Dialog open={open} onClose={handleClose}>
                                            <DialogContent>
                                            <EmployeeAddress  onFormSubmit={handleFormSubmit} employeeId={data.id} existingAddress={data?.as_basicInfo?.employee_addresses}/>
                                            <Button variant="contained" color="primary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            </DialogContent>
                                        </Dialog>
                                        </div>
                                        </div>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={4}>
                                                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Correspondence Address:</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                            {data?.as_basicInfo?.employee_addresses ? (
                                                    data.as_basicInfo.employee_addresses.map((item) => (
                                                    <Typography variant='body1'>{item.line1} {item.city} {item.state} {item.country}</Typography>
                                                    ))
                                                ) : (
                                                    <Typography variant='body1'>No data available</Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Parmanent Address:</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                {data?.as_basicInfo?.employee_addresses ? (
                                                    data.as_basicInfo.employee_addresses.map((item) => (
                                                    <Typography variant='body1'>{item.line1} {item.city} {item.state} {item.country}</Typography>
                                                    ))
                                                ) : (
                                                    <Typography variant='body1'>No data available</Typography>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    

                    {/* Other Details */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <Container>
                                <Typography >
                                    Other Details
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Birth Date:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.as_basicInfo?.birth_date}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Spouse/Guradian Name:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.as_basicInfo?.spouse_name}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Alternative Number:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.as_basicInfo?.alternative_number}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Qualification:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.as_basicInfo?.qualification}</Typography>
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
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Applicant Name:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.bank_details?.applicant_name}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Bank Name:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.bank_details?.bank_name}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Account Number:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.bank_details?.account_num}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>IFSC Number:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.bank_details?.ifsc_num}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Branch Name:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{data.bank_details?.branch_name}</Typography>
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
