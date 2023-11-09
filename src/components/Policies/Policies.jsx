import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Policy2 from './Policy2';
import SideBar from '../../pages/Sidebar/Sidebar';
import GeneralPolicy from './GeneralPolicy';

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
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Policies" {...a11yProps(0)} />
          <Tab label="Leave Policies" {...a11yProps(1)} />
          <Tab label="Non Disclosure" {...a11yProps(2)} />
          <Tab label="Non Competence" {...a11yProps(3)} />
          <Tab label="Dual Employment" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GeneralPolicy/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Policy2/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Non Disclosure
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Non Competence
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Dual Employment
      </CustomTabPanel>
    </Box>
    </Box>
  );
}
