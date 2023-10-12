import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DashboardComponent from '../../pages/Employees/TabsContent/DashboardComponent';
import LeaveComponent from '../../pages/Employees/TabsContent/LeaveComponent';
import PerformanceComponent from '../../pages/Employees/TabsContent/PerformanceComponent';
import AttendanceComponent from '../../pages/Employees/TabsContent/AttendanceComponent';
import BreakTracker from '../../pages/Employees/TabsContent/BreakTracker';

export default function LabTabs() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabComponents = {
    '1': <DashboardComponent />,
    '2': <LeaveComponent />,
    '3': <AttendanceComponent />,
    '4': <PerformanceComponent />,
    '5': <BreakTracker/>,
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Dashboard" value="1" />
            <Tab label="Leave" value="2" />
            <Tab label="Attendence" value="3" />
            <Tab label="Performance" value="4" />
            <Tab label="Break Tracker" value="5" />
          </TabList>
        </Box>
        {Object.keys(tabComponents).map((tabValue) => (
          <TabPanel key={tabValue} value={tabValue}>
            {tabComponents[tabValue]}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
