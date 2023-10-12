import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper, Button, MenuItem, Select, Typography} from '@mui/material';
import HorizontalDropdown from './HorizontalDropDown';
import './HorizontalDropDown.css';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
  const base_url = process.env.REACT_APP_BASE_URL;
  const [rows, setRows] = useState([]);
  const [presentStatus, setPresentStatus] = useState([]);
  // const [selectedClass, setSelectedClass] = useState(""); 
  const currentDate = new Date();

  useEffect(() => {
    fetch(`${base_url}/employee`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'data');
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(()=>{
    fetchAllAttend();
  },[])

  const fetchAllAttend = () =>{
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);

    axios.get(`${base_url}/attendance?date=${formattedDate}`)
    .then((response)=>{
      console.log(response);
    })
    .catch((err)=>console.log(err));
  }

  const submitAttend = (id, index) => {
    const attendData = {
      presentStatus: presentStatus[index],
      employee: id,
    };
  
    axios
      .post(`${base_url}/attendance`, attendData)
      .then((response) => {
        console.log(response, "response");
        console.log(response.data.presentStatus, "response.data.presentStatus");
      })
      .catch((err) => console.log(err));
  };
  


  return (
    <>
    <div style={{textAlign:'center', padding:'6px'}}>
      Employee Attendance
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>{new Date(currentDate.getTime()).toLocaleDateString()}</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row, index) => (
          <StyledTableRow key={row.id} size="small">
            <StyledTableCell>{row?.as_basicInfo.name}</StyledTableCell>
            <StyledTableCell>
              <Select
                value={presentStatus[index] || ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setPresentStatus((prevState) => {
                    const newStatus = [...prevState];
                    newStatus[index] = newValue;
                    return newStatus;
                  });
                }}
                size="small"
              >
                <MenuItem value="absent">Absent</MenuItem>
                <MenuItem value="present">Present</MenuItem>
                <MenuItem value="halfday">Half Day</MenuItem>
                <MenuItem value="leave">Leave</MenuItem>
              </Select>
            </StyledTableCell>
            <StyledTableCell>
              <Button
                variant="contained"
                onClick={() => submitAttend(row.id, index)}
                size="small"
              >
                Submit
              </Button>
            </StyledTableCell>
          </StyledTableRow>
        ))}

        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
