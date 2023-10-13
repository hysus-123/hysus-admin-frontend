import React from 'react'
import { Box, Container, Typography, Card, Button } from '@mui/material'
import SideBar from '../../pages/Sidebar/Sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeptDropDown from './DeptDropDown';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2E3B55",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Department = () => {
  const base_url = process.env.REACT_APP_BASE_URL
  const [department, setDepartment] = useState([])
  const [employee, setEmployee] = useState([])

  

  useEffect(() => {
    fetchDepartment();
  }, [fetchDepartment])

  const fetchDepartment = () => {
    axios.get(`${base_url}/department`)
      .then((response) => {
        console.log(response.data);
        setDepartment(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const fetchByDept = (id) => {
    axios.get(`${base_url}/employee?deptId=${id}`)
      .then((response) => {
        console.log(response.data);
        setEmployee(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <Box sx={{ display: 'flex', backgroundColor: '#ded9d9' }}>
        <SideBar />
        <Container sx={{ mt: 2 }}>
          <Card>
            <Typography sx={{ textAlign: 'center', fontFamily: 'poppins' }} variant='h5'>Departments</Typography>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              {/* Add your DeptDropDown component here */}
              <DeptDropDown/>
            </div>
            <div style={{ padding: '4%' }}>
              Departments Names
              <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                {department.map((dept) => (
                  <Button key={dept.id} variant='contained' sx={{ backgroundColor: '#2E3B55' }} onClick={() => fetchByDept(dept.id)}>
                    {dept.department}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
          <Card sx={{ mt: 2 }}>
            {Array.isArray(employee) && employee.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Employee Name</StyledTableCell>
                      <StyledTableCell align="right">Employment Type</StyledTableCell>
                      <StyledTableCell align="right">Report To</StyledTableCell>
                      <StyledTableCell align="right">Joining Date</StyledTableCell>
                      {/* <StyledTableCell align="right">Provision Period End</StyledTableCell> */}
                      <StyledTableCell align="right">Details</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employee.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                        {row.employee_name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.employee_type}</StyledTableCell>
                        <StyledTableCell align="right">{row.reported_to}</StyledTableCell>
                        <StyledTableCell align="right">{row.joining_date}</StyledTableCell>
                        {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                        <StyledTableCell align="right">-</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>No employee data available.</Typography>
            )}
          </Card>
        </Container>
      </Box>
    </>
  )
}

export default Department
