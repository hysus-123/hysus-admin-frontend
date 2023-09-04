import  React , {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
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
import BookIcon from '@mui/icons-material/Book';
import DraftsIcon from '@mui/icons-material/Drafts';
// import MenuIcon from '@mui/icons-material/Menu';

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

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//     backgroundColor:'#2E3B55',
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

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
  const [open, setOpen] = useState(false);
  // const [menudata, setMenudata] = useState('Home');
  const navigate = useNavigate();

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <Box sx={{ display: 'flex' }}>
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
        <DrawerHeader>
          <IconButton onClick={()=>setOpen(!open)}>
            {theme.direction === 'rtl' ? <MenuIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
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
            <ListItem primary="Blogs" disablePadding sx={{ display: 'block' }} onClick={()=>{
              // setMenudata('Blog');
              navigate('/blogs');
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
                  <BookIcon/> 
                </ListItemIcon>
                <ListItemText primary="Blogs" sx={{ opacity: open ? 1 : 0 }} />
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
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  <DraftsIcon/> 
                </ListItemIcon>
                <ListItemText primary="Issue LetterHead" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          {/* ))} */}
        </List>

        <Divider />
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, }}>
        
        {/* {menudata == 'Home' && <Home/>}
        {menudata == 'Employee' && <EmployeeList/>}
        {menudata == 'Blog' && <Blog/>} */}
        
          {/* <Routes>
            <Route
              path='/auth/emp-dashboard/:id' element={<EmpDashboard/>}>
            </Route>
          </Routes> */}

          {/* <Routes>
            <Route>
              <Route path="home" element={<Home />}/>
              <Route path="emp-list" element={<EmployeeList />}/>
              <Route path="blogs" element={<Blog />} />
              <Route path="emp-dashboard" element={<EmpDashboard />} />
              <Route path="emp-dashboard/:id" element={<EmpDashboard />} />
              <Route path="emp-form" element={<Form />}/>
              <Route path="emp-editForm/:id" element={<EditForm />}/>
              <Route path="emp-fulldetails/:id" element={<FullDetails />}/>
              <Route path="emp-profile/:id" element={<NewPage />}/>
            </Route>
          </Routes> */}
          {/* <Routes>
          <Route path="/auth/home" element={<Home />} />
          <Route path="/auth/emp-list" element={<EmployeeList />} />
          <Route path="/auth/blogs" element={<Blog />} />
          <Route path="/auth/emp-dashboard" element={<EmpDashboard />} />
          <Route path="/auth/emp-dashboard/:id" element={<EmpDashboard />} />
          <Route path="/auth/emp-form" element={<Form />} />
          <Route path="/auth/emp-editForm/:id" element={<EditForm />} />
          <Route path="/auth/emp-fulldetails/:id" element={<FullDetails />} />
          <Route path="/auth/emp-profile/:id" element={<NewPage />} />
        </Routes> */}
      </Box>
    </Box>
  );
}
