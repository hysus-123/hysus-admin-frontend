import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor:'#2E3B55',
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


export default function App() {
  const base_url = process.env.REACT_APP_BASE_URL
  console.log(base_url, "base_url")
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([])
  useEffect(()=>{
    getAllEmployee();
  },[])

  function getAllEmployee(){
    axios
    .get(`${base_url}/employee`)
    .then(response =>{
      console.log(response, 'responseeeee'); 
      setEmployeeData(response.data);
    })
    .catch(err=>{
      console.log(err,"err--->");
    })
  }
  const handleDetailsClick = (id) => {
    console.log(id, 'id');
    axios.get(`${base_url}/employee/${id}`)
    .then(response =>{
      console.log(response,"response..");
      navigate(`/emp-dashboard/${id}`);
    })
    console.log("detailsButton Clicked")
  }
  const handleEditClick = (id) => {
    console.log(id, 'id');
    console.log("editButton Clicked")
    navigate(`/emp-editForm/${id}`);
  }

  const handlePreviewClick =(id)=>{
    console.log('preview button clicked');
    navigate(`/emp-profile/${id}`);
  }

  return (
  <>
  
      <Button variant="contained"  style={{ margin: '20px' , display:'inline', float:'right', backgroundColor:'#2E3B55'}} component={Link}
          to="/emp-form">
        <AddIcon /> Add 
      </Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Id</StyledTableCell>
            <StyledTableCell align='center'>Full Name</StyledTableCell>
            <StyledTableCell align='center'>Phone No.</StyledTableCell>
            <StyledTableCell align='center'>Email Id</StyledTableCell>
            <StyledTableCell align='center'>Status</StyledTableCell>
            <StyledTableCell align='center'>Details</StyledTableCell>
            <StyledTableCell align='center'>Preview</StyledTableCell>
            <StyledTableCell align='center'>Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((employee) => (
            <StyledTableRow key={employee.id}>
              <StyledTableCell component="th" scope="row" align='center'>
                HYS-{employee.emp_id}
              </StyledTableCell>
              <StyledTableCell align="center">{employee?.as_basicInfo?.name}</StyledTableCell>
              <StyledTableCell align="center">{employee?.as_basicInfo?.phone}</StyledTableCell>
              <StyledTableCell align="center">{employee.email}</StyledTableCell>
              <StyledTableCell align="center">{employee.status}</StyledTableCell>
              <StyledTableCell align="center">
                <Button  onClick={() => handleDetailsClick(employee.id)}><VisibilityIcon color='success'/></Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button  onClick={() => handlePreviewClick(employee.id)}><VisibilityIcon color='secondary'/></Button>             
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button  onClick={() => handleEditClick(employee.id)}><EditIcon sx={{ color: '#2E3B55' }}/></Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

