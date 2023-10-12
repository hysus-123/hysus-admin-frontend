import React, {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Button, FormControl, FormGroup, FormControlLabel, Typography } from '@mui/material';
import {Switch} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import './ListUpdate.css'


export default function GutterlessList(props) {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState([]);
  useEffect(()=>{
    getData()
  },[])

  const getData = ()=>{
    axios.get(`${base_url}/info`)
    .then((response)=>{
      console.log(response.data);
      setData(response.data);
    })
    .catch(err => console.log(err));
  }

  const inactiveMsg = (id) =>{
    axios.put(`${base_url}/info/${id}`)
    .then((response)=>{
      console.log(response.data);
      getData();
    })
    .catch(err => console.log(err));
  } 


  return (
    <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
      {data.map((value) => (
        <ListItem
          key={value}
          sx={{fontSize:'12px', fontFamily:"poppins"}}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <FormGroup>
                <DeleteIcon defaultChecked={value.status == 'active'} onClick={()=>inactiveMsg(value.id)}/>
              </FormGroup>
            </IconButton>
          }
        >
          {value.data}  
          <div className="network-icon"></div>
         
        </ListItem>
      ))}
    </List>
  );
}
