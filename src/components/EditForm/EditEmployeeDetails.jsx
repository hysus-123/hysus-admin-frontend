import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Divider } from '@mui/material';
import axios from 'axios';

const EditBasicDetails = ({ data, onSave, id }) => {
  const [empInfo, setEmpInfo] = useState({ ...data });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmpInfo({ ...empInfo, [name]: value });
  };
  const base_url = process.env.REACT_APP_BASE_URL
  const handleSave = () => {
    onSave(empInfo);
    console.log(id, "id");
    console.log(empInfo, "empInfo");
    axios.patch(`${base_url}/employee/${id}`, empInfo)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Edit Employee Details
      </Typography>
      <Divider sx={{ marginY: '20px' }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="employee_name"
            label="Employee Name"
            fullWidth
            value={empInfo.employee_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="Hysus Email"
            fullWidth
            value={empInfo.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Joining Date"
            name="joining_date"
            fullWidth
            value={empInfo?.joining_date}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Provision End Date"
            name="end_date"
            fullWidth
            value={empInfo?.end_date}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="skype_id"
            label="Skype Id"
            fullWidth
            value={empInfo.skype_id}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="office_number"
            label="Office Number"
            fullWidth
            value={empInfo.office_number}
            onChange={handleInputChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="skills"
            label="Skills"
            fullWidth
            value={empInfo.skills}
            onChange={handleInputChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="Employee Type"
            label="employee_type"
            fullWidth
            value={empInfo.employee_type}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ marginTop: '20px' }}
      >
        Save
      </Button>
    </Paper>
  );
};

export default EditBasicDetails;
