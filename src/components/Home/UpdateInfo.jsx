import React, {useEffect, useState} from 'react'
import { TextareaAutosize } from '@mui/material';
import ListUpdate from '../ListUpdate';
import {Card, Container, Typography, Button} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import axios from 'axios';

const UpdateInfo = () => {
    const base_url = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState('');

  useEffect(()=>{
    fetchMessage();
  },[])

  const fetchMessage=()=>{
    axios.get(`${base_url}/info`)
    .then((response)=>{
      console.log(response);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const sendData = (e) =>{
    e.preventDefault();
    console.log(data);
    const dataObj = {
      data,
    }
    axios.post(`${base_url}/info`, dataObj)
    .then((response)=>{
      console.log(response);
      setData('');
      fetchMessage();
    })
    .catch((err)=>{
      alert(err.response?.data?.message)
      console.log(err);
    })
  }
  return (
    <>
        <Card sx={{opacity:'0.75', filter: 'drop-shadow(5px 5px 4px gray)'}}>
            <Container sx={{mt:2}}>
                  
              <Typography variant='h6' sx={{fontFamily:'cursive', mb:2,textAlign:'center',fontFamily:'poppins'}} ><NotificationsActiveIcon style={{color:'#e2a600', }}/>Important Updates</Typography>
              <TextareaAutosize style={{display:'block', width:'80%', height:'50px',fontFamily:'poppins', mt:1 }} placeholder="  write a new update" required value={data} onChange={(e)=>
                  setData(e.target.value)}/>
                  <div style={{textAlign:'center'}}>

              <Button variant='contained' sx={{width:'20%',mt:2, borderRadius:'40px', fontFamily:'poppins', backgroundColor:'black', white:'white'}} size='small' onClick={sendData}>Submit</Button>
                  </div>
              
              <Container sx={{mt:4}}>
                {/* <Typography variant='h6' sx={{textDecoration:'underline'}}>All Important Updates</Typography> */}
                  <ListUpdate value ={data} fetchMessage={fetchMessage}/>
              </Container>
              
              </Container>
            </Card>
    </>
  )
}

export default UpdateInfo
