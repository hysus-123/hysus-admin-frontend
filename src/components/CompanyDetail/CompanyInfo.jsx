import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


const CompanyInfo = () => {
    const [comp, setCompData] = useState([]);
    useEffect(()=>{
        getCompanyDetails();
    },[])
    
    const base_url = process.env.REACT_APP_BASE_URL
    
    const getCompanyDetails = () =>{
        axios.get(`${base_url}/company/1`)
        .then((response)=>{
            console.log(response);
            setCompData(response.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const containerStyle = {
        borderTop: '1px solid #e5e5e5',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      };
    
      const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '0.5fr 1fr',
        gridGap: '1rem',
      };
    
      const dtStyle = {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#6b7280',
      };
    
      const ddStyle = {
        marginTop: '0.25rem',
        fontSize: '0.875rem',
        color: '#111827',
      };
  return (
    <div style={containerStyle}>
        {/* {compData.map((comp)=>( */}
            
      <dl style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div style={gridStyle}>
          <div style={dtStyle}>Company Logo:
          <img src={comp.logo} alt='Company Profile' style={{ height: '300px' }} />
          </div>
        </div>
        <div style={gridStyle}>
          <dt style={dtStyle}>Company Name:</dt>
          <dd style={ddStyle}>{comp.companyName}</dd>
        </div>
        <div style={gridStyle}>
          <dt style={dtStyle}>Company Email</dt>
          <dd style={ddStyle}>{comp.email}</dd>
        </div>
        <div style={gridStyle}>
          <dt style={dtStyle}>Company Address</dt>
          <dd style={ddStyle}>{comp.address}</dd>
        </div>
        <div style={gridStyle}>
          <dt style={dtStyle}>Company Phone</dt>
          <dd style={ddStyle}>{comp.phone}</dd>
        </div>
        <div style={gridStyle}>
          <dt style={dtStyle}>Zip Code</dt>
          <dd style={ddStyle}>{comp.zip_code}</dd>
        </div>
        
      </dl>
        {/* ))} */}
    </div>
  );
}

export default CompanyInfo;
