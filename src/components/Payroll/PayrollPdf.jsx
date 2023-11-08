import React, { useRef, useEffect, useState } from 'react';
import SideBar from '../../pages/Sidebar/Sidebar';
import { Box, Container } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from './PdfDownload';
import { useParams } from 'react-router';
import axios from 'axios';
import HysusImage from '../../assets/hysus.png';
// const numWords = require('num-words');
import numberToWords from 'number-to-words';

const tableStyle = {
  width: '80%',
  borderCollapse: 'collapse',
  textAlign:'center'
};

const cellStyle = {
  border: '1px solid #000',
  padding: '8px',
  textAlign: 'left',
};

const tabStyle = {

  width:'80%',
  padding:'6px',
  textAlign:'left',
}

const PayrollTable = () => {
  // const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const date = new Date();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const months = ["-","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
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
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Container>
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <button onClick={handlePrint}>Print</button>
          {/* <ComponentToPrint ref={componentRef} /> */}
          <div ref={componentRef}>
            <div style={{margin:'auto'}}>
              <div style={{marginTop:'20px', textAlign:'center'}}>
                <img src={HysusImage} alt="company logo" width={150}/>
                <div>HYSUS DIGITAL</div>
                <div>253-254 Unit No. Hysus Digital Pvt. ltd. </div>

              </div>

              <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <table style={tabStyle}>
                  <tbody>
                    <tr>
                      <th>Date of Joining: </th>
                      <td>{data.as_employee?.joining_date}</td>
                      <th>Employee Name: </th>
                      <td>{data.as_employee?.employee_name}</td>
                    </tr>
                    <tr>
                      <th>Pay Period: </th>
                      <td>{months[data?.month]} {data.year}</td>
                      <th>Designation: </th>
                      <td>{data.as_employee?.as_designation?.position}</td>
                    </tr>
                    <tr>
                      <th>Worked Days: </th>
                      <td>{data.working_days}</td>
                      <th>Department: </th>
                      <td>{data.as_employee?.as_designation?.as_department?.department}</td>
                    </tr>
                  </tbody>
                </table>
                <table style={tableStyle}>
                    <thead>
                      <tr>
                        <th style={cellStyle}>Earning</th>
                        <th style={cellStyle}>Amount</th>
                        <th style={cellStyle}>Deduction</th>
                        <th style={cellStyle}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={cellStyle}>Basic</td>
                        <td style={cellStyle}>{data.as_payroll_details?.basic_salary}</td>
                        <td style={cellStyle}>Provident Fund:</td>
                        <td style={cellStyle}>{data.as_payroll_details?.deduct_PF}</td>
                      </tr>
                      <tr>
                        <td style={cellStyle}>Special Allowance</td>
                        <td style={cellStyle}>{data.as_payroll_details?.sp_allowance}</td>
                        <td style={cellStyle}>ESIC:</td>
                        <td style={cellStyle}>{data.as_payroll_details?.deduct_ESIC}</td>
                      </tr>
                      <tr>
                        <td style={cellStyle}>Rental House</td>
                        <td style={cellStyle}>{data.as_payroll_details?.hra}</td>
                        <td style={cellStyle}>Deduct LWF</td>
                        <td style={cellStyle}>{data.as_payroll_details?.deduct_LWF}</td>
                      </tr>
                      <tr>
                        <td style={cellStyle}></td>
                        <td style={cellStyle}></td>
                        <td style={cellStyle}>Leave Deduct</td>
                        <td style={cellStyle}>{Math.floor(data.total_deduct)}</td>
                      </tr>
                      <tr></tr>
                      <tr>
                        <td style={cellStyle}>Total Earnings</td>
                        <td style={cellStyle}>{data.as_payroll_details?.gross_salary}</td>
                        <td style={cellStyle}>Total Deductions</td>
                        <td style={cellStyle}>{Math.floor(data.as_payroll_details?.deduct_PF+ data.as_payroll_details?.deduct_ESIC+ data.as_payroll_details?.deduct_LWF + data?.total_deduct)}</td>
                      </tr>
                      <tr>
                        <td style={cellStyle}> </td>
                        <td style={cellStyle}></td>
                        <td style={cellStyle}>Net Pay</td>
                        <td style={cellStyle}>{Math.floor(data.final_salary)}</td>
                      </tr>
                    </tbody>

                </table>
                <div style={{textAlign:'center', marginTop:'20px'}}>
                  <div>{Math.floor(data.final_salary)}</div>
                  
                  {/* <div>{numberToWords.toWords(Math.floor(data?.final_salary))}</div> */}
                </div>
                <div style={{display:'flex', justifyContent:'space-between', width:'80%'}}>
                  <div>
                    <div>Employer Signature</div>
                    <div>_________________</div>
                  </div>
                  <div>
                    <div>Employee Signature</div>
                    <div>__________________</div>
                  </div>

                </div>
                <div style={{marginTop:'20px'}}>
                  <div style={{textAlign:'center'}}>
                    <div>----------------------------------------------------------</div>
                    <div>This is system Generated Slip</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{display:'inline-block', float:'right'}}>
              <p>{date.toLocaleDateString()}</p>

            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default PayrollTable;
