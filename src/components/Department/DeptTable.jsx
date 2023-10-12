import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(name, calories, fat, carbs, protein, details) {
  return { name, calories, fat, carbs, protein , details};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3 ,4),
  createData('Eclair', 262, 16.0, 24, 6.0, 4),
  createData('Cupcake', 305, 3.7, 67, 4.4, 89),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 5.4),
];

export default function CustomizedTables(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee Name</StyledTableCell>
            <StyledTableCell align="right">Employement Type</StyledTableCell>
            <StyledTableCell align="right">Report To</StyledTableCell>
            <StyledTableCell align="right">Joining Date</StyledTableCell>
            <StyledTableCell align="right">Provision Period End</StyledTableCell>
            <StyledTableCell align="right">Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.employee.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right">{row.details}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
