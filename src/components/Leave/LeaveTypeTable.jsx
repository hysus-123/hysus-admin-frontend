// TableComponent.js
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Modal , Card} from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  useEffect(() => {
    
    fetchDataFromBackend()
      
  }, []);

  const base_url = process.env.REACT_APP_BASE_URL

  const fetchDataFromBackend = async () => {
    axios.get(`${base_url}/leavetype`)
    .then((response)=>{
        console.log(response);
        setData(response.data);
        
    })
    .catch((err)=>{
        console.log(err);
        
    })
  };

  const handleEditClick = (row) => {
    setEditedData(row);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSaveChanges = () => {
    axios.patch(`${base_url}/leavetype/${editedData.id}`, editedData)
      .then((response) => {
        console.log(response);
        // const updatedData = data.map((row) => (row.id === editedData.id ? response.data : row));
        // setData(updatedData);
        setModalOpen(false);
        setSnackbarMessage('Leave Type updated successfully');
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage('error');
        setSnackbarOpen(true);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Leave Code</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.leave_code}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell><Button onClick={()=>handleEditClick(row)}><ModeEditIcon color='secondary'/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    <Modal open={modalOpen} onClose={handleModalClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Card sx={{p:3}}>
          <TextField
            label="Type"
            name="type"
            sx={{mt:2}}
            value={editedData.type || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Leave Code"
            name="leave_code"
            sx={{mt:2}}
            value={editedData.leave_code || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            sx={{mt:2}}
            value={editedData.description || ''}
            onChange={handleInputChange}
            fullWidth
          />
          <Button variant='contained' sx={{mt:2}} onClick={handleSaveChanges}>Save Changes</Button>
        </Card>
        </div>
      </Modal>
    </div>
  );
};

export default TableComponent;
