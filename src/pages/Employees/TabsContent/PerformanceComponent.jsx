import React from 'react'
import BarChart from '../../../components/EmployeeComponent/BarChart';
import { Card, Grid } from '@mui/material';
import DropDownMonth from '../../../components/EmployeeComponent/DropDownMonth';

const PerformanceComponent = () => {
  return (
    <>
    <Grid container spacing ={2}>
    <DropDownMonth/>
      <Grid item xs={12}>
          <BarChart/>
      </Grid>

    </Grid>
    
    </>
  )
}

export default PerformanceComponent
