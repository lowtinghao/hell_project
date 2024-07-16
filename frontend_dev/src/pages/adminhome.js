import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';

function createData(clientname, workname, worktype) {
  return { clientname, workname, worktype, status: 'New' };
}

const rows = [
  createData('Client 1', 'Workshop 1', 'Business'),
  createData('Client 2', 'Workshop 2', 'Technology'),
  createData('Client 3', 'Workshop 3', 'Design'),
  createData('Client 4', 'Workshop 4', 'Marketing')
];

export default function StickyHeadTable() {
  const [tableRows, setTableRows] = useState(rows);
  const [filter, setFilter] = useState('All');
  const theme = useTheme();

  const handleAccept = (index) => {
    const newRows = [...tableRows];
    newRows[index].status = 'Assign Instructors';
    setTableRows(newRows);
  };

  const handleReject = (index) => {
    const newRows = [...tableRows];
    newRows[index].status = 'Rejected';
    setTableRows(newRows);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredRows = tableRows.filter((row) => {
    if (filter === 'All') {
      return true;
    }
    return row.status === filter;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <TableContainer component={Paper} sx={{ maxWidth: 700, width: '100%', margin: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
          <Typography variant="h5">Workshop Requests</Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="filter-label">Filter</InputLabel>
            <Select
              labelId="filter-label"
              id="filter-select"
              value={filter}
              label="Filter"
              onChange={handleFilterChange}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Assign Instructors">Assign Instructors</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell align="center">Workshop Name</TableCell>
              <TableCell align="center">Workshop Type</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={row.clientname} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row.clientname}</TableCell>
                <TableCell align="center">{row.workname}</TableCell>
                <TableCell align="center">{row.worktype}</TableCell>
                <TableCell align="center">
                  {row.status === 'New' ? (
                    <>
                      <Button
                        variant="contained"
                        sx={{ 
                          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light, 
                          color: theme.palette.mode === 'dark' ? theme.palette.success.contrastText : theme.palette.success.contrastText,
                          '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.success.main : theme.palette.success.dark,
                          },
                          marginRight: 1
                        }}
                        onClick={() => handleAccept(index)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ 
                          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.error.dark : theme.palette.error.light, 
                          color: theme.palette.mode === 'dark' ? theme.palette.error.contrastText : theme.palette.error.contrastText,
                          '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.error.main : theme.palette.error.dark,
                          }
                        }}
                        onClick={() => handleReject(index)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    row.status
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
