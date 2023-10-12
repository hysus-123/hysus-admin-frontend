import React, { useState, useEffect } from 'react';
import Calendar from './TestCalendar';

function EmployeeAttendanceCalendar({ employeeId, selectedDate }) {
  const [attendanceData, setAttendanceData] = useState([]);

  const base_url = process.env.BASE_URL;

  // Fetch employee attendance data for the selected date
  useEffect(() => {
    // Make an API call to your backend to fetch attendance data
    // and set it in the state.
    // Replace this with your actual API call.
    
    fetchData();
  }, [employeeId, selectedDate]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${base_url}/api/attendance/${employeeId}/${selectedDate}`);
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  // Customize the rendering of calendar cells
  const customRenderCell = (date, view) => {
    // Check if the date is in attendanceData
    const attendanceEntry = attendanceData.find(entry => entry.date === date.toISOString());

    if (attendanceEntry) {
      // Date is found in attendance data
      return (
        <div style={{ backgroundColor: attendanceEntry.present ? 'green' : 'red' }}>
          {date.getDate()}
        </div>
      );
    } else {
      // Date not found in attendance data
      return (
        <div>
          {date.getDate()}
        </div>
      );
    }
  };

  return (
    <>
    <Calendar
      customRenderCell={customRenderCell}
      // Other calendar props here
      />
    </>
  );
}

export default EmployeeAttendanceCalendar;
