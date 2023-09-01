import React, { useState } from 'react';
import Calendar from '../../../components/EmployeeComponent/Calender';
import { Card, Grid } from '@mui/material';
import CalendarReact from 'react-calendar';
import './AttendanceComp.css';

const AttendanceComponent = () => {
  // const [value, setValue] = useState(new Date());
  // const [highlightedDate, setHighlightedDate] = useState(null);

  // function onChange(nextValue) {
  //   console.log(nextValue, "nextValue");
  //   setValue(nextValue);
  // }

  // function tileContent({ date, view }) {
  //   if (highlightedDate && view === 'month') {
  //     // Check if the current date is the highlighted date
  //     if (date.getDate() === highlightedDate.getDate() &&
  //         date.getMonth() === highlightedDate.getMonth() &&
  //         date.getFullYear() === highlightedDate.getFullYear()) {
  //       return <div className="highlighted-date"></div>;
  //     }
  //   }
  //   return null;
  // }

  
  return (
    
    <>
      <Grid container spacing={2}>
        
        <Grid item xs={12} >
          <Card>
            <Calendar />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AttendanceComponent;
