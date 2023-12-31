import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper, Button, MenuItem, Select, Typography, Container} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import HorizontalDropdown from './HorizontalDropDown';
import './HorizontalDropDown.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [selectedClass, setSelectedClass] = useState(""); 
  const currentDate = new Date();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isDateChanged = (storedDate) => {
    const today = new Date();
    return (
      today.getDate() !== storedDate.getDate() ||
      today.getMonth() !== storedDate.getMonth() ||
      today.getFullYear() !== storedDate.getFullYear()
    );
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('attendanceData')) || {};
    const { date = new Date(), submittedIds = [] } = storedData;

    if (isDateChanged(new Date(date))) {
      // If the date has changed, reset the submitted status
      setIsSubmitted([]);
    } else {
      // Otherwise, set the submitted IDs from the stored data
      setIsSubmitted(submittedIds);
    }

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

  // useEffect(() => {
  //   // Load the submitted IDs from localStorage
  //   const submittedIds = JSON.parse(localStorage.getItem('submittedIds')) || [];
  //   setIsSubmitted(submittedIds);
  // }, []);

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
        setSnackbarMessage('Attendance submitted successfully');
        setSnackbarOpen(true);
        setIsSubmitted([...isSubmitted, id]);
        // setIsSubmitted((prevSubmitted) => [...prevSubmitted, id]);
        const storedData = {
          date: currentDate,
          submittedIds: [...isSubmitted, id],
        };
        localStorage.setItem('attendanceData', JSON.stringify(storedData));
        // Update the submitted IDs in localStorage
        // localStorage.setItem('submittedIds', JSON.stringify([...isSubmitted, id]));
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage(err.response?.data.message);
        setSnackbarOpen(true);
      });
  };
  
  const activeEmployee = rows.filter(item => item.status === 'active');

  return (
    <>
    <Container>
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleSnackbarClose}
        severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
      >
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
    {/* <Typography>Select Date - <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} /></Typography> */}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            {/* <StyledTableCell>{new Date(currentDate.getTime()).toLocaleDateString()}</StyledTableCell> */}
            <StyledTableCell>{selectedDate.toLocaleDateString()}</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {activeEmployee.map((row, index) => (
          <StyledTableRow key={row.id} size="small">
            <StyledTableCell>{row?.employee_name}</StyledTableCell>
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
                <MenuItem value="leave">ALWP</MenuItem>
                <MenuItem value="leave">ULWP</MenuItem>
              </Select>
            </StyledTableCell>
            <StyledTableCell>
              <Button
                variant="contained"
                onClick={() => submitAttend(row.id, index)}
                size="small"
                disabled={isSubmitted.includes(row.id)}
              >
                {isSubmitted.includes(row.id) ? "Submitted" : "Submit"}
              </Button>
            </StyledTableCell>
          </StyledTableRow>
        ))}

        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </>
  );
}
