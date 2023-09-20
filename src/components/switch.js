import  React ,{useState, useEffect} from 'react';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { red, green } from '@mui/material/colors';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CustomizedSwitches() {
    const{id} = useParams();
    console.log(id, "id at active ");

    const [status , setStatus] = useState('');
    useEffect(()=>{
      fetchData(id);
    },[id]);

    const base_url = process.env.REACT_APP_BASE_URL

    const fetchData = () =>{
      axios.get(`${base_url}/employee/${id}`)
      .then(response =>{
        console.log(response.data.status);
        setStatus(response.data.status);
        
      })
      .catch(err =>{
        console.log(err);
      })
    }
    
    const handleChange = () => {
      axios.put(`${base_url}/employee/${id}`)
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
      
        <Button variant='contained'  value={status === 'active'? 'Active' :'Inactive'}
         onClick={handleChange } 
         size='small'
         style={{backgroundColor: checkboxColor}}>
          {status ==='active'? 'Active':'Inactive'}
          </Button>
    </FormGroup>
  );
}
