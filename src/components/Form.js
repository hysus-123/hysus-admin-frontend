import React, { useState , useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  Alert
} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextareaAutosize } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DropzoneArea } from 'material-ui-dropzone';
import ProjectModal from './ProjectModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import SideBar from '../pages/Sidebar/Sidebar'

const steps = ['User Details', 'Contact Information',  'Bank Details'];

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [departments, setdepartments] = useState([]);
  const [designations, setdesignations] = useState([]);
  const [reportedTo, setReportedTo] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [img , setImg] = useState([]);
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    phone:'',
    current_address:'',
    permanent_address:'',
    birth_date:'',
    blood_group:'',
    spouse_name:'',
    joining_date: '',
    reported_to:'',
    designation: '',
    skype_id: '',
    office_number: '',
    alternative_number: '',
    skills:'',
    personal_email:'',
    linkedin_link: '',
    bank_name:'',
    applicant_name:'',
    branch_name:'',
    ifsc_num:'',
    account_num: '',
  });

  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(()=>{
    clickDepartment();
    // clickDesignation();
  },[])
  const navigate = useNavigate();

  const clickDepartment=()=>{
    axios.get(`${base_url}/department`)
    .then(response=>{
      console.log(response, "response dept");
      setdepartments(response.data);
    })
  }
  const clickDesignation = (value) => {
    // const queryParam = selectedDepartment ? `` : '';
    const newVal = value;
    
    axios.get(`${base_url}/designation?department=${newVal}`)
      .then(response => {
        console.log(response, "response designation");
        setdesignations(response.data);
      })
      .catch(error => {
        console.error("Error fetching designations:", error);
      });
  };
  const clickReportedTo = (value) => {
    const newVal = value;
    axios.get(`${base_url}/employee?level=4&dept=${newVal}`)
      .then(response => {
        console.log(response, "response reported to");
        // console.log(response.data[0], "as_reported");
        setReportedTo(response.data);
      })
      .catch(error => {
        console.error("Error fetching reported:", error);
      });
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log('handleChange:', name, value);

    const newValue = name === 'account_num' ? value : value;

    if (name === 'birth_date' || name === 'joining_date') {
      const isoDate = new Date(value).toISOString();
      console.log(isoDate,'isoDate');
      setUserData((prevData) => ({
        ...prevData,
        [name]: isoDate,
      }));
      console.log(isoDate,"isodate");
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
      console.log(newValue, "newValue");
      
      if (name === 'department') {
        console.log(value, 'value of department');
        setSelectedDepartment(value);
        clickDesignation(value);
        clickReportedTo(value);
      }
    }
  };

  
  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        // Add validation logic for step 0 fields
        return !!userData.name && !!userData.email && !!userData.phone && !!userData.current_address && !!userData.birth_date && !!userData.department  ;

      case 1:
        // Add validation logic for step 1 fields
        return !!userData.designation && !!userData.linkedin_link && !! userData.joining_date ;

      // Add similar validation logic for other steps
      case 2: 
        return !!userData.bank_name && !!userData.account_num && !!userData.ifsc_num;

      default:
        return true;
    }
  };

  const handleNext = () => {
    
    if (isStepValid()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setAlertOpen(false);
    } else {
      alert('Please fill out all required fields before proceeding.');
      setAlertOpen(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = async() => {
    try{
      const isSuccess = await handleFormSubmit();
      console.log(isSuccess, "isSuccess");
      if(isSuccess ){
        console.log("employee create successfully");
        setUserData([]);
        navigate('/emp-list');
        <Alert severity="success">Employee Details Successfully created</Alert>

      }else{
        console.log("something is wrong");
        
      }
    }catch(err){
      console.log(err);
    }
    
  };

  const handleFormSubmit = async() => {
    console.log(userData,"userData");
    try{
      const formData = new FormData();
      formData.append('img', img[0]); 
  
      // Append the rest of the user data fields
      for (const key in userData) {
        if (key !== 'img') {
          formData.append(key, userData[key]);
        }
      }
      console.log(formData, "formData");
      console.log(formData.getAll('department'));
      console.log(formData.getAll('img'));
      const response = await axios.post(`${base_url}/employee`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for FormData
        },
      });
      console.log(response, "data for storing");
      return true;
    }
    catch (error) {
        console.log('An error occurred during form submission:', error);
        alert(error.response.data[0].constraints.isEmail || error.response.data[0].constraints.isUrl || error.response.data[0].constraints.minLength || error.response?.data?.error)
    }
  };

  

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={1}>
            
            <Grid item xs={12} sm={3}>
              <div style={{
                width: '150px',
                height: '100%',
                borderRadius: '50px',
                cursor: 'pointer',
                opacity: '0.5',
              }}>
                {/* <DropzoneAreaBase
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image here or click"}
                  // onChange={(files) => console.log('Files:', files)}
                  onChange = {handleImageChange}
                  onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                /> */}
                {/* <MDBFileupload /> */}
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image here or click"}
                  onChange={(files) => {
                    console.log('Files:', files)
                    setImg(files);
                  }}
                  onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                  // xs={{padding:'0px'}}
                  styles={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                  }}
                />
            
              
              </div>
            </Grid>
            <Grid item xs={12} sm={9}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                  <TextField
                  height = "5px"
                  label="Name "
                  variant="outlined"
                  name="name"
                 
                  value={userData.name}
                  
                  onChange={handleChange}
                  margin="normal"
                  required
                  fullWidth
                />
                </Grid>
                <Grid item xs={12} sm={5} style={{marginLeft:"16px"}}>
                  
                <TextField
                  height = "5px"
                  label="Hysus Email"
                  variant="outlined"
                  name="email"
                  required
                  value={userData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                      height = "5px"
                    label="Phone"
                    variant="outlined"
                    name="phone"
                    required
                    value={userData.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={5} style={{marginTop:'8px', marginLeft:'16px'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']} >
                    <DatePicker label="Birth Date" 
                    name="birth_date"
                    required
                    onChange={(date)=>{
                      console.log("date", date);
                      handleChange({target :{name:"birth_date", value: date}})
                    }}/>
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                  
                  <Grid item xs={12}>
                  <TextField
                    height = "5px"
                    label="Current Address"
                    variant="outlined"
                    name="current_address"
                    required
                    value={userData.current_address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  </Grid>

                  <Grid item xs={12}>
                  <TextField
                        height = "5px"
                      label="Permanent Address"
                      variant="outlined"
                      name="permanent_address"
                      required
                      value={userData.permanent_address}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} sm={4}>
                <TextField
                height = "5px"
              label="Spouse/Gaurdian Name"
              variant="outlined"
              name="spouse_name"
              
              value={userData.spouse_name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel id="departmentLabel">Blood Group</InputLabel>
                <Select
                  labelId="bloodgroupId"
                  label="Blood Group"
                  name="blood_group"
                  required
                  value={userData.blood_group}
                  onChange={handleChange}
                >
                <MenuItem value="A+">A Positive</MenuItem>
                <MenuItem value="A-">A Negative</MenuItem>
                <MenuItem value="B+">B Positive</MenuItem>
                <MenuItem value="B-">B Negative</MenuItem>
                <MenuItem value="AB+">AB Positive</MenuItem>
                <MenuItem value="AB-">AB Negative</MenuItem>
                <MenuItem value="O+">O Positive</MenuItem>
                <MenuItem value="O-">O Negative</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* <Grid item xs={12} sm={4} >
              <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="designationLabel">Designation</InputLabel>
              <Select
                labelId="designationLabel"
                label="Designation"
                name="designation"
                required
                value={userData.designation}
                onChange={handleChange}
              >
                {designations.map(designation => (
                <MenuItem key={designation.id} value={designation.id}>
                  {designation.position}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
            </Grid> */}

            <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal" variant="outlined" 
                >
              <InputLabel id="departmentLabel">Department</InputLabel>
              <Select
                labelId="departmentLabel"
                label="Department"
                name="department"
                required
                value={userData.department}
                onChange={handleChange}
              >
              {departments.map(department => (
                <MenuItem key={department.id} value={department.id}>
                  {department.department}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
            </Grid>
        </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Office Number"
                variant="outlined"
                name="office_number"
                value={userData.office_number}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Alternative Number"
                variant="outlined"
                name="alternative_number"
                value={userData.alternative_number}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4} >
              <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="designationLabel">Designation</InputLabel>
              <Select
                labelId="designationLabel"
                label="Designation"
                name="designation"
                required
                value={userData.designation}
                onChange={handleChange}
              >
                {designations.map(designation => (
                <MenuItem key={designation.id} value={designation.id}>
                  {designation.position}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} >
              <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="reportedTo">Reported To</InputLabel>
              <Select
                labelId="reportedTo"
                label="reported_to"
                name="reported_to"
                required
                value={userData.reported_to}
                onChange={handleChange}
              >
                {reportedTo.map(reported => (
                <MenuItem key={reported.id} value={reported.id}>
                  {reported.name}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
            </Grid>

            
            <Grid item xs={12} sm={4}>
              <TextField
                label="Skype Id"
                variant="outlined"
                name="skype_id"
                value={userData.skype_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={4} style={{marginTop:'8px', }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Joining Date" 
                    name="joining_date"
                    onChange={(date)=>{
                      console.log("date", date);
                      handleChange({target :{name:"joining_date", value: date}})
                    }}/>
                  </DemoContainer>
                </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={4} >
                  
                <TextField
                  height = "5px"
                  label="Personal Email"
                  variant="outlined"
                  name="personal_email"
                  required
                  value={userData.personal_email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                label="LinkedIn Profile"
                variant="outlined"
                name="linkedin_link"
                required
                value={userData.linkedin_link}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        );
     
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                  label="Bank Name"
                  variant="outlined"
                  name="bank_name"
                  required
                  value={userData.bank_name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  label="Name of Applicant"
                  variant="outlined"
                  name="applicant_name"
                  required
                  value={userData.applicant_name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  label="Bank Branch Name"
                  variant="outlined"
                  name="branch_name"
                  required
                  value={userData.branch_name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  label="Account Number"
                  variant="outlined"
                  name="account_num"
                  required
                  value={userData.account_num}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  label="IFSC Code"
                  variant="outlined"
                  name="ifsc_num"
                  required
                  value={userData.ifsc_num}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <>
    {/* <Box sx={{display: 'flex'}}>
    <SideBar/> */}
    <Container component={Paper} maxWidth="md" sx={{ mt: 2, p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <p>Form Submitted</p>
          </div>
        ) : (
          <div>
            {renderStepContent(activeStep)}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" color="primary" onClick={handleFinish}>
                  Finish
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
            {alertOpen && (
              <Alert severity="error">Please fill out all required(*) fields before proceeding.</Alert>
            )}
          </div>
        )}
      </div>
    </Container>
    
    {/* </Box> */}
    </>
  );
};

export default StepperForm;
