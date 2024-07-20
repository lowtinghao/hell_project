import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';

// TODO: Modify this function as GET request from DB for ALL trainers
function retrieveTrainers(trainerName, trainerAvail, trainerTeam) {
    return { trainerName, trainerTeam, trainerAvail };
}

// TODO: Modify this function as GET request from DB --> function should be pointing to request that was clicked in previous page
function retrieveWorkshopDetails(clientName, workshopName, workshopType, fromDate, toDate){
    return { clientName, workshopName, workshopType, fromDate, toDate }
}

  
// To remove this function when GET is implemented
const trainersDetails = [
retrieveTrainers('Aaron', 'Business', 'Busy'),
retrieveTrainers('Bob', 'Design', 'Available'),
retrieveTrainers('Chris', 'IT', 'Available'),
retrieveTrainers('Damian', 'IT', 'Available')
];

// To remove this function when GET is implemented
const requestDetails = [
    retrieveWorkshopDetails('Client 1', 'Workshop 1', 'Business', new Date(), new Date())
 ]

 export default function AssignTrainers() {
    // Declaring variables, initializing trainers table and filter
    const [rows, setRows] = useState(trainersDetails);
    const [filter, setFilter] = useState('Available');
    const theme = useTheme();

    return(
        <div></div>
    )

 }