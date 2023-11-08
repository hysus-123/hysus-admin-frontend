import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SideBar from '../../pages/Sidebar/Sidebar';
import { Container , Card} from '@mui/material';
import DetailsCompany from './DetailsCompany';
import CompanyInfo from './CompanyInfo';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{display:'flex'}}>
      <SideBar/>
    <Container sx={{ width: '100%', mt:2}}>
      <Card sx={{height:"100vh"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Company Details" {...a11yProps(0)} />
          <Tab label="UpDate Company Details" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CompanyInfo/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DetailsCompany/>
      </CustomTabPanel>
    </Card>
    </Container>
    </Box>
  );
}




// import { Box, Container, Typography, Card } from '@mui/material';
// import React from 'react';
// import SideBar from '../../pages/Sidebar/Sidebar';
// import DetailsCompany from './DetailsCompany';

// const Company = () => {
//   return (
//     <Box sx={{display:'flex'}}>
//         <SideBar/>

//         <Container>
//             <Card sx={{mt:2, p:4}}>
//             <Typography variant='h4' sx={{textAlign:'center'}}>Company Details</Typography>
//             <DetailsCompany/>
//             </Card>
//         </Container>
//     </Box>
//   );
// }

// export default Company;
