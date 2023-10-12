import  React, {useState} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Typography, Container, TextField, FormControl, Select, MenuItem, InputLabel} from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const base_url = process.env.REACT_APP_BASE_URL
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    getAllL2Employee();
  }
  const handleClose = () => setOpen(false);

      const [name, setName] = useState('');
      const [purpose, setPurpose] = useState('');
      const [issuedBy, setIssuedBy] = useState('');
      const [randomValue, setRandomValue] = useState('');
      const [allName, setAllName] = useState([]);

      const CHARACTER_LIMIT = 60;
      const [values, setValues] = React.useState('');

      const handleChange  = event => {
        setValues(event.target.value);
      };

      const getAllL2Employee = () => {
        
        axios.get(`${base_url}/employee`)
          .then((response) => {
            console.log(response.data, 'letterhead response');
            const names = response.data.map((employee) => {
              return {
                name: employee.employee_name,
                id: employee.id
              }
            })
            console.log(names, 'names letterhead');
            setAllName(names);
          })
          .catch(err => console.log(err));
      }
    
      const submitForm = (e) => {
        e.preventDefault();
    
        const random5DigitValue = Math.floor(10000 + Math.random() * 90000);
        setRandomValue(random5DigitValue);
    
        console.log('Employee Name:', name);
        console.log('Purpose:', purpose);
        console.log('Value:', issuedBy);
        console.log('Random5digit:', random5DigitValue);
        console.log('values', values)
    
        const dataFrom = {
          name,
          purpose,
          issuedBy,
          values,
          random5DigitValue,
        }
        console.log(dataFrom);
        axios.post(`${base_url}/letterhead`, dataFrom)
          .then((response) => {
            console.log(response, "response");
            setOpen(false);
          })
          .catch((err) => console.log(err));
      }

  return (
    <>
      <Button onClick={handleOpen} variant='contained' sx={{mb:2, backgroundColor:'#2E3B55'}}>Add New Letter</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form style={{ margin: 'auto' }} onSubmit={submitForm}>
          <Typography variant='h5' sx={{ textAlign: 'center', textDecoration:'underline' }}>Issued Letter</Typography>
           <Container sx={{ display: 'flex', margin: 'auto', flexDirection: 'column', mt: 3, width: '90%' }}>
             <TextField
              label="Issue to whom"
              sx={{ mt: 2 }}
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Purpose"
              sx={{ mt: 2 }}
              value={purpose}
              required
              onChange={(e) => setPurpose(e.target.value)}
            />
            <TextField
              label="Description"
              inputProps={{
                maxlength: CHARACTER_LIMIT
              }}
              value={values}
              helperText={`${values.length}/${CHARACTER_LIMIT}`}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" >Letter Issued By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={issuedBy}
                  required
                  label="Issued By"
                  onChange={(e) => setIssuedBy(e.target.value)}
                >
                  {allName.map((employee, index) => (
                    <MenuItem key={index} value={employee.id}>
                      {employee.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button variant="contained" color="success" sx={{ mt: 2, width: '20%' }} type="submit">Submit</Button>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Random 5-Digit Value: {randomValue}
            </Typography>
          </Container>
        </form>
        </Box>
      </Modal>
    </>
  );
}
