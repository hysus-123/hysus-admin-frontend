import React, { useEffect, useState } from 'react';
import { Box, TextField , Button} from '@mui/material';
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import axios from 'axios';

const DetailsCompany = () => {

  const [companyData, setCompanyData] = useState({
    logo: '',
    companyName: '',
    email: '',
    address: '',
    phone: '',
    zip_code:'',
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  const base_url = process.env.REACT_APP_BASE_URL

  useEffect(()=>{
    gettingDetails();
  },[])

  const gettingDetails = () => {
    axios
      .get(`${base_url}/company/1`)
      .then((response) => {
        const { data } = response;
        setCompanyData({
          logo: data.logo,
          companyName: data.companyName,
          email: data.email,
          address: data.address,
          phone: data.phone,
          zip_code: data.zip_code,
        });
        setDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getImageFileObject(imageFile) {
    console.log(imageFile.file)
    setCompanyData({
      ...companyData,
      logo: imageFile.file,
    });
  }

  function handleInputChange(event, field) {
    const value = event.target.value;
    setCompanyData({
      ...companyData,
      [field]: value,
    });
  }

  function runAfterImageDelete(file) {
    setCompanyData({
      ...companyData,
      logo: '',
    });
  }

  const handleSubmit = () =>{
    axios.patch(`${base_url}/company/1`,companyData,{
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for FormData
      },
    })
    .then((response)=>{
      console.log(response);
      setCompanyData({
        companyName:'',
        email:'',
        phone:'',
        address:'',
        zip_code:''
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div>
      <Box>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '70%' }}>
          <label htmlFor="">Insert Company Logo:</label>
          <div style={{ width: '100%', }}>
          <ImageUploader 
            onFileAdded={(img) => getImageFileObject(img)}
            onFileRemoved={(img) => runAfterImageDelete(img)}
          />
          </div>
          <TextField label="company Name" size='small' 
          value={companyData.companyName}
          onChange={(e) => handleInputChange(e, 'companyName')}
          />
          <TextField label='Email' type='email' size='small' 
          value={companyData.email}
          onChange={(e) => handleInputChange(e, 'email')}
          />
          <TextField label="address" size='small' 
          value={companyData.address}
          onChange={(e) => handleInputChange(e, 'address')}
          />
          <TextField label="phone" size='small' 
          value={companyData.phone}
          onChange={(e) => handleInputChange(e, 'phone')}
          />
          <TextField label="Zip Code" size='small' 
          value={companyData.zip_code}
          onChange={(e) => handleInputChange(e, 'zip_code')}
          />
          <Button variant="contained" color="secondary" onClick={handleSubmit}>Submit</Button>
        </div>
      </Box>
    </div>
  );
}

export default DetailsCompany;
