import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import axios from 'axios';
import {Select, MenuItem, InputLabel, FormControl} from '@mui/material';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const qualification = ['10', '10+2','Graduation', 'Post Graduation','others']

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  personal_email: yup
    .string()
    .email('Invalid email address')
    .required('Personal Email is required'),
  spouse_name: yup.string(),
  alternative_number: yup.string(),
  phone: yup.string(),
  birth_date: yup.date().nullable().required('Birth Date is required'),
  blood_group: yup.string().required('Blood Group is required'),
  linkedin_link: yup.string().url('Invalid LinkedIn URL'),
  qualification: yup.string(),
  department: yup.string().required('Department is required'),
});

function EmployeeBasic({ formData, onFormDataChange }) {

  const [departments, setDepartments] = useState([]);

  const base_url = process.env.REACT_APP_BASE_URL
  
  // Fetch departments from your backend API when the component mounts
  useEffect(() => {
    // Replace 'yourApiEndpoint' with the actual API endpoint to fetch departments
    axios.get(`${base_url}/department`)
      .then((response) =>{
        console.log(response.data);
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: formData.name || '',
      personal_email: formData.personal_email || '',
      spouse_name: formData.spouse_name || '',
      alternative_number: formData.alternative_number || '',
      phone: formData.phone || '',
      birth_date: formData.birth_date || null,
      blood_group: formData.blood_group || '',
      linkedin_link: formData.linkedin_link || '',
      qualification: formData.qualification || '',
      department: formData.department || '',
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
      name: formik.values.name,
      personal_email: formik.values.personal_email,
      spouse_name: formik.values.spouse_name,
      alternative_number: formik.values.alternative_number,
      phone: formik.values.phone,
      birth_date: formik.values.birth_date,
      blood_group: formik.values.blood_group,
      linkedin_link: formik.values.linkedin_link,
      qualification: formik.values.qualification,
      department: formik.values.department,
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
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Personal Email"
              name="personal_email"
              value={formik.values.personal_email}
              onChange={formik.handleChange}
              error={formik.touched.personal_email && Boolean(formik.errors.personal_email)}
              helperText={formik.touched.personal_email && formik.errors.personal_email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Spouse/Guardian Name"
              name="spouse_name"
              value={formik.values.spouse_name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Alternative Number"
              name="alternative_number"
              value={formik.values.alternative_number}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Birth Date"
              name="birth_date"
              value={formik.values.birth_date}
              onChange={formik.handleChange}
              error={formik.touched.birth_date && Boolean(formik.errors.birth_date)}
              helperText={formik.touched.birth_date && formik.errors.birth_date}
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
              value={formik.values.blood_group || ''}
              onChange={formik.handleChange}
              error={formik.touched.blood_group && Boolean(formik.errors.blood_group)}
            >
              {bloodGroups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth  variant="outlined">
            <InputLabel id="qualification">Qualification</InputLabel>
            <Select
              fullWidth
              label="Qualification"
              name="qualification"
              value={formik.values.qualification || ''}
              onChange={formik.handleChange}
              error={formik.touched.qualification && Boolean(formik.errors.qualification)}
            >
              {qualification.map((qual) => (
                <MenuItem key={qual} value={qual}>
                  {qual}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="LinkedIn Link"
              name="linkedin_link"
              value={formik.values.linkedin_link}
              onChange={formik.handleChange}
              error={formik.touched.linkedin_link && Boolean(formik.errors.linkedin_link)}
              helperText={formik.touched.linkedin_link && formik.errors.linkedin_link}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant='outlined'>
              <InputLabel id="department">Department</InputLabel>
            <Select
              fullWidth
              label="Department"
              labelId='Department'
              name="department"
              value={formik.values.department || ''}
              onChange={formik.handleChange}
              error={formik.touched.department && Boolean(formik.errors.department)}
            >
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.department}
                </MenuItem>
              ))}
            </Select>
            
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default EmployeeBasic;
