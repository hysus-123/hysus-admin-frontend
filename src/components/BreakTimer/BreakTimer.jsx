import React, { useEffect, useState } from 'react';
import { Card, Typography, Box, Container, Button, TextField } from '@mui/material';
import SideBar from '../../pages/Sidebar/Sidebar';
import DatePicker from 'react-datepicker';
import axios from 'axios';

const BreakTimer = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [time, setTime] = useState('');
  const [breakTimes, setBreakTimes] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const base_url = process.env.REACT_APP_BASE_URL;

  const fetchEmployees = () => {
    axios.get(`${base_url}/employee`)
      .then((response) => {
        console.log(response);
        setEmployees(response.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const BreakTimeSearch = (id) => {
    const chooseDate = selectedDate;
    const year = chooseDate.getFullYear();
    const month = String(chooseDate.getMonth() +1).padStart(2,'0');
    const day = String(chooseDate.getDate()).padStart(2,'0');
    const formatDate = `${year}-${month}-${day}`;
    console.log(id,formatDate);

    axios.get(`${base_url}/performance?emp_id=${id}&date=${formatDate}`)
    .then((response)=>{
        console.log(response);
        setBreakTimes(prevTimes => ({
          ...prevTimes,
          [id]: response.data[0]?.breakTime || 'N/A' // Storing break time for the employee ID
        }));
    })
    .catch((err)=>{
        console.log(err);
    })
    
  };

  const handleChange = (date, id)=>{
    setSelectedDate(prevDate)
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Container sx={{ mt: 3 }}>
          <Card sx={{ padding: 4 }}>
            <Typography variant='h6' sx={{ textAlign: 'center' }}>Break Time</Typography>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Search</th>
                  <th style={{marginLeft:'10px'}}>Time</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((row) => (
                  <tr key={row.id}>
                    <td >HYS{row.emp_id}</td>
                    <td style={{textAlign:'center', marginLeft:"20px", marginRight:'20px'}}>{row.employee_name}</td>
                    <td>
                    <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                    </td>
                    <td>
                      <Button onClick={() => BreakTimeSearch(row.id)}>Search</Button>
                    </td>
                    <td style={{marginLeft:'10px'}}>{breakTimes[row.id] || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default BreakTimer;
