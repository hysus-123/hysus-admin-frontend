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
  Box,
} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextareaAutosize } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import { Edit } from '@mui/icons-material';
import SideBar from './Sidebar/Sidebar';

const steps = ['User Details', 'Contact Information', 'Professional Details', 'Bank Details'];



const EditForm = () => {
  const {id} = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [departments, setdepartments] = useState([]);
  const [designations, setdesignations] = useState([]);

  const [userData, setUserData] = useState({
    name: '',
    email:'',
    phone:'',
    current_address:'',
    permanent_address:'',
    birth_date:'',
    blood_group:'',
    spouse_name:'',
    department: '',
    joining_date: '',
    designation: '',
    skype_id: '',
    emp_id: '',
    office_number: '',
    alternative_number: '',
    skills:'',
    linkedin_link: '',
    bank_name:'',
    ifsc_num:'',
    account_num: '',
  });

  useEffect(()=>{
    employeeEditForm(id);
    clickDepartment();
    clickDesignation();
  },[id])
  const navigate = useNavigate();

  const employeeEditForm = (id)=>{
    console.log(id, "id");
    axios.get(`https://hysus-admin-backend-production.up.railway.app/api/employee/${id}`)
    .then(response =>{
        console.log(response.data, "from edit form");
        const fetchedEmpData = response.data; // Assuming the response contains employee details
        setUserData({
          name: fetchedEmpData.name,
          email: fetchedEmpData.email,
          phone: fetchedEmpData.phone,
          birth_date: fetchedEmpData.birth_date,
          current_address: fetchedEmpData.current_address,
          permanent_address: fetchedEmpData.permanent_address,
          department: fetchedEmpData.department,
          designation: fetchedEmpData.designation,
          blood_group: fetchedEmpData.blood_group,
          spouse_name: fetchedEmpData.spouse_name,
          office_number: fetchedEmpData.office_number,
          alternative_number: fetchedEmpData.alternative_number,
          emp_id: fetchedEmpData.emp_id,
          skype_id: fetchedEmpData.skype_id,
          skills: fetchedEmpData.skills,
          joining_date: fetchedEmpData.joining_date,
          linkedin_link: fetchedEmpData.linkedin_link,
          bank_name: fetchedEmpData.bank_name,
          account_num: fetchedEmpData.account_num,
          ifsc_num: fetchedEmpData.ifsc_num

        });
    })
    .catch(err =>{
        console.log(err);
    })
  }

  const clickDepartment=()=>{
    axios.get(`https://hysus-admin-backend-production.up.railway.app/api/department`)
    .then(response=>{
      console.log(response, "response");
      setdepartments(response.data);
    })
  }
  const clickDesignation=()=>{
    axios.get(`https://hysus-admin-backend-production.up.railway.app/api/designation`)
    .then(response=>{
      console.log(response, "response");
      setdesignations(response.data);
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log('handleChange:', name, value);

    const newValue = name === 'account_num' ? parseFloat(value) : value;

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
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = async () => {
    try {
      const isSuccess = await handlePatchRequest();
      if (isSuccess) {
        console.log("Employee details updated successfully");
        navigate('/emp-list');
        // Optionally, you can show an alert here.
      } else {
        console.log("Something went wrong with the update");
      }
    } catch (err) {
      console.log(err);
    }
  };

  
  const handlePatchRequest = async () => {
    console.log(userData, "userData for edit");
    try {
      const response = await axios.patch(`https://hysus-admin-backend-production.up.railway.app/api/employee/${id}`, userData);
      console.log(response.data, "Updated employee data");
      return true; // Indicate success
    } catch (error) {
      console.log("An error occurred during patch request:", error);
      return false; // Indicate failure
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
                height: '150px',
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
                {/* <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image here or click"}
                  onChange={(files) => console.log('Files:', files)}
                  onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                  // xs={{padding:'0px'}}
                  styles={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                  }}
                /> */}
            
              
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
                  label="Email"
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
              label="Spouse Name"
              variant="outlined"
              name="spouse_name"
              
              value={userData.spouse_name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                height = "5px"
              label="Blood Group "
              variant="outlined"
              name="blood_group"
              
              value={userData.blood_group}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            </Grid>
            
            

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
                {/* <MenuItem value={1}>Developer</MenuItem> */}
                {/* Add more country codes as needed */}
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

            <Grid item xs={12} sm={4}> 
              <TextField
                label="Employee Id"
                variant="outlined"
                name="emp_id"
                disabled
                required
                value={userData.emp_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
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
          <Container sx={{mt:4}}>

            <Grid container spacing={2}>
              <Button
            type="button"
            variant="contained"
            color="primary"
            >
              <AddIcon/>
            Add Project
          </Button>
            </Grid>
            <Textarea minRows={2} sx={{mt:4}} name ="skills" value={userData.skills} placeholder='write your skills' onChange={handleChange}/>
          </Container>
        );
      case 3:
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
                  label="Account Number"
                  variant="outlined"
                  name="account_num"
                  
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
    <Box sx={{display:'flex'}}>
    <SideBar/>
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
          </div>
        )}
      </div>
    </Container>
    
    </Box>
    </>
  );
};

export default EditForm;
