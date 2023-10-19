import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Box, Card, Typography, Container, Grid} from '@mui/material'
import { useParams } from 'react-router-dom'
import SideBar from '../../pages/Sidebar/Sidebar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Button} from '@mui/material'
import jsPDF from 'jspdf';
import HysusImage from '../../assets/hysus.png';
import { useNavigate } from 'react-router-dom'

const ParticularPayroll = () => {
    const base_url = process.env.REACT_APP_BASE_URL
    const [payroll, setPayroll] = useState([]);
    const [salary, setSalary] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        fetchEmployeePayroll(id);
    },[id])

    const fetchEmployeePayroll= (id)=>{
        axios.get(`${base_url}/payroll/${id}`)
        .then((response)=>{
            console.log(response);
            setPayroll(response.data);
            fetchAllSalary(response.data?.as_employee_details?.id)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const fetchAllSalary = (emp_id) =>{
        console.log(emp_id, "emp_id");
        axios.get(`${base_url}/salary/${emp_id}`)
        .then((response)=>{
            console.log(response.data);
            setSalary(response.data);

        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handlePrintClick = (sal_slip) => {
        const doc = new jsPDF();

        const imgData = HysusImage;

        doc.addImage(imgData, 'PNG', 70, 0, 60, 40);

        doc.setFontSize(16);
        doc.text(`Employee Details`, 10, 60);
        doc.setFontSize(12);
        doc.text(`Employee Name: ${sal_slip?.as_employee?.employee_name}`, 10, 70);
        doc.text(`Employee Id: HYS-${sal_slip?.as_employee?.emp_id}`, 10, 80);
        doc.text(`Employee Email: ${sal_slip?.as_employee?.email}`, 10, 90);

        doc.text(`Designation: ${sal_slip?.as_employee?.designation}`, 100, 70);
        doc.text(`Department: ${sal_slip?.as_employee?.department}`, 100, 80);
        doc.text(`Joining Date: ${sal_slip?.as_employee?.joinig_date}`, 100, 90);

        // Section 1: Earning Money
        doc.setFontSize(16);
        doc.text(`Earning Money`, 10, 110);
        doc.setFontSize(12);
        doc.text(`Gross Salary: ${sal_slip?.as_payroll_details?.gross_salary}`, 10, 120);
        doc.text(`Basic Salary: ${sal_slip?.as_payroll_details?.basic_salary}`, 10, 130);
        doc.text(`House Rent Allowance: ${sal_slip?.as_payroll_details?.hra}`, 10, 140);
        doc.text(`Special Allowance: ${sal_slip?.as_payroll_details?.sp_allowance}`, 10, 150);
      
        // Section 2: Deductions
        const deductionStartY = 10;
        doc.setFontSize(16);
        doc.text(`Deductions `, 100, 110);
        doc.setFontSize(12);
        doc.text(`LOP: ${sal_slip.LOP}`, 100, deductionStartY + 110);
        doc.text(`EPF Deduction: ${sal_slip?.as_payroll_details?.deduct_PF}`, 100, deductionStartY + 120);
        doc.text(`ESIC Deduction: ${sal_slip?.as_payroll_details?.deduct_ESIC}`, 100, deductionStartY + 130);
        doc.text(`LWF Deduction: ${sal_slip?.as_payroll_details?.deduct_LWF}`, 100, deductionStartY + 140);
        doc.text(`Working Days: ${sal_slip.working_days}`, 100, deductionStartY + 150);
        
        // Section 3: Total Amount after Deductions
        doc.setFontSize(16);
        doc.text(`Total Amount`, 10, 170);
        doc.setFontSize(12);
        doc.text(`Net Payable: ${sal_slip?.as_payroll_details?.net_payable}`, 130, 180);
        doc.text(`Final Salary: ${sal_slip.final_salary}`, 130, 190);
        
        // Save the PDF with a unique name, e.g., using the month
        doc.save(`Salary_Slip_${sal_slip.month}.pdf`);

    };
    
    const handleToPdf = (id)=>{
        navigate(`/payrollpdf/${id}`);
    }

  return (
    <>
      <Box sx={{display:'flex'}}>
        <SideBar/>
        <Container>
            <Card sx={{mt:2}}>
                <Typography sx={{textAlign:'center', fontFamily:'poppins'}}>Payroll Slip</Typography>
            </Card>
            <Grid container spacing={2} sx={{mt:2}}>
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
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Deduct EPF:</Typography>
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
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Deduct LWF:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{payroll.deduct_LWF}</Typography>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Total Deduct Amount:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant='body1'>{payroll.deduct_LWF + payroll.deduct_PF +payroll.deduct_ESIC}</Typography>
                                    </Grid>

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
                <Grid item xs={12}>
                        <Card>
                            <Container>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>

                                    <Typography sx={{fontWeight:'bold', margin:'20px', textAlign:'center'}}>Salary Slip</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {(salary)?(
                                        salary.map((sal_slip)=>(
                                            <Accordion sx={{border:'2px solid black',mt:2 }}>
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            >
                                            <Typography sx={{fontWeight:'bold' }}>Month {sal_slip?.month}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Typography>
                                                LOP: {sal_slip?.LOP}
                                            </Typography>
                                            <Typography>
                                                working_days: {sal_slip?.working_days}
                                            </Typography>
                                            <Typography>
                                                total deduct: {sal_slip?.total_deduct}
                                            </Typography>
                                            <Typography>
                                                Final Salary: {sal_slip?.final_salary}
                                            </Typography>
                                            <Typography sx={{display:'inline-block', float:'right', mb:3}}>
                                                <Button variant='contained' size='small' onClick={()=>handlePrintClick(sal_slip)}>Print</Button>
                                                <Button variant='contained' size='small' onClick={()=>handleToPdf(sal_slip.id)}>View</Button>
                                            </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        ))
                                    ):(
                                        <p>No salary Data Available</p>
                                    )}
                                        
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

export default ParticularPayroll
