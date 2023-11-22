import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { Container, Button } from '@mui/material';

const validationSchema = yup.object({
  address_type: yup.string().required('Address Type is required'),
  line1: yup.string().required('Address Line 1 is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  zip_code: yup.string().required('Zip Code is required'),
});

function EmployeeAddress({onFormSubmit, employeeId, existingAddress }) {
  const formik = useFormik({
    initialValues: {
      type: existingAddress ? existingAddress[0].type : '', 
      line1: existingAddress ? existingAddress[0].line1 : '', 
      city: existingAddress ? existingAddress[0].city : '',
      state: existingAddress ? existingAddress[0].state : '', 
      country: existingAddress ? existingAddress[0].country : '',
      zip_code: existingAddress ? existingAddress[0].zip_code : '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        console.log(values,"values");
      onFormSubmit(values, employeeId );
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              options={['home', 'correspondence']} // Address Type dropdown options
              isOptionEqualToValue={(option, value) => option.value === value.value}
              value={formik.values.type}
              onChange={(event, newValue) => {
                formik.setFieldValue('type', newValue);
                console.log(newValue);
              }}
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
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default EmployeeAddress;
