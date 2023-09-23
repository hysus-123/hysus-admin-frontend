import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import {Button} from '@mui/material';
import axios from 'axios';

const validationSchema = yup.object({
  employee_name: yup.string().required('Employee name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  designation: yup.string().required('Designation is required'),
  employee_type: yup.string().required('Employee Type is required'),
  joining_date: yup.date().nullable(),
  end_date: yup.date().nullable(),
  skype_id: yup.string(),
  reported_to: yup.string().required('Reported To is required'),
  emp_id: yup.string(),
  office_number: yup.string(),
  skills: yup.string(),
  image: yup.mixed().required('Image is required'), // Added image validation
});

function EmployeeDetails({ formData, onFormDataChange }) {
  const [designationOptions, setDesignationOptions] = useState([]);
  const [reportToOptions, setReportToOptions] = useState([]);
  const department = formData.department || '';

  const formik = useFormik({
    initialValues: {
      employee_name: formData.employee_name || '',
      email: formData.email || '', // Initialize with formData if available
      designation: formData.designation || '', // Initialize with formData if available
      employee_type: formData.employee_type || '', // Initialize with formData if available
      joining_date: formData.joining_date || null, // Initialize with formData if available
      end_date: formData.end_date || null, // Initialize with formData if available
      skype_id: formData.skype_id || '', // Initialize with formData if available
      reported_to: formData.reported_to || '', // Initialize with formData if available
      emp_id: formData.emp_id || '', // Initialize with formData if available
      office_number: formData.office_number || '', // Initialize with formData if available
      skills: formData.skills || '', // Initialize with formData if available
      image: null, // Image upload
      
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      // No need for onSubmit here since you want to submit all data together
    },
    enableReinitialize: true, // Allow formik to reinitialize with new initialValues
  });

  const base_url = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    // Fetch designation options from the backend API
    getDesignation();
    

    // Fetch reportTo options from the backend API
    // axios.get('/api/reporttos').then((response) => {
    //   setReportToOptions(response.data);
    // });
  }, []);

  const getDesignation = () =>{
    axios.get(`${base_url}/designation`)
    .then((response) => {
      console.log(response.data,"designation");
      setDesignationOptions(response.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  // Update the shared form data when this form step is changed
  useEffect(() => {
    onFormDataChange({
      employee_name: formik.values.employee_name,
      email: formik.values.email,
      designation: formik.values.designation,
      employee_type: formik.values.employee_type,
      joining_date: formik.values.joining_date,
      end_date: formik.values.end_date,
      skype_id: formik.values.skype_id,
      reported_to: formik.values.reported_to,
      emp_id: formik.values.emp_id,
      office_number: formik.values.office_number,
      skills: formik.values.skills,
      // Don't include image data in the formData to prevent unnecessary re-renders
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
            <TextField
              fullWidth
              label="Employee Name"
              name="employee_name"
              value={formik.values.employee_name}
              onChange={formik.handleChange}
              error={formik.touched.employee_name && Boolean(formik.errors.employee_name)}
              helperText={formik.touched.employee_name && formik.errors.employee_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Hysus Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <Autocomplete
              fullWidth
              options={designationOptions.map((designation) => designation.position)} // Assuming each department object has a 'name' field
              value={formik.values.designation || ''}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              onChange={(event, newValue) => {
                formik.setFieldValue('designation', newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Designation"
                  name="designation"
                  error={formik.touched.designation && Boolean(formik.errors.designation)}
                  helperText={formik.touched.designation && formik.errors.designation}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              options={['permanent', 'temporary']} // Employee Type dropdown options
              isOptionEqualToValue={(option, value) => option.value === value.value}
              value={formik.values.employee_type ||''}
              onChange={(event, newValue)=>{
                onFormDataChange({employee_type: newValue})
                formik.setFieldValue('employee_type',newValue)
              } }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Employee Type"
                  name="employee_type"
                  error={formik.touched.employee_type && Boolean(formik.errors.employee_type)}
                  helperText={formik.touched.employee_type && formik.errors.employee_type}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Joining Date"
              name="joining_date"
              value={formik.values.joining_date}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              name="end_date"
              value={formik.values.end_date}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Skype ID"
              name="skype_id"
              value={formik.values.skype_id}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* 
              <Autocomplete
                fullWidth
                options={reportToOptions}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Reported To"
                    name="reported_to"
                    value={formik.values.reported_to}
                    onChange={formik.handleChange}
                    error={formik.touched.reported_to && Boolean(formik.errors.reported_to)}
                    helperText={formik.touched.reported_to && formik.errors.reported_to}
                  />
                )}
              />
            */}
            <TextField
              fullWidth
              label="Reported To"
              name="reported_to"
              value={formik.values.reported_to || ''}
              onChange={formik.handleChange}
              error={formik.touched.reported_to && Boolean(formik.errors.reported_to)}
              helperText={formik.touched.reported_to && formik.errors.reported_to}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            
              <TextField
                fullWidth
                label="Employee ID"
                name="emp_id"
                value={formik.values.emp_id}
                onChange={formik.handleChange}
              />
           
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Office Number"
              name="office_number"
              value={formik.values.office_number}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Skills"
              name="skills"
              value={formik.values.skills}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* Access the department value here */}
            <div>Department: {department}</div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(event) => {
                const selectedImage = event.currentTarget.files[0];
                console.log('Selected Image:', selectedImage);
                formik.setFieldValue('image', selectedImage);
                console.log(formik.values);
              }}
            />
            <label htmlFor="image">
              <Button component="span" variant="contained" color="primary">
                Upload Image
              </Button>
            </label>
            <span>{formik.errors.image && formik.touched.image && formik.errors.image}</span>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default EmployeeDetails;
