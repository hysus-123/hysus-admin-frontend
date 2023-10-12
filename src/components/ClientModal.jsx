import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Textarea } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState({
    name : '',
    organization_name: '',
    email: '',
    phone : ''
  })
  const base_url = process.env.REACT_APP_BASE_URL;

  const handleInputChange =(event)=>{
    const {name, value} = event.target
    setData({...data, [name]:value})
  }

  const handleSubmit = () =>{
    axios.post(`${base_url}/client`, data)
    .then((response)=>{
      console.log(response);
      setOpen(false);
    })
    .catch((err)=>console.log);
  }

  return (
    <div>
      <Button onClick={handleOpen} variant='contained' color='success'><AddIcon/> Add Client</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-client" variant="h6" component="h2">
            <Textarea placeholder='Add Client' name='name' value={data.name} onChange={handleInputChange}/>
          </Typography>
          <Typography id="modal-modal-organization" variant="h6" component="h2" sx={{ mt: 2 }}>
            <Textarea placeholder='Organization Name' name='organization_name' value={data.organization_name} onChange={handleInputChange}/>
          </Typography>
          <Typography id="modal-modal-email"variant="h6" component="h2" sx={{ mt: 2 }}>
            <Textarea placeholder='Email id' name='email' value={data.email} onChange={handleInputChange}/>
          </Typography>
          <Typography id="modal-modal-phone" variant="h6" component="h2" sx={{ mt: 2 }}>
            <Textarea placeholder='Phone Number' name='phone' value={data.phone} onChange={handleInputChange}/>
          </Typography>
          <Button variant='contained' sx={{display:'inline-block', float:'right' , mt:3}} onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
