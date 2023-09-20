import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography, Modal, ButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import {Box, Container, TextField} from '@mui/material';
import SideBar from '../pages/Sidebar/Sidebar';
import { Link , useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import LetterHead from './LetterHead';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor:'#2E3B55',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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

export default function App() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [letterHeadData, setLetterHeadData] = useState([])
  const [value , setValue] = useState('');
  useEffect(()=>{
    getAllLetterHead();
  },[])

  const base_url = process.env.REACT_APP_BASE_URL
  function getAllLetterHead(){
    axios
    .get(`${base_url}/letterhead`)
    .then(response =>{
      console.log(response.data, 'response'); 
      setLetterHeadData(response.data);
    })
    .catch(err=>{
      console.log(err,"err--->");
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("hii");
    console.log(value, "random value");
    axios.get(`${base_url}/letterhead/${value}`)
    .then((response)=>{
      console.log(response, 'response');
      navigate(`/emp-letterhead/${value}`);

    })
    .catch(err =>{
      console.log(err);
    })
  }

  return (
  <>
    <Box sx={{ display: 'flex', m: 4 }}>
        <SideBar />
        <Container>
          
    {/* <Button variant="contained"  style={{ margin: '20px' , display:'inline', float:'right', backgroundColor:'#2E3B55'}} component={Link}
          to="/letterhead">
      <AddIcon />New Letter Head 
    </Button> */}
    <LetterHead/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Serial No.</StyledTableCell>
            <StyledTableCell align='center'>Name</StyledTableCell>
            <StyledTableCell align='center'>Purpose</StyledTableCell>
            <StyledTableCell align='center'>Description</StyledTableCell>
            <StyledTableCell align='center'>Issued By</StyledTableCell>
            <StyledTableCell align='center'>Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {letterHeadData.map((letterhead) => (
            <StyledTableRow key={letterhead.id}>
              
              <StyledTableCell align="center">{letterhead.random5DigitValue}</StyledTableCell>
              <StyledTableCell align="center">{letterhead.name}</StyledTableCell>
              <StyledTableCell align="center">{letterhead.purpose}</StyledTableCell>
              <StyledTableCell align="center">{letterhead.values}</StyledTableCell>
              <StyledTableCell align="center">{letterhead.issued_by?.name}</StyledTableCell>
              <StyledTableCell align="center">
                <Button  onClick={handleOpen}><VisibilityIcon color='success'/></Button>
                  
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  >
                  <Box sx={style}>
                  <Container>
                  <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button disabled>HYS</Button>
                    {/* <Button>Two</Button> */}
                    <TextField  
                    value ={value}
                    required
                    onChange={(e)=>setValue(e.target.value)}
                    />
                  </ButtonGroup>
                  <Button sx={{display:'inline-block',float:'right', m:2}}variant="contained" onClick={handleSubmit}>Submit</Button>
                </Container>
                  </Box>
                </Modal>
                
              </StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </Container>
    </Box>
    </>
  );
}

