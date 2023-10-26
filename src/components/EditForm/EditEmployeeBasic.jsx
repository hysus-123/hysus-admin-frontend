import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Divider, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import axios from 'axios';

const EditBasicDetails = ({ data, onSave, id }) => {
  const [basicInfo, setBasicInfo] = useState({ ...data });
  const new_id = id;
  console.log(new_id);

  const handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    // const { name, value } = event.target;
    // setBasicInfo({ ...basicInfo?.as_basicInfo, [name]: value });
    const { name, value } = event.target;
  setBasicInfo((prevBasicInfo) => ({
    ...prevBasicInfo,
    as_basicInfo: {
      ...prevBasicInfo.as_basicInfo,
      [name]: value,
    },
  }));
  };

  const base_url = process.env.REACT_APP_BASE_URL

  const handleSave = () => {
    onSave(basicInfo?.as_basicInfo);
    console.log(basicInfo, "basicInfo");

    axios.patch(`${base_url}/employee/${id}?base_id=${basicInfo.emp_id}`, basicInfo)
    .then((response)=>{
      console.log(response);
    })
    .catch((err)=>{
      console.log(err);
    })

  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const qualification = ["10", "10+2", "graduate", "undergraduate", "postgraduate", "pHD", "others"];

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
            value={basicInfo?.as_basicInfo?.name}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="personal_email"
            label="Personal Email"
            fullWidth
            value={basicInfo?.as_basicInfo?.personal_email}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="spouse_name"
            label="Spouse Name"
            fullWidth
            value={basicInfo?.as_basicInfo?.spouse_name}
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
            value={basicInfo?.as_basicInfo?.alternative_number}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Birth Date"
            name="birth_date"
            fullWidth
            value={basicInfo?.as_basicInfo?.birth_date}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant='outlined'>
            <InputLabel id="bloodgroup">Blood Group</InputLabel>
            <Select
              fullWidth
              label="Blood Group"
              name="blood_group"
              value={basicInfo?.as_basicInfo?.blood_group}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {bloodGroups.map((blood_group) => (

                <MenuItem value={blood_group} key={blood_group}>
                  {blood_group}
                </MenuItem>
              ))}
              
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="linkedin_link"
            label="LinkedIn Profile"
            fullWidth
            value={basicInfo?.as_basicInfo?.linkedin_link}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="phone"
            label="Phone Number"
            fullWidth
            value={basicInfo?.as_basicInfo?.phone}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant='outlined'>
            <InputLabel id="qualification">Qualification</InputLabel>
            <Select
              fullWidth
              label="Qualification"
              name="qualification"
              value={basicInfo?.as_basicInfo?.qualification}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {qualification.map((qual) => (

                <MenuItem value={qual} key={qual}>
                  {qual}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
