import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 245 , height:"100%"}}>
      <CardActionArea>
        
        <CardContent>
            <div style={{display:'flex', flexDirection:'column', margin:'auto', justifyContent:'center' , alignItems:'center'}}>
                
            <Typography >
                {/* <MenuIcon sx={{display:'inline-block', float:'right'}}/> */}
                {props.components}
            </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={{marginTop:'20px'}}>
            0
          </Typography>
          <Typography variant="h6" color="text.secondary">
          {props.title}
          </Typography>
          
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}
