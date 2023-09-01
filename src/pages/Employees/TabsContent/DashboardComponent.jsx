import  React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Textarea } from '@mui/joy';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Raise any Query</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Textarea placeholder="Enter your subject"/>
          <Textarea placeholder='Enter your query' sx={{height:'150px', marginTop:'10px',mt:2}}/>
          <Button variant='contained' sx={{display:'inline-block', float:'right', mt:3}} onClick={handleClose} >Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}

