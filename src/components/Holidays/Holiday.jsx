import React, {useState} from 'react'
import { Box, Container, Typography, Card, TextField, Button, Dialog,
  DialogTitle,
  DialogContent,} from '@mui/material'
import SideBar from '../../pages/Sidebar/Sidebar'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import HolidayCalendar from './HolidayCalendar';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Holiday = () => {

    const [holidayData, setHolidayData] = React.useState([]); // State to store holiday data
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedHoliday, setEditedHoliday] = useState({
      id: null,
      title: '',
      comment: '',
      date: null,
    });

  React.useEffect(()=>{
    fetchHolidayss();
  },[])

  const base_url = process.env.REACT_APP_BASE_URL;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const fetchHolidayss = () => {
    axios
      .get(`${base_url}/holiday`)
      .then((response) => {
        console.log(response.data);
        setHolidayData(response.data); // Store the holiday data in state
      })
      .catch((err) => {
        console.log(err);
        setHolidayData([]); // Reset the state if there's an error
      });
  };

  const openEditModal = (holiday) => {
    setEditedHoliday(holiday);
    setEditModalOpen(true);
  };
  
  const closeEditModal = () => {
    setEditModalOpen(false);
  };
  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHoliday((prevHoliday) => ({
      ...prevHoliday,
      [name]: value,
    }));
  };

  
  const handleEditSubmit = () => {

    console.log(editedHoliday);

    const editSubmitHoliday={
      title: editedHoliday.title,
      comment: editedHoliday.comment
    }

    console.log(editSubmitHoliday, "editsubmitHOliday");

    axios.patch(`${base_url}/holiday/${editedHoliday.id}`,editSubmitHoliday)
    .then((response)=>{
      console.log(response);
      setEditModalOpen(false);
      fetchHolidayss(); 
      setSnackbarMessage('Holidays edited successfully');
      setSnackbarOpen(true);
    })
    .catch((err)=>{
      console.log(err);
      setSnackbarMessage('error');
      setSnackbarOpen(true);
    })
    
    

  };
  
  return (
    <>
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
      <Box sx={{display: 'flex', backgroundColor:'#ded9d9'}}>
        <SideBar/>
        <Container sx={{mt:2}}>
            <Typography variant='h4' sx={{textAlign:'center', fontFamily:'poppins'}}>
                Holidays
            </Typography>
            <Card sx={{opacity:'0.75'}}>
                <Typography sx={{fontFamily:'poppins', fontWeight:'bold', textDecoration:'underline'}}>
                    Select Holiday Date
                </Typography>
                <div style={{display:"flex"}}>
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker orientation="landscape" />
                    </LocalizationProvider> */}
                    <HolidayCalendar fetchHolidayss={fetchHolidayss}/>
                    {/* <div style={{margin:'auto', display:'flex', flexDirection:'column', gap:4}}>
                        <Typography>Title</Typography>
                        <TextField placeholder="Enter Title" size='small'/>
                        <Typography>Comment</Typography>
                        <TextField placeholder="Enter Comment" size='small' />
                        <Typography >
                            <Button variant="contained">Save</Button>
                        </Typography>
                    </div> */}
                </div>
                
            </Card>

            <Card>
            <Container>
                        <table style={{tableLayout:'fixed'}}>
                            <thead>
                                <tr style={{border:"2px solid black"}}>
                                <th  style={{padding:2,width:'25%', border:"2px solid black"}}>Title</th>
                                <th  style={{padding:2,width:'25%', border:"2px solid black"}}>Comment</th>
                                <th  style={{padding:2,width:'25%', border:"2px solid black"}}>Date</th>
                                </tr>
                            </thead>
                            <tbody >
                                {holidayData.map((data)=>(
                                    <tr >
                                    <td style={{padding:2,width:'25%', border:"2px solid black"}}>{data.title}</td>
                                    <td style={{padding:2,width:'25%', border:"2px solid black"}}>{data.comment}</td>
                                    <td style={{padding:2,width:'25%', border:"2px solid black"}}>{data.date}</td>
                                    {/* <td style={{padding:2,width:'25%', border:"2px solid black"}} ><ModeEditIcon/></td> */}
                                    <Button onClick={()=>openEditModal(data)}><ModeEditIcon/></Button>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                        </Container>
            {/* <ul>
              {holidayData.map((holiday) => (
                <li key={holiday.id}>
                  <strong>{holiday.title}</strong> - {holiday.comment}, Date: {holiday.date}
                </li>
              ))}
            </ul> */}
            </Card>
        </Container>
        <Dialog open={editModalOpen} onClose={closeEditModal}>
      <DialogTitle>Edit Holiday</DialogTitle>
      <DialogContent>
        <TextField
          sx={{mt:2}}
          label="Title"
          name="title"
          value={editedHoliday.title}
          onChange={handleEditInputChange}
          fullWidth
        />
        <TextField
          sx={{mt:2}}
          label="Comment"
          name="comment"
          value={editedHoliday.comment}
          onChange={handleEditInputChange}
          fullWidth
        />
        {/* Add more fields as needed for editing */}
        <Button variant="contained" onClick={handleEditSubmit} sx={{mt:2}}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
        </Box>
    </>
  )
}

export default Holiday
