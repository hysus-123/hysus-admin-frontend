import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Divider } from '@mui/material';

const EditBasicDetails = ({ data, onSave }) => {
  const [empInfo, setEmpInfo] = useState({ ...data });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmpInfo({ ...empInfo, [name]: value });
  };

  const handleSave = () => {
    onSave(empInfo);
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
            name="alternative_number"
            label="Alternative Number"
            fullWidth
            value={empInfo.alternative_number}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="birth_date"
            label="Birth Date"
            // placeholder='Birth Date'
            type="date"
            fullWidth
            value={empInfo.birth_date}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="blood_group"
            label="Blood Group"
            fullWidth
            value={empInfo.blood_group}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="linkedin_link"
            label="LinkedIn Profile"
            fullWidth
            value={empInfo.linkedin_link}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="phone"
            label="Phone Number"
            fullWidth
            value={empInfo.phone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="qualification"
            label="Qualification"
            fullWidth
            value={empInfo.qualification}
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
