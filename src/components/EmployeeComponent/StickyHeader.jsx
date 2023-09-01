import React from 'react';
import { Grid, Paper} from '@mui/material';

import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const StickyHeader = () => {
  return (
    <>
          <Item sx={{backgroundColor:'aliceblue', width:'90%', textAlign:'center'}}>
            <marquee behavior="scroll" scroll-amount="2" width="100%" direction="left" height="20px" style={{paddingBottom:'10px'}}>
              <div  style={{fontWeight: 'bold', display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
              <p>This is sample scrolling text.</p>
              <p>This is sample  text.</p>
              <p>This is sample scrolling text.</p>
              </div>
            </marquee>
          </Item>
    </>
  )
}

export default StickyHeader
