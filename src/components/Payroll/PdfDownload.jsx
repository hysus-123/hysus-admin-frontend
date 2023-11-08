import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

import { useParams } from 'react-router';
import HysusImage from '../../assets/hysus.png';

const PdfDownload = () => {
    const [data, setData] = useState([]);
  const {id} = useParams();
  console.log(id, "id");
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(()=>{
    fetchPayrollData(id);
  },[id])

  const fetchPayrollData = (id) =>{
    axios.get(`${base_url}/single-salary/${id}`)
    .then((response)=>{
      console.log(response);
      setData(response.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  return (
    <div>
      <table id='my-table' style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', marginBottom:'20px' }}>
        <thead>
          <tr style={{ height: '100px', backgroundColor: '#363636', color: '#ffffff', textAlign: 'center', fontSize: '24px', fontWeight: 600 }}>
            <td colSpan='4'>
              {/* <img src={HysusImage} alt="hysus" width={100}/> */}
              Hysus Digital Pvt. Ltd.
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Employee Id:</th>
            <td>HYS-{data?.as_employee?.emp_id}</td>
            <th>Name</th>
            <td>{data?.as_employee?.employee_name}</td>
          </tr>
          <tr>
            <th>Bank</th>
            <td>x0x0x0</td>
            <th>Bank A/c No.</th>
            <td>0x2x6x25x6</td>
          </tr>
          <tr>
            <th>Joining Date</th>
            <td>{data?.as_employee?.joining_date}</td>
            <th>Lop Days</th>
            <td>{data.LOP}</td>
          </tr>
          <tr>
            <th>PF No.</th>
            <td>26123456</td>
            <th>STD days</th>
            <td>{data?.std_days}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>India</td>
            <th>Working Days</th>
            <td>{data?.working_days}</td>
          </tr>
          <tr>
            <th>Department</th>
            <td>IT</td>
            <th>Designation</th>
            <td>Designer</td>
          </tr>
          
        </tbody>

      <br />
        
        <tbody>
          <tr>
            <td>Gross Salary</td>
            <td>{data?.as_payroll_details?.gross_salary}</td>
            <td>EPF</td>
            <td>{data?.as_payroll_details?.deduct_PF}</td>
          </tr>
          <tr>
            <td>Basic Salary</td>
            <td>{data?.as_payroll_details?.basic_salary}</td>
            <td>ESIC</td>
            <td>{data?.as_payroll_details?.deduct_ESIC}</td>
          </tr>
          <tr>
            <td>House Rent Allowance</td>
            <td>{data?.as_payroll_details?.hra}</td>
            <td>LWF</td>
            <td>{data?.as_payroll_details?.deduct_LWF}</td>
          </tr>
          <tr>
            <td>special Allowance</td>
            <td>{data?.as_payroll_details?.sp_allowance}</td>
            
          </tr>
          
          <tr>
            <th>Net Payable</th>
            <td>Rs.{data?.as_payroll_details?.net_payable}</td>
            <th>Gross Deductions</th>
            <td>Rs.{data?.as_payroll_details?.deduct_LWF + data?.as_payroll_details?.deduct_PF +data?.as_payroll_details?.deduct_ESIC + data.total_deduct}</td>
          </tr>
          <tr>
            
          </tr>
          
        </tbody>
      </table>
    </div>
  );
}

export default PdfDownload;
