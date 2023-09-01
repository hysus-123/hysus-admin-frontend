import React from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import SideBar from '../pages/Sidebar/Sidebar';
import {Button} from '@mui/material';
import LetterHeadIssue from'./LetterHeadIssue';

const LetterHead = () => {
  return (
    <>
    <Box sx={{display:'flex', m:4}}>
      <SideBar/>
      <form style={{margin:'auto'}}>
        <Typography variant='h5' sx={{textAlign:'center'}}>Issued LetterHead</Typography>
        <Container sx={{display:'flex', margin:'auto', flexDirection:'column', mt:3, width:'50vw'}}>
            <TextField label="Enter name of Employee" sx={{mt:2}}/>
            <TextField label="Enter purpose for issuing letterhead" sx={{mt:2}}/>
            <LetterHeadIssue sx={{mt:2}}/>
            <Button variant="contained" color="success" sx={{mt:2, width:'20%'}}>Submit</Button>
        </Container>
      </form>
    </Box>
    </>
  )
}

export default LetterHead
