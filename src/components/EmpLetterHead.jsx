import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography , Container} from '@mui/material';
import axios from 'axios';

const EmpLetterHead = () => {
    const {id} = useParams();
    const [data, setData] = useState('');

    useEffect(()=>{
        getLetterHead(id)
    }, [id])

    const getLetterHead = () =>{
        axios.get(`https://hysus-admin-backend-production.up.railway.app/api/letterhead/${id}`)
        .then((response)=>{
            console.log(response);
            setData(response.data);
        })
        .catch(err=>console.log(err));
    }

  return (
    <>  
        <Container>
        <Paper>
                <Typography>
                    Serial No: HYS-{data.random5DigitValue}
                </Typography>
                <Typography>
                    Name: {data.name}
                </Typography>
                <Typography>
                    Purpose: {data.purpose}
                </Typography>
                <Typography>
                    IssuedBY: {data.issued_by?.name}
                </Typography>
        </Paper>
            </Container>
    </>
  )
}

export default EmpLetterHead;
