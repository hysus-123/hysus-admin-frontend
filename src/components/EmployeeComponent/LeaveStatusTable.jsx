import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(Description, Leave,Date,  Day, Status, ) {
  return { Description, Leave,Date, Day, Status,  };
}

const rows = [
  createData('Because of my healt issue', 'Sick','12 Aug 2021', 'H.D', 'approved'),
  createData('Because of my friend coming from america fsdjakgasdkf hksd f jdfs sdfklsd  sdfjslkfsd ksdfjsdkfj','12 Aug 2021', 'Casual', 'H.D', 'approved'),
  createData('Because of my personal ', 'Casual','12 Aug 2021', 'F.D', 'pending'),
//   createData('Because of my healt issue', 'Sick', 'H.D', 'approved'),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Leave</TableCell>
            <TableCell align="right">Day</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Description}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Description}
              </TableCell>
              <TableCell align="right">{row.Leave}</TableCell>
              <TableCell align="right">{row.Day}</TableCell>
              <TableCell align="right">{row.Date}</TableCell>
              <TableCell align="right">{row.Status}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
