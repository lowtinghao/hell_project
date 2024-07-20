import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';
import AssignTrainersPopup from '../components/AssignTrainersPopup';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// TODO: Modify this function to retrieve workshop request data from DB
function createData(id, clientname, workname, worktype) {
  return { id, clientname, workname, worktype, status: 'New' };
}

const date = new Date();
console.log(date);

const initialRows = [
  createData('0', 'Client 1', 'Workshop 1', 'Business'),
  createData('1', 'Client 2', 'Workshop 2', 'Technology'),
  createData('2', 'Client 3', 'Workshop 3', 'Design'),
  createData('3', 'Client 4', 'Workshop 4', 'Marketing')
];

export default function StickyHeadTable() {
  const [rows, setRows] = useState(initialRows);
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const theme = useTheme();
  // const navigate = useNavigate();

  
  const handleAccept = (index) => {
    const newRows = [...rows];
    newRows[index].status = 'Assign Instructors';
    setRows(newRows);
  };

  const handleReject = (index) => {
    const newRows = [...rows];
    newRows[index].status = 'Rejected';
    setRows(newRows);
  };

  const handleOpenModal = (workshop) => {
    setSelectedWorkshop(workshop);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedWorkshop(null);
  };

  // const handleAssignInstructors = (row) => {
  //   navigate('/AssignTrainers', { state: { workshop: row } });
  // }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    if (filter === 'All') {
      return true;
    }
    return row.status === filter;
  }); 

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <TableContainer component={Paper} sx={{ maxWidth: 900, width: '100%', margin: 'auto' }}>
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
                          backgroundColor: theme.palette.custom.accept, 
                          color: theme.palette.getContrastText(theme.palette.custom.accept),
                          '&:hover': {
                            backgroundColor: theme.palette.custom.accept,
                          },
                          marginRight: 1
                        }}
                        onClick={() => handleAccept(rows.indexOf(row))}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ 
                          backgroundColor: theme.palette.custom.reject, 
                          color: theme.palette.getContrastText(theme.palette.custom.reject),
                          '&:hover': {
                            backgroundColor: theme.palette.custom.reject,
                          }
                        }}
                        onClick={() => handleReject(rows.indexOf(row))}
                      >
                        Reject
                      </Button>
                    </>
                  ) : row.status === 'Assign Instructors' ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(row)}
                    >
                      Assign Instructors
                    </Button>
                  ) : (
                    row.status
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AssignTrainersPopup open={open} handleClose={handleCloseModal} workshop={selectedWorkshop}/>
    </Box>
  );
}
