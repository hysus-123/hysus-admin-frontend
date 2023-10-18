import React from 'react';
import SideBar from '../../pages/Sidebar/Sidebar';
import { Box } from '@mui/material';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import HysusImage from '../../assets/hysus.png';

const PayrollTable = () => {

  const downloadPdf = () =>{
    const doc = new jsPDF({orientation:'landspace'});

    doc.autoTable({
      html: '#my-table'
    })

    doc.save('data.pdf');
  }
  return (
    <Box sx={{display:'flex'}}> 
    <SideBar/>
    
    <div style={{maxWidth:'100%', overflowX:'auto'}}>
      <button onClick={downloadPdf}>
        print
      </button>
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
            <th>Personal NO:</th>
            <td>0123456</td>
            <th>Name</th>
            <td>Chandra</td>
          </tr>
          <tr>
            <th>Bank</th>
            <td>x0x0x0</td>
            <th>Bank A/c No.</th>
            <td>0x2x6x25x6</td>
          </tr>
          <tr>
            <th>DOB</th>
            <td>23/02/xxxx</td>
            <th>Lop Days</th>
            <td>0</td>
          </tr>
          <tr>
            <th>PF No.</th>
            <td>26123456</td>
            <th>STD days</th>
            <td>30</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>India</td>
            <th>Working Days</th>
            <td>30</td>
          </tr>
          <tr>
            <th>Department</th>
            <td>IT</td>
            <th>Designation</th>
            <td>Designer</td>
          </tr>
          <thead>
          <tr>
            <th>Earnings</th>
            <th>Amount</th>
            <th>Deductions</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Basic</td>
            <td>29000</td>
            <td>provident fund</td>
            <td>1900</td>
          </tr>
          <tr>
            <td>House Rent Allowance</td>
            <td>2000</td>
            <td>professional tax</td>
            <td>600</td>
          </tr>
          <tr>
            <td>special Allowance</td>
            <td>400</td>
            <td>Income tax</td>
            <td>500</td>
          </tr>
          <tr>
            <td>conveyance</td>
            <td>3000</td>
          </tr>
          <tr>
            <td>ADD Special allowance</td>
            <td>2000</td>
          </tr>
          <tr>
            <td>shift Allowance</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>bonus</td>
            <td>500</td>
          </tr>
          <tr>
            <td>medical Allowance</td>
            <td>600</td>
          </tr>
          <tr>
            <th>Gross Earnings</th>
            <td>Rs.38500</td>
            <th>Gross Deductions</th>
            <td>Rs.3000</td>
          </tr>
          <tr>
            <td></td>
            <td><strong>NET PAY</strong></td>
            <td>Rs.35500</td>
            <td></td>
          </tr>
        </tbody>
        </tbody>

      <br />
        {/* <thead>
          <tr>
            <th>Earnings</th>
            <th>Amount</th>
            <th>Deductions</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Basic</td>
            <td>29000</td>
            <td>provident fund</td>
            <td>1900</td>
          </tr>
          <tr>
            <td>House Rent Allowance</td>
            <td>2000</td>
            <td>professional tax</td>
            <td>600</td>
          </tr>
          <tr>
            <td>special Allowance</td>
            <td>400</td>
            <td>Income tax</td>
            <td>500</td>
          </tr>
          <tr>
            <td>conveyance</td>
            <td>3000</td>
          </tr>
          <tr>
            <td>ADD Special allowance</td>
            <td>2000</td>
          </tr>
          <tr>
            <td>shift Allowance</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>bonus</td>
            <td>500</td>
          </tr>
          <tr>
            <td>medical Allowance</td>
            <td>600</td>
          </tr>
          <tr>
            <th>Gross Earnings</th>
            <td>Rs.38500</td>
            <th>Gross Deductions</th>
            <td>Rs.3000</td>
          </tr>
          <tr>
            <td></td>
            <td><strong>NET PAY</strong></td>
            <td>Rs.35500</td>
            <td></td>
          </tr>
        </tbody> */}
      </table>
    </div>
    </Box>
  );
};

export default PayrollTable;

