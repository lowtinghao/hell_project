import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';

const back_url = "localhost:3001";
// TODO: Modify this function to retrieve workshop request data from DB
function createData(clientid, clientname, workname, worktype, fromDate, toDate, status, workshopId) {
    return { clientid, clientname, workname, worktype, fromDate, toDate, status, workshopId };
}

const date = new Date();
console.log(date);



const initialRows = [
    createData('0', 'Client 1', 'Workshop 1', 'Business', date, date),
    createData('1', 'Client 2', 'Workshop 2', 'Technology', date, date),
    createData('2', 'Client 3', 'Workshop 3', 'Design', date, date),
    createData('3', 'Client 4', 'Workshop 4', 'Marketing', date, date)
];

// This function filters workshops by their status
// A -1 status means all workshops are returned
// Status code : -1 -> All, 0 -> New, 1 -> Assign Instructors, 2 -> Rejected
const filterWorkshops = (workshops, filter) => {
    let filtered = [];
    let i;
    if (filter === -1) {
        for (i in Object.keys(workshops)) {
            filtered.push(workshops[i]);
        }
    } else {
        for (i in Object.keys(workshops)) {
            if (workshops[i].status === filter) {
                filtered.push(workshops[i]);
            }
        }
    }

    return filtered;
};

// This function converts filtered list of workshops into the correct format
const formatWorkshopJson = (filteredWorkshops) => {
    let i;
    let workshopRows = [];
    for (i in filteredWorkshops) {
        workshopRows.push(createData(
            filteredWorkshops[i].client_id,
            filteredWorkshops[i].companyName,
            filteredWorkshops[i].companyName,
            filteredWorkshops[i].clientType,
            filteredWorkshops[i].dates[0],
            filteredWorkshops[i].dates[filteredWorkshops[i].dates.length - 1],
            filteredWorkshops[i].status,
            filteredWorkshops[i].workshopId));
    }
    return workshopRows;
}




export default function ViewClientWorkshopsTable() {
    // Initializing variables here
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState('All');
    const theme = useTheme();
    const [workshops, setWorkshops] = useState({});

    async function fetchWorkshops() {
        // TODO: update fetch url with /workshops instead of /workshops when client id filtering works
        let response = await fetch(`http://${back_url}/client/allworkshops`);
        let data = await response.json();

        // remove rejected workshops
        data = data.filter(item => item.status !== 2);
        console.log(data);
        setWorkshops(data)
    };


    // This effect fetches workshop data from the backend, on initial render.
    useEffect(() => {
        fetchWorkshops();
    }, []);

    // This effect populates the table when workshops update
    useEffect(() => {
        let filtered = filterWorkshops(workshops, -1);
        let formattedWorkshops = formatWorkshopJson(filtered);
        setRows([...formattedWorkshops]);
        console.log("Populating Table")
    }, [workshops]);

    // This effect filters the table when the filter changes
    useEffect(() => {
        if (filter === 'All') {
            let filtered = filterWorkshops(workshops, -1);
            let formattedWorkshops = formatWorkshopJson(filtered);
            setRows([...formattedWorkshops]);
        } else if (filter === 'Pending') {
            let filtered = filterWorkshops(workshops, 0);
            let formattedWorkshops = formatWorkshopJson(filtered);
            setRows([...formattedWorkshops]);
        } else if (filter === 'Accepted') {
            let filtered = filterWorkshops(workshops, 1);
            let formattedWorkshops = formatWorkshopJson(filtered);
            setRows([...formattedWorkshops]);
        } else if (filter === 'Rejected') {
            let filtered = filterWorkshops(workshops, 2);
            let formattedWorkshops = formatWorkshopJson(filtered);
            setRows([...formattedWorkshops]);
        }
    }, [filter, workshops]);




    const handleFilterChange = (event) => {
        console.log(event.target.value);
        setFilter(event.target.value);
    };



    // Main frontend view
    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                <TableContainer component={Paper} sx={{ maxWidth: 900, width: '100%', margin: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
                        <Typography variant="h5">View All Workshops</Typography>
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
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Accepted">Accepted</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Client ID</TableCell>
                                <TableCell>Client Name</TableCell>
                                <TableCell align="center">Workshop Name</TableCell>
                                <TableCell align="center">Workshop Type</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{row.clientid}</TableCell>
                                    <TableCell align="center">{row.clientname}</TableCell>
                                    <TableCell align="center">{row.workname}</TableCell>
                                    <TableCell align="center">{row.worktype}</TableCell>
                                    <TableCell align="center">
                                        {row.status === 0 ? ( //This represents a new request
                                            <>
                                                <p>Pending</p>
                                            </>
                                        ) : row.status === 1 ? ( // The value 1 represents a request that has been accepted
                                            <p>Accepted</p>
                                        ) : row.status === 2 ? ( // The value 2 represents a request that has been rejected
                                            <p>Rejected</p>
                                        ) : (
                                            row.status
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <AssignTrainersPopup open={open} handleClose={handleCloseModal} workshop={selectedWorkshop}/> */}
            </Box>
        </div>

    );
}

