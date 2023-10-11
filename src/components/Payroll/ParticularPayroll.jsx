import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Box, Card, Typography, Container, Grid} from '@mui/material'
import { useParams } from 'react-router-dom'
import SideBar from '../../pages/Sidebar/Sidebar';

const ParticularPayroll = () => {
    const base_url = process.env.REACT_APP_BASE_URL
    const [payroll, setPayroll] = useState([]);
    const {id} = useParams();
    useEffect(()=>{
        fetchEmployeePayroll(id);
    },[id])

    const fetchEmployeePayroll= (id)=>{
        axios.get(`${base_url}/payroll/${id}`)
        .then((response)=>{
            console.log(response);
            setPayroll(response.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
  return (
    <>
      <Box sx={{display:'flex'}}>
        <SideBar/>
        <Container>
            <Card sx={{mt:2}}>
                <Typography sx={{textAlign:'center', fontFamily:'poppins'}}>Payroll Slip</Typography>
            </Card>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                        <Card>
                            <Container>
                                <Typography variant='h5' sx={{ textDecoration: 'underline', fontWeight: 'bold', marginBottom: 2 }}>
                                    Payroll
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Employee Name:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1' >{payroll?.as_employee_details?.employee_name}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Employee Id:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1' >{payroll?.as_employee_details?.emp_id}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Gross Salary:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1' >{payroll.gross_salary}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Base Salary:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{payroll.basic_salary}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>HRA:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'> {payroll.hra}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Special Allowance:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{payroll.sp_allowance} </Typography>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Net Payable:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{payroll.net_payable}</Typography>
                                    </Grid>
                                    
                                </Grid>


                            </Container>
                        </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                        <Card>
                            <Container>
                                <Typography variant='h5' sx={{ textDecoration: 'underline', fontWeight: 'bold', marginBottom: 2 }}>
                                    Payroll
                                </Typography>
                                <Grid container spacing={2}>
                                    
                                    
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Deduct LWF:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{payroll.deduct_LWF}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Deduct PF:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{payroll.deduct_PF} </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Deduct ESIC:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{payroll.deduct_ESIC} </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Total Deduct Amount:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{payroll.deduct_LWF + payroll.deduct_PF +payroll.deduct_ESIC}</Typography>
                                    </Grid>
                                    {/* <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Report To:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        {data?.as_reported ? (
                                            data.as_reported.map((item) => (
                                            <Typography variant='body1'>{item.employee_name}</Typography>
                                            ))
                                        ) : (
                                            <Typography variant='body1'>No data available</Typography>
                                        )}
                                        </Grid> */}
                                </Grid>


                            </Container>
                        </Card>
                </Grid>
                <Grid item xs={12}>
                        <Card>
                            <Container>
                                
                                <Grid container spacing={2}>
                                    
                                    
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Net Payable:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{payroll.net_payable}</Typography>
                                    </Grid>
                                    

                                    {/* <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Report To:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        {data?.as_reported ? (
                                            data.as_reported.map((item) => (
                                            <Typography variant='body1'>{item.employee_name}</Typography>
                                            ))
                                        ) : (
                                            <Typography variant='body1'>No data available</Typography>
                                        )}
                                        </Grid> */}
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

export default ParticularPayroll
