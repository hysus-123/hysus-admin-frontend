import  React , {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import PaymentsIcon from '@mui/icons-material/Payments';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import LanIcon from '@mui/icons-material/Lan';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import BookIcon from '@mui/icons-material/Book';
import DraftsIcon from '@mui/icons-material/Drafts';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import hysusLogo from '../../assets/hysus.png';
import PolicyRoundedIcon from '@mui/icons-material/PolicyRounded';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useEffect } from 'react';
import axios from 'axios';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  // const [menudata, setMenudata] = useState('Home');
  const navigate = useNavigate();
  const [logo, setLogo] = useState([]);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  useEffect(()=>{
    gettingLogo();
  },[])

  const base_url = process.env.REACT_APP_BASE_URL

  const gettingLogo = () =>{
    axios.get(`${base_url}/company/1`)
    .then((response)=>{
      console.log(response.data);
      setLogo(response.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <Box sx={{ display: 'flex', }}>
      <CssBaseline />
      {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
             
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            HYSUS
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader >
          <div style={{display:'flex'}}>
            
            <div style={{textAlign:'center', width:'100%'}}>
            {/* <img src={hysusLogo} alt='hysus logo'width={150} height={80} /> */}
            <img src={logo.logo} alt='hysus logo'width={150} height={80} />
            </div>
            <IconButton onClick={()=>setOpen(!open)}>
              {theme.direction === 'rtl' ? <MenuIcon /> : <MenuIcon />}
            </IconButton>
        
          </div>
        </DrawerHeader>

        <Divider />

        <List >
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
            <ListItem primary="Home" disablePadding sx={{ display: 'block' }} onClick={()=>{
              // setMenudata('Home');
              navigate('/home');
            }}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  <HomeIcon/> 
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem primary="Employees" disablePadding sx={{ display: 'block' }} onClick={()=>{
              // setMenudata('Employee');
              navigate('/emp-list');
            }}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  <PeopleIcon/> 
                </ListItemIcon>
                <ListItemText primary="Employees" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem primary="Issue LetterHead" disablePadding sx={{ display: 'block' }} onClick={()=>{
              // setMenudata('Blog');
              navigate('/letterheadissue');
            }}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DraftsIcon/> 
                </ListItemIcon>
                <ListItemText primary="Issue LetterHead" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem primary="leave Status" disablePadding sx={{ display: 'block' }} onClick={()=>{
              navigate('/leaves');
            }}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HolidayVillageIcon/> 
                </ListItemIcon>
                <ListItemText primary="Leave Status" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem primary="Break Time" disablePadding sx={{ display: 'block' }} onClick={()=>{
              navigate('/breaks');
            }}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HolidayVillageIcon/> 
                </ListItemIcon>
                <ListItemText primary="Break Time" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem primary="Holidays" disablePadding sx={{ display: 'block' }} onClick={()=>{
              navigate('/holidays');
            }}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HolidayVillageIcon/> 
                </ListItemIcon>
                <ListItemText primary="Holidays" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem primary="Department" disablePadding sx={{ display: 'block' }} onClick={()=>{
              // setMenudata('Blog');
              navigate('/department');
            }}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  <LanIcon/> 
                </ListItemIcon>
                <ListItemText primary="Department" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem primary="Attendence" disablePadding sx={{ display: 'block' }} onClick={()=>{
              // setMenudata('Blog');
              navigate('/attendance');
            }}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  <CalendarMonthIcon/> 
                </ListItemIcon>
                <ListItemText primary="Attendence" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem primary="PayRoll" disablePadding sx={{ display: 'block' }} onClick={()=>{
              // setMenudata('Blog');
              navigate('/payroll');
            }}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  <PaymentsIcon/> 
                </ListItemIcon>
                <ListItemText primary="PayRoll" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem primary="Policy" disablePadding sx={{ display: 'block' }} onClick={()=>{
              // setMenudata('Blog');
              navigate('/policy');
            }}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  <PolicyRoundedIcon/> 
                </ListItemIcon>
                <ListItemText primary="Policy" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem primary="Setting" disablePadding sx={{ display: 'block' }} onClick={()=>{
              // setMenudata('Blog');
              navigate('/setting');
            }}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  <SettingsSuggestIcon/> 
                </ListItemIcon>
                <ListItemText primary="Setting" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          {/* ))} */}
        </List>

        <Divider />
        
      </Drawer>
      
    </Box>
  );
}
