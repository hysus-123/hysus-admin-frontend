import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Divider } from '@mui/material';

const EditBasicDetails = ({ data, onSave }) => {
  const [basicInfo, setBasicInfo] = useState({ ...data });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBasicInfo({ ...basicInfo, [name]: value });
  };

  const handleSave = () => {
    onSave(basicInfo);
  };

  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Edit Basic Details
      </Typography>
      <Divider sx={{ marginY: '20px' }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={basicInfo.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="personal_email"
            label="Personal Email"
            fullWidth
            value={basicInfo.personal_email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="spouse_name"
            label="Spouse Name"
            fullWidth
            value={basicInfo.spouse_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="alternative_number"
            label="Alternative Number"
            fullWidth
            value={basicInfo.alternative_number}
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
            value={basicInfo.birth_date}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="blood_group"
            label="Blood Group"
            fullWidth
            value={basicInfo.blood_group}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="linkedin_link"
            label="LinkedIn Profile"
            fullWidth
            value={basicInfo.linkedin_link}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="phone"
            label="Phone Number"
            fullWidth
            value={basicInfo.phone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="qualification"
            label="Qualification"
            fullWidth
            value={basicInfo.qualification}
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
