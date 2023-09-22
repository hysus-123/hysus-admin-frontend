import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';

const validationSchema = yup.object({
  address_type: yup.string().required('Address Type is required'),
  line1: yup.string().required('Address Line 1 is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  zip_code: yup.string().required('Zip Code is required'),
});

function EmployeeAddress({ formData, onFormDataChange }) {
  const formik = useFormik({
    initialValues: {
      type: formData.type || '', // Initialize with formData if available
      line1: formData.line1 || '', // Initialize with formData if available
      city: formData.city || '', // Initialize with formData if available
      state: formData.state || '', // Initialize with formData if available
      country: formData.country || '', // Initialize with formData if available
      zip_code: formData.zip_code || '', // Initialize with formData if available
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
      type: formik.values.type,
      line1: formik.values.line1,
      city: formik.values.city,
      state: formik.values.state,
      country: formik.values.country,
      zip_code: formik.values.zip_code,
      // Don't include other fields in the formData to prevent unnecessary re-renders
    });
  }, [
    formik.values,
    onFormDataChange,
  ]);

  return (
    <Container>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              options={['home', 'correspondence']} // Address Type dropdown options
              isOptionEqualToValue={(option, value) => option.label === value}
              value={formik.values.type}
              onChange={(event, newValue)=>{
                onFormDataChange({type: newValue})
                formik.setFieldValue('type',newValue)
              } }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Address Type"
                  name="type"
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="line1"
              value={formik.values.line1}
              onChange={formik.handleChange}
              error={formik.touched.line1 && Boolean(formik.errors.line1)}
              helperText={formik.touched.line1 && formik.errors.line1}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Zip Code"
              name="zip_code"
              value={formik.values.zip_code}
              onChange={formik.handleChange}
              error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
              helperText={formik.touched.zip_code && formik.errors.zip_code}
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default EmployeeAddress;
