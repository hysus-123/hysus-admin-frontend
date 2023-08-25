import  React ,{useState, useEffect} from 'react';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { red, green } from '@mui/material/colors';

// const{id} = useParams();
// const IOSSwitch = styled((props) => (
  
//   <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
// ))(({ theme }) => ({
//   width: 62,
//   height: 26,
//   padding: 0,
//   '& .MuiSwitch-switchBase': {
//     padding: 0,
//     margin: 2,
//     transitionDuration: '300ms',
//     '&.Mui-checked': {
//       transform: 'translateX(35px)',
//       color: '#fff',
//       '& + .MuiSwitch-track': {
//         backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
//         opacity: 1,
//         border: 0,
//       },
//       '&.Mui-disabled + .MuiSwitch-track': {
//         opacity: 0.5,
//       },
//     },
//     '&.Mui-focusVisible .MuiSwitch-thumb': {
//       color: '#33cf4d',
//       border: '6px solid #fff',
//     },
//     '&.Mui-disabled .MuiSwitch-thumb': {
//       color:
//         theme.palette.mode === 'light'
//           ? theme.palette.grey[100]
//           : theme.palette.grey[600],
//     },
//     '&.Mui-disabled + .MuiSwitch-track': {
//       opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     boxSizing: 'border-box',
//     width: 22,
//     height: 22,
//   },
//   '& .MuiSwitch-track': {
//     borderRadius: 26 / 2,
//     backgroundColor: theme.palette.mode === 'light' ? '#eb2e15' : '#39393D',
//     opacity: 1,
//     transition: theme.transitions.create(['background-color'], {
//       duration: 500,
//     }),
//   },
// }));
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CustomizedSwitches() {
    const{id} = useParams();
    console.log(id, "id at active ");

    const [status , setStatus] = useState('');
    useEffect(()=>{
      fetchData(id);
    },[id])

    const fetchData = () =>{
      axios.get(`https://hysus-admin-backend-production.up.railway.app/api/employee/${id}`)
      .then(response =>{
        console.log(response.data.status);
        setStatus(response.data.status);
        
      })
      .catch(err =>{
        console.log(err);
      })
    }
    
    // const [checked, setChecked] = useState('');
    const handleChange = () => {
      // setChecked(!checked);
      axios.put(`https://hysus-admin-backend-production.up.railway.app/api/employee/${id}`)
      .then(response =>{
        console.log(response.status , "response");
        if(response.status === 200){
          console.log('helo')
          setStatus(status ==='active' ? 'inactive': 'active');
        }
      })
      .catch(err =>{
        console.log(err);
      })
    };

    const checkboxColor = status === 'active' ? green[500] : red[500];
  return (
    <FormGroup>
      
      {/* <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} 
        onChange={handleChange}
        value={status}
        />}
        // label={status === 'active' ? 'Active' : 'Inactive'}

        labelPlacement="start"
        
      /> */}
        {/* <Checkbox {...label} defaultChecked color="success" value={status}  onChange={handleChange} 
        style={{color: checkboxColor}}/>  */}
        <Button variant='contained'  value={status === 'active'? 'Active' :'Inactive'}
         onClick={handleChange } 
         size='small'
         style={{backgroundColor: checkboxColor}}>
          {status ==='active'? 'Active':'Inactive'}
          </Button>

      
      
    </FormGroup>
  );
}

