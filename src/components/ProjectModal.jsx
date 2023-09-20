import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Textarea } from '@mui/joy';
import axios from 'axios';
import ClientModal from './ClientModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProjectModal() {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState([]);
  const [projectData, setProjectData] = useState({
    title : '',
    description : '',
    scopeOfWork : '',
    timePeriod : '',
    periodUnit : ''
  })
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const base_url = process.env.REACT_APP_BASE_URL;
  useEffect(()=>{
    getClient();
  },[])

  const getClient = () =>{
    axios.get(`${base_url}/client`)
    .then((response)=>{
        console.log(response);
        setClient(response.data);
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'timePeriod') {
      setProjectData({ ...projectData, [name]: parseInt(value, 10) });
    } else {
      setProjectData({ ...projectData, [name]: value });
    }
  };

  const handleSubmit = () =>{
    console.log(projectData, "projectData");
    axios.post(`${base_url}/project`, projectData)
    .then((response)=>{
        console.log(response);
        setOpen(false);
        setProjectData({});
    })
    .catch((err)=>console.log(err));
  }


  return (
    <div>
      <Button onClick={handleOpen} variant='contained' color='success'>Add Employee Project</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Textarea placeholder='Enter project Title' 
            name='title'
            onChange={handleInputChange}
            value={projectData.title}
            required
            />
          </Typography>
          <Typography id="modal-modal-desc" variant="h6" component="h2" sx={{ mt: 2 }}>
            <Textarea placeholder='Enter project Description' 
            name='description'
            onChange={handleInputChange}
            value={projectData.description}
            required
            />
          </Typography>
          <Typography id="modal-modal-scope" variant='h6' sx={{ mt: 2 }}>
            <Textarea placeholder='Enter scope of work' style={{height:'50px'}} 
            name='scopeOfWork'
            onChange={handleInputChange}
            value={projectData.scopeOfWork}
            required
            />
          </Typography>
          <Typography sx={{display:'flex', justifyContent:'space-between', mt:2}}>
            <Typography variant='h6' component="h2">
                <Textarea placeholder='TimePeriod' 
                name='timePeriod'
                onChange={handleInputChange}
                value={projectData.timePeriod}
                required
                />
            </Typography>
            <Typography>
                <Select
                    style={{height:'40px'}}
                    value={projectData.periodUnit}
                    name='periodUnit'
                    onChange={handleInputChange}
                >
                    <MenuItem value="day">Day</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                </Select>
            </Typography>
            
          </Typography>
          <Typography id="modal-modal-description" variant='h6' >
            <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel id="client">Client Name</InputLabel>
                <Select
                    style={{height:'40px'}}
                    labelId="clientName"
                    label="client"
                    name="client"
                    required
                    onChange={handleInputChange}
                    
                    value={projectData.clients}
                >
                    {client.map(clients => (
                    <MenuItem key={clients.id} value={clients.id}>
                    {clients.name}
                    </MenuItem>
                ))}
                </Select>
                </FormControl>
          </Typography>
          <div style={{display:'flex', justifyContent:'space-between' , marginTop:'10px'}}>
          <ClientModal/>
          <Button variant='contained' onClick={handleSubmit}>Submit</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
