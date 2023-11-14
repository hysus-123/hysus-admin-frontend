import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography , Container} from '@mui/material';
import axios from 'axios';

const EmpLetterHead = () => {
    const {id} = useParams();
    const [data, setData] = useState('');
    const base_url = process.env.REACT_APP_BASE_URL
    useEffect(()=>{
        getLetterHead(id)
    }, [id])

    const getLetterHead = () =>{
        axios.get(`${base_url}/letterhead/${id}`)
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
                    Serial No: {data.unique_id}
                </Typography>
                <Typography>
                    Name: {data.name}
                </Typography>
                <Typography>
                    Purpose: {data.purpose}
                </Typography>
                <Typography>
                    IssuedBy: {data.issued_by?.employee_name}
                </Typography>
        </Paper>
            </Container>
    </>
  )
}

export default EmpLetterHead;
