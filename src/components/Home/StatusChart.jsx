import React from 'react';
import { Card, Container } from '@mui/material';
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
  // ... (your dataset)
];

export default function VerticalBars() {
  return (
    <Card sx={{ opacity: '0.75',filter: 'drop-shadow(5px 5px 4px gray)' }}>
      <Container>
        <ResponsiveContainer width="100%" height='100%'>
          <BarChart data={dataset} >
            <XAxis dataKey="department" angle={-45} textAnchor="end" interval={0} style={{fontSize:'10px'}}/>
            <YAxis label={{ value: 'No. of Employees', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <CartesianGrid/>
            <Bar dataKey="employee" fill="#8884d8" name="No. of Employees" />
            {/* Add more Bar components for other cities if needed */}
          </BarChart>
        </ResponsiveContainer>
      </Container>
    </Card>
  );
}
