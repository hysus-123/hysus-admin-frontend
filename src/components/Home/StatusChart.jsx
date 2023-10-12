
import React from 'react';
import { Card, Container, Typography } from '@mui/material';
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

const dataset = [
  {
    department: 'HR',
    employee: 21
  },
  {
    department: 'Development',
    employee: 21
  },
  {
    department: 'Mr',
    employee: 25
  },
  {
    department: 'Graphics',
    employee: 33
  },
  {
    department: 'Bussiness',
    employee: 18
  },
  {
    department: 'Sales',
    employee: 29
  },
  {
    department: 'CEO',
    employee: 27
  },
  
];

export default function VerticalBars() {

  return (
    <Card sx={{ opacity: '0.75',filter: 'drop-shadow(5px 5px 4px gray)', padding:'20px' }}>
      <Container>
        <Typography variant='h6' sx={{fontFamily:'poppins', textAlign:'center'}}>
              <SettingsIcon style={{color:'#e2a600', fontFamily:'poppins',mt:1}}/>
                Department
        </Typography>
        <ResponsiveContainer width="100%" height={255}>
          <BarChart data={dataset} sx={{padding:'20px'}}>
            <XAxis dataKey="department" angle={-45} textAnchor="end" interval={0} style={{ fontSize: '10px' }} />
            <YAxis label={{ value: 'No. of Employees', angle: -90, position: 'position' }} />
            <Legend verticalAlign="top" align='right'/>
            <Tooltip />
            <Bar dataKey="employee" fill="#8884d8" name="No. of Employees" />
            {/* <CartesianGrid  /> */}
            {/* Add more Bar components for other cities if needed */}
          </BarChart>
        </ResponsiveContainer>
      </Container>
    </Card>
  );
}
