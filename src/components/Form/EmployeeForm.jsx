import React, { useState } from 'react';
import { Container, Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import EmployeeDetails from './EmployeeDetails';
import EmployeeBasic from './EmployeeBasic';
import BankDetails from './BankDetails';
import EmployeeAddress from './EmployeeAddress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const steps = ['Basic Information', 'Employee Details', 'Bank Details', 'Employee Address'];

export default function HorizontalLinearStepper() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [alertErr, setAlertErr] = useState([]);
  const [formData, setFormData] = useState({
    // Initialize an empty object to store form data
    name: '',
    personal_email: '',
    spouse_name: '',
    alternative_number: '',
    phone: '',
    birth_date: null,
    blood_group: '',
    linkedin_link: '',
    qualification: '',
    linkedin_link:'',
    department:'',
    email: '',
    designation:'',
    employee_type:'',
    joining_date:null,
    end_date:null,
    skype_id:'',
    reported_to:'',
    office_number:'',
    skills:'',
    img:null,
    applicant_name:'',
    bank_name:'',
    branch_name:'',
    ifsc_num:'',
    account_num:'',
    type:'',
    line1:'',
    city:'',
    state:'',
    country:'',
    zip_code:''
    // Add fields from other form steps as needed
  });
  const [selectedimg, setSelectedImg] = useState(null);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFormDataChange = (newData) => {
    // Update the formData object with new data from each form step
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleImageChange = (img) => {
    // Update the selected image state
    setSelectedImg(img);
  };

  const base_url = process.env.REACT_APP_BASE_URL
  const handleSubmit = () => {
    // Send formData to your API
    console.log('Form Data:', formData);

    const formDataToSend = new FormData();
    console.log(selectedimg, 'selectedImg')
    formDataToSend.append('img', selectedimg);

    for (const key in formData) {
      if (key !== 'img') {
        formDataToSend.append(key, formData[key]);
      }
    }

    // for (const key in formData) {
    //   formDataToSend.append(key, formData[key]);
    // }
  
    // Log the formDataToSend object to check if the image is included
    console.log('FormData to Send:', formDataToSend);
  

    axios.post(`${base_url}/employee`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for FormData
      },
    })
    .then((response)=>{
      console.log(response);
      navigate('/emp-list');
    })
    .catch((err)=>{
      console.log(err);
      console.log(err.response.data, "err.data");
      setAlertErr(err?.response?.data)

    })
    // You can use Axios, fetch, or any other method to send the data to your API
    // Reset the form or perform any other necessary actions
  };

  return (
    <Container >
      <Box sx={{ width: '100%' }}>
        <div style={{textAlign:'center', fontWeight:'bold', }}>
          <h2 style={{textDecoration:'underline',marginBottom:'3%'}}>Employee Form</h2>
        </div>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography>
              <Stack sx={{width:'100%'}} spacing={2}>
                <Alert severity='error'>{alertErr?.error}</Alert>
              </Stack>
            </Typography>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            
            <Typography>
            <Stack sx={{ width: '100%' }} spacing={2}>
              {alertErr.map((altErr) => (
                Object.values(altErr?.constraints || {}).map((error, index) => (
                  <Alert key={index} severity="error">
                    {error}
                  </Alert>
                ))
              ))}
            </Stack>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Finish
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ mt: 2 }}>
              {activeStep === 0 && (
                <EmployeeBasic
                  formData={formData}
                  onFormDataChange={handleFormDataChange}
                                  />
              )}
              {activeStep === 1 && (
                <EmployeeDetails
                  formData={formData}
                  onFormDataChange={handleFormDataChange}
                  onImageChange={handleImageChange}                
                  />
              )}
              {activeStep === 2 && (
                <BankDetails
                  formData={formData}
                  onFormDataChange={handleFormDataChange}
                />
              )}
              {activeStep === 3 && (
                <EmployeeAddress
                  formData={formData}
                  onFormDataChange={handleFormDataChange}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
}
