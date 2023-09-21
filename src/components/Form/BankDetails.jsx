import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';

const validationSchema = yup.object({
  applicant_name: yup.string().required('Applicant Name is required'),
  bank_name: yup.string().required('Bank Name is required'),
  branch_name: yup.string().required('Branch Name is required'),
  ifsc_num: yup.string().required('IFSC Number is required'),
  account_num: yup
    .number()
    .required('Account Number is required')
    .typeError('Account Number must be a number')
    .positive('Account Number must be a positive number')
    .integer('Account Number must be an integer'),
});

function BankDetails({ formData, onFormDataChange }) {
  const formik = useFormik({
    initialValues: {
      applicant_name: formData.applicant_name || '', // Initialize with formData if available
      bank_name: formData.bank_name || '', // Initialize with formData if available
      branch_name: formData.branch_name || '', // Initialize with formData if available
      ifsc_num: formData.ifsc_num || '', // Initialize with formData if available
      account_num: formData.account_num || '', // Initialize with formData if available
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      // No need for onSubmit here since you want to submit all data together
    },
    enableReinitialize: true, // Allow formik to reinitialize with new initialValues
  });

  // Update the shared form data when this form step is changed
  React.useEffect(() => {
    onFormDataChange({
      applicant_name: formik.values.applicant_name,
      bank_name: formik.values.bank_name,
      branch_name: formik.values.branch_name,
      ifsc_num: formik.values.ifsc_num,
      account_num: formik.values.account_num,
    });
  }, [formik.values, onFormDataChange]);

  return (
    <Container>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Applicant Name"
              name="applicant_name"
              value={formik.values.applicant_name}
              onChange={formik.handleChange}
              error={formik.touched.applicant_name && Boolean(formik.errors.applicant_name)}
              helperText={formik.touched.applicant_name && formik.errors.applicant_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bank Name"
              name="bank_name"
              value={formik.values.bank_name}
              onChange={formik.handleChange}
              error={formik.touched.bank_name && Boolean(formik.errors.bank_name)}
              helperText={formik.touched.bank_name && formik.errors.bank_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Branch Name"
              name="branch_name"
              value={formik.values.branch_name}
              onChange={formik.handleChange}
              error={formik.touched.branch_name && Boolean(formik.errors.branch_name)}
              helperText={formik.touched.branch_name && formik.errors.branch_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="IFSC Number"
              name="ifsc_num"
              value={formik.values.ifsc_num}
              onChange={formik.handleChange}
              error={formik.touched.ifsc_num && Boolean(formik.errors.ifsc_num)}
              helperText={formik.touched.ifsc_num && formik.errors.ifsc_num}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Account Number"
              name="account_num"
              value={formik.values.account_num}
              onChange={formik.handleChange}
              error={formik.touched.account_num && Boolean(formik.errors.account_num)}
              helperText={formik.touched.account_num && formik.errors.account_num}
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default BankDetails;
