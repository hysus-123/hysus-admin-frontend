import React from 'react';
import { Box, Button } from '@mui/material';
import SideBar from '../../pages/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import EditBankDetails from './EditBankDetails'
import EditEmployeeAddress from './EditEmployeeAddress'
import EditBasicDetails from './EditEmployeeBasic';
import EditEmployeeDetails from './EditEmployeeDetails';

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
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleEditSection = (section) => {
        setEditSection(section);
      };
    
      const handleSave = (editedData) => {
        // Send editedData to the server for updating the employee's information
        // You can make an axios PUT request here
      };
  return (
    <>
    <Box sx={{display:'flex'}}>
        <SideBar/>
        <p>Edit Form</p>
        <div>
        <p>Edit Form</p>
        <Button onClick={() => handleEditSection('basic')}>Edit Basic Details</Button>
        <Button onClick={() => handleEditSection('bank')}>Edit Bank Details</Button>
        <Button onClick={() => handleEditSection('employee')}>Edit Employee Details</Button>
        <Button onClick={() => handleEditSection('address')}>Edit Address</Button>
        {editSection === 'basic' && <EditBasicDetails data={employeeData} onSave={handleSave} />}
        {editSection === 'bank' && <EditBankDetails data={employeeData} onSave={handleSave} />}
        {editSection === 'employee' && <EditEmployeeDetails data={employeeData} onSave={handleSave} />}
        {editSection === 'address' && <EditEmployeeAddress data={employeeData} onSave={handleSave} />}
      </div>
    </Box>
    </>
  );
}

export default EditForm;
