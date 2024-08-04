import * as React from 'react';
import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const back_url = "localhost:3001";

// Get workshop from prop
// Get workshop id from workshop

// Fetch workshop information from database
// Fetch all trainers from database

// Using workshop.assignedTrainers, filter out trainers that are already assigned to the workshop

// Using workshop.assignedTrainers, filter out trainers that are not assigned to the workshop

// Display the two lists of trainers

// If a trainer is not assigned this workshop, show a button that allows the admin to assign the trainer to the workshop
// This should create a post request to the database, updating the workshopid


const App = (prop) => {

    

    const [workshop, setWorkshop] = useState([]);
    const [allTrainers, setAllTrainers] = useState([]);
    const [assignedTrainers, setAssignedTrainers] = useState([]);
    const [notAssignedTrainers, setNotAssignedTrainers] = useState([]);

    // TODO 1 : Fetch workshop information from database
    useEffect(() => {
        const fetchWorkshop = async () => {
            const response = await fetch(`http://${back_url}/admin/workshops/${prop.workshop.workshopId}`);
            const data = await response.json();
            setWorkshop(data[0]);
        }
        
        fetchWorkshop();
    }, [prop.workshop.workshopId]);

    // TODO 2 : Fetch all trainers from database 
    useEffect(() => {
        const fetchTrainers = async () => {
            const response = await fetch(`http://${back_url}/admin/trainers`);
            const data = await response.json();
            setAllTrainers(data);
            console.log(data);
        }
        
        fetchTrainers();
    }
    , []);

    // TODO 3 : Using workshop.assignedTrainers, get the workshop information of the trainers that are already assigned to the workshop

    useEffect(() => {
        const castArray = value => Array.isArray(value) ? value : [value];
        let assignedTrainers = castArray(workshop.assignedTrainers);
        let assignedTrainersInfo = [];
        let notAssignedTrainersInfo = [];
        let j;
        for (j in allTrainers){
            if (assignedTrainers.includes(allTrainers[j].trainer_id)){
                assignedTrainersInfo.push(allTrainers[j]);
            } else {
                notAssignedTrainersInfo.push(allTrainers[j]);
            }
        }
        setAssignedTrainers(assignedTrainersInfo);
        setNotAssignedTrainers(notAssignedTrainersInfo);
    }, [workshop, allTrainers]);


    const handleAssignTrainerClick = async (row) => {
        console.log(workshop);
        console.log(row.trainer_id);
        const newWorkshop = workshop;
        newWorkshop.assignedTrainers.push(row.trainer_id);
        console.log(newWorkshop);
        const response = await fetch(`http://${back_url}/admin/workshops/${workshop.workshopId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newWorkshop),
        })
        if (response.status === 200) {
            let newWorkshop = JSON.parse(JSON.stringify(workshop));
            newWorkshop.assignedTrainers.push(row.trainer_id);
            setWorkshop(newWorkshop);
        } else {
            console.log('Failed to assign trainer')
        }
    }

    return (
        <div>
            <h1>Assigned Trainers</h1>
            <TableContainer component={Paper}>
                <Table x={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {assignedTrainers.map((row) => (
                        <TableRow
                        key={row.trainer_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.trainer_id}
                            </TableCell>
                            <TableCell align="center">{row.trainer_name}</TableCell>
                            <TableCell align="center">Assigned</TableCell>
                        </TableRow>
                    ))}</TableBody>
                </Table>
            </TableContainer>
            <h1>Trainers not assigned</h1>
            <TableContainer component={Paper}>
                <Table x={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {notAssignedTrainers.map((row) => (
                        <TableRow
                        key={row.trainer_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >   
                            <TableCell component="th" scope="row">
                                {row.trainer_id}
                            </TableCell>
                            <TableCell align="center">{row.trainer_name}</TableCell>
                            <TableCell align="center"><Button onClick={() => handleAssignTrainerClick(row)}>Assign</Button></TableCell>
                        </TableRow>
                    ))}</TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

export default App;