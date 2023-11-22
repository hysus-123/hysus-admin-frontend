import React from 'react';
import { Box, Button, Container } from '@mui/material';
import SideBar from '../../pages/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import EditBankDetails from './EditBankDetails'
import EditEmployeeAddress from './EditEmployeeAddress'
import EditBasicDetails from './EditEmployeeBasic';
import EditEmployeeDetails from './EditEmployeeDetails';
import {Typography} from '@mui/material';

const EditForm = () => {

    const base_url = process.env.REACT_APP_BASE_URL;
    const {id} = useParams();
    const [employeeData, setEmployeeData] = useState({});
    const [editSection, setEditSection] = useState(null);

    useEffect(()=>{
        fetchEmployeeData(id);
    },[id]);

    const fetchEmployeeData = (id) =>{
        axios.get(`${base_url}/employee/${id}`)
        .then((response)=>{
            console.log(response);
            setEmployeeData(response.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleEditSection = (section) => {
        setEditSection(section);
      };
    
      const handleSave = (editedData, id) => {
        // Send editedData to the server for updating the employee's information
        // You can make an axios PUT request here
        console.log(editedData, "editedData");
        // axios.patch(`${base_url}/employee/${id}`,editedData)
        // .then((response)=>{
        //   console.log(response);
        // })
        // .catch((err)=>{
        //   console.log(err);
        // })
      };
  return (
    <>
    <Box sx={{display:'flex'}}>
        <SideBar/>
        <Container>
        <Typography variant="h4" sx={{textAlign:'center', padding:'2vh', fontFamily:'poppins', textDecoration:'underline'}}>EDIT FORM</Typography>
        <Container sx={{textAlign:'center'}}>
        <Button onClick={() => handleEditSection('basic')} sx={{fontWeight:'bold', backgroundColor:'#acdfdf', color:'black'}}>Edit Basic Details</Button>
        <Button onClick={() => handleEditSection('employee')} sx={{fontWeight:'bold', backgroundColor:'#acdfdf', color:'black'}}>Edit Employee Details</Button>
        <Button onClick={() => handleEditSection('bank')} sx={{fontWeight:'bold', backgroundColor:'#acdfdf', color:'black'}}>Edit Bank Details</Button>
        <Button onClick={() => handleEditSection('address')} sx={{fontWeight:'bold', backgroundColor:'#acdfdf', color:'black'}}>Edit Address</Button>
        {editSection === 'basic' && <EditBasicDetails data={employeeData} id={id}  onSave={handleSave} />}
        {editSection === 'bank' && <EditBankDetails data={employeeData} id={id} onSave={handleSave} />}
        {editSection === 'employee' && <EditEmployeeDetails id={id} data={employeeData} onSave={handleSave} />}
        {editSection === 'address' && <EditEmployeeAddress data={employeeData} onSave={handleSave} />}
        </Container>
      </Container>
    </Box>
    </>
  );
}

export default EditForm;
