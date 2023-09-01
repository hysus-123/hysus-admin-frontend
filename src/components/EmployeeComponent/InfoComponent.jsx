import React from 'react';
import GauravImage from '../../assets/gourav.png';
import { Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const InfoComponent = () => {
  return (
    <>
      <Item style={{width:'70%',margin:'auto', backgroundColor:'aliceblue'}}>
            <img src={GauravImage} alt="Gaurav " width="100%" />
            <Typography>
              Gaurav Shrivastav
            </Typography>
            <Typography>
              HYS-234234
            </Typography>
            <Typography>
              Full Stack Developer
            </Typography>
          </Item>
    </>
  )
}

export default InfoComponent
