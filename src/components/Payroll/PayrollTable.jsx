import React, {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import PayrollModal from './PayrollModal';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import SalaryModal from './SalaryModal';

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

export default function CustomizedTables() {

    const[data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetchEmpData();
    },[])
    const base_url = process.env.REACT_APP_BASE_URL
    const fetchEmpData = () =>{
        axios.get(`${base_url}/payroll`)
        .then((response)=>{
            console.log(response.data);
            setData(response.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handlePayRollClick = (id) =>{
      console.log("payroll details");
      navigate(`/payroll/${id}`)
    }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee Name</StyledTableCell>
            <StyledTableCell align="center">Package(in lpa)</StyledTableCell>
            <StyledTableCell align="center">Gross Salary(monthly)</StyledTableCell>
            <StyledTableCell align="center">Basic Pay(in month)</StyledTableCell>
            <StyledTableCell align="center">HRA</StyledTableCell>
            <StyledTableCell align="center">SP allowance</StyledTableCell>
            <StyledTableCell align="center">View</StyledTableCell>
            <StyledTableCell align="center">Create</StyledTableCell>
            <StyledTableCell align="center">Salary</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (  
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row?.as_employee_details?.employee_name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.annual_package}</StyledTableCell>
              <StyledTableCell align="center">{row.gross_salary}</StyledTableCell>
              <StyledTableCell align="center">{row.basic_salary}</StyledTableCell>
              <StyledTableCell align="center">{row.hra}</StyledTableCell>
              <StyledTableCell align="center">{row.sp_allowance}</StyledTableCell>
              <StyledTableCell align="center" ><Button onClick={() => handlePayRollClick(row.id, row?.as_employee_details?.id)}><RemoveRedEyeIcon sx={{color:'green'}} /></Button></StyledTableCell>
              <StyledTableCell align="center"><PayrollModal passId={row.id} newrow={row}/></StyledTableCell>
              <StyledTableCell align="center"><SalaryModal passId={row.id} newrow={row} emp_id={row?.as_employee_details?.id}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
