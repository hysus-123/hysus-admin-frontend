import { Box } from '@mui/material'
import React , {useState, useEffect}from 'react'
import SideBar from '../pages/Sidebar/Sidebar';
import {Container, Typography, Button, Card} from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import ListUpdate from './ListUpdate';
import axios from 'axios';

const Home = () => {
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
      <Box sx={{display: 'flex'}}>
        <SideBar/>
        <Container sx={{mt:2}}>
          <Typography variant="h4" sx={{textAlign: 'center', textDecoration:'underline'}}> Some Things</Typography>
          <Card>
            <Typography variant='h6' sx={{textDecoration:'underline'}}>Important Updates</Typography>
            <TextareaAutosize style={{display:'block', width:'80vw', height:'50px' }} placeholder="write a new update" required value={data} onChange={(e)=>
                setData(e.target.value)}/>
            <Button variant='contained' sx={{mt:2}} onClick={sendData}>Submit</Button>
            
            <Container sx={{mt:2}}>
              <Typography variant='h6' sx={{textDecoration:'underline'}}>All Important Updates</Typography>
                <ListUpdate value ={data}/>
            </Container>
          </Card>
        </Container>
      </Box>
    </>
  )
}

export default Home
