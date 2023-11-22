import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Divider } from '@mui/material';
import axios from 'axios';

const EditBasicDetails = ({ data, onSave , id}) => {
  const [bankInfo, setBankInfo] = useState({ ...data });

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setBankInfo((prevBankInfo)=>({
      ...prevBankInfo.bank_details,
      [name]: value,
    }));
  };

  const base_url = process.env.REACT_APP_BASE_URL
  const handleSave = () => {
    onSave(bankInfo);
    console.log(bankInfo, "bankInfo");

    axios.patch(`${base_url}/employee/${id}?bank_id=${data.bank_details.id}`, bankInfo)
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
        Edit Bank Details
      </Typography>
      <Divider sx={{ marginY: '20px' }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="applicant_name"
            label="Applicant Name"
            fullWidth
            value={bankInfo?.bank_details?.applicant_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="bank_name"
            label="Bank Name"
            fullWidth
            value={bankInfo?.bank_details?.bank_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="branch_name"
            label="Branch Name"
            fullWidth
            value={bankInfo?.bank_details?.branch_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="ifsc_num"
            label="IFSC Number"
            fullWidth
            value={bankInfo?.bank_details?.ifsc_num}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="account_num"
            label="Account Number"
            fullWidth
            value={bankInfo?.bank_details?.account_num}
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
