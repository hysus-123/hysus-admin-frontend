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

  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([])
  useEffect(()=>{
    getAllEmployee();
  },[])

  function getAllEmployee(){
    axios
    .get(`https://hysus-admin-backend-production.up.railway.app/api/employee`)
    .then(response =>{
      console.log(response.data, 'response'); 
      console.log(response.data.as_designation, "as_desdfsdfd");
      setEmployeeData(response.data);
    })
    .catch(err=>{
      console.log(err,"err--->");
    })
  }
  const handleDetailsClick = (id) => {
    console.log(id, 'id');
    axios.get(`https://hysus-admin-backend-production.up.railway.app/api/employee/${id}`)
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
    navigate(`/emp-profile/${id}`)
  }

  return (
    <TableContainer component={Paper}>
      <Button variant="contained"  style={{ margin: '20px' , display:'inline-block', float:'right', backgroundColor:'#2E3B55'}} component={Link}
          to="/emp-form">
        <AddIcon /> Add New Employee
      </Button>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>EmpId</StyledTableCell>
            <StyledTableCell align='center'>Full Name</StyledTableCell>
            <StyledTableCell align='center'>Phone No.</StyledTableCell>
            <StyledTableCell align='center'>Email Id</StyledTableCell>
            <StyledTableCell align='center'>Department</StyledTableCell>
            <StyledTableCell align='center'>Details</StyledTableCell>
            <StyledTableCell align='center'>Preview</StyledTableCell>
            <StyledTableCell align='center'>Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((employee) => (
            <StyledTableRow key={employee.id}>
              <StyledTableCell component="th" scope="row" align='center'>
                {employee.id}
              </StyledTableCell>
              <StyledTableCell align="center">{employee.name}</StyledTableCell>
              <StyledTableCell align="center">{employee.phone}</StyledTableCell>
              <StyledTableCell align="center">{employee.email}</StyledTableCell>
              <StyledTableCell align="center">{employee.department}</StyledTableCell>
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
  );
}

