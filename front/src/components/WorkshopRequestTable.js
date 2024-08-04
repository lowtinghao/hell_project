import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';
import { ThemeProvider } from '../components/ThemeProvider';
import AssignTrainer from '../components/AssignTrainer';
import AssignTrainersnew from '../components/AssignTrainersnew';

const back_url = "localhost:3001";
// TODO: Modify this function to retrieve workshop request data from DB
function createData(clientid, clientname, workname, worktype, fromDate, toDate, status, workshopId) {
    return { clientid, clientname, workname, worktype, fromDate, toDate, status, workshopId};
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
		for (i in Object.keys(workshops)){
			filtered.push(workshops[i]);
		}
	} else {
		for (i in Object.keys(workshops)){
			if (workshops[i].status === filter){
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
	for (i in filteredWorkshops){
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

  

export default function WorkshopRequestTable() {	
	// Initializing variables here
	const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState('All');
    const theme = useTheme();
	const [workshops, setWorkshops] = useState({});
	const [page, setPage] = useState("main"); 
	const [selectedWorkshop, setSelectedWorkshop] = useState({});

	const handleAssignTrainerClick = (row) => {
		console.log('Assign trainer clicked');
		console.log(row);
		setPage("assign");
		setSelectedWorkshop(row);
	  }


	async function fetchWorkshops() {
		let response = await fetch(`http://${back_url}/admin/workshops`);
		let data = await response.json();
		setWorkshops(data)};

	const acceptWorkshop = async (workshop_id) => {
		let workshopToAccept = workshops.find(workshop => workshop.workshopId === workshop_id);
		workshopToAccept.status = 1;
		const response = await fetch(`http://${back_url}/admin/workshops/${workshop_id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(workshopToAccept)
		})

		if (response.status === 200) {
			console.log('Workshop accepted');
			return true;
		} else {
			console.log('Failed to accept workshop');
			return false;
		}
	};

	const rejectWorkshop = async (workshop_id) => {
		let workshopToReject = workshops.find(workshop => workshop.workshopId === workshop_id);
		workshopToReject.status = 2;
		const response = await fetch(`http://${back_url}/admin/workshops/${workshop_id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(workshopToReject)
		})

		if (response.status === 200) {
			console.log('Workshop rejected');
			return true;
		} else {
			console.log('Failed to reject workshop');
			return false;
		}
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
		if (filter === 'All'){
			let filtered = filterWorkshops(workshops, -1);
			let formattedWorkshops = formatWorkshopJson(filtered);
			setRows([...formattedWorkshops]);
		} else if (filter === 'New'){
			let filtered = filterWorkshops(workshops, 0);
			let formattedWorkshops = formatWorkshopJson(filtered);
			setRows([...formattedWorkshops]);
		} else if (filter === 'Rejected') {
			let filtered = filterWorkshops(workshops, 2);
			let formattedWorkshops = formatWorkshopJson(filtered);
			setRows([...formattedWorkshops]);
		} else if (filter === 'Assign Instructors') {
			let filtered = filterWorkshops(workshops, 1);
			let formattedWorkshops = formatWorkshopJson(filtered);
			setRows([...formattedWorkshops]);
		}
	}, [filter, workshops]);

	// Here are all the button handlers
	const handleAccept = async (row) => {
		const res = await acceptWorkshop(row.workshopId);
		if (res){
			console.log('Workshop accepted');
			fetchWorkshops();
		} else {
			console.log('Failed to accept workshop');
		}
  };

  const handleReject = async (row) => {
	const res = await rejectWorkshop(row.workshopId);
		if (res){
			console.log('Workshop accepted');
			fetchWorkshops();
		} else {
			console.log('Failed to accept workshop');
		}
  };

	const handleAssignInstructors = (index) => {
		console.log('Assign instructors clicked');

	};

	const handleFilterChange = (event) => {
		console.log(event.target.value);
    	setFilter(event.target.value);
  };

  if (page === "assign") {
	return (
		<div>
			<Button onClick={() => setPage("main")}> Back</Button>
			<ThemeProvider>
				<AssignTrainersnew workshop={selectedWorkshop}></AssignTrainersnew>
			</ThemeProvider>
		</div>
	);
  }

	// Main frontend view
	if (page === "main") {
		return (
			<div>
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
					<TableContainer component={Paper} sx={{ maxWidth: 900, width: '100%', margin: 'auto' }}>
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
							<Typography variant="h5" data-testid="table-title">Workshop Requests</Typography>
							<FormControl sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id="filter-label" data-testid="filter-label">Filter</InputLabel>
								<Select
									labelId="filter-label"
									id="filter-select"
									value={filter}
									label="Filter"
									onChange={handleFilterChange}
									data-testid="filter-select"
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
									<TableCell data-testid="client-id-header">Client ID</TableCell>
                                                                        <TableCell data-testid="client-name-header">Client Name</TableCell>
                                                                        <TableCell align="center" data-testid="workshop-name-header">Workshop Name</TableCell>
                                                                        <TableCell align="center" data-testid="workshop-type-header">Workshop Type</TableCell>
                                                                        <TableCell align="center" data-testid="status-header">Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row, index) => (
									<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component="th" scope="row" data-testid={`client-id-${row.workshopId}`}>{row.clientid}</TableCell>
										<TableCell align="center" data-testid={`client-name-${row.workshopId}`}>{row.clientname}</TableCell>
                                                                                <TableCell align="center" data-testid={`workshop-name-${row.workshopId}`}>{row.workname}</TableCell>
                                                                                <TableCell align="center" data-testid={`workshop-type-${row.workshopId}`}>{row.worktype}</TableCell>
                                                                                <TableCell align="center" data-testid={`status-${row.workshopId}`}>
											{row.status === 0 ? ( //This represents a new request
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
														onClick={() => handleAccept(row)}
									                                        data-testid={`accept-button-${row.workshopId}`}
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
														onClick={() => handleReject(row)}
                                                                                                                data-testid={`reject-button-${row.workshopId}`}
													>
														Reject
													</Button>
												</>
											) : row.status === 1 ? ( // The value 1 represents a request that has been accepted
												<Button 
												variant="contained" 
												color="primary"
												onClick={() => {handleAssignTrainerClick(row)}}
												data-testid={`assign-trainer-button-${row.workshopId}`}
												//to="/admin/assign"
												//state={{workshop:row}}
												>
													{/* <Link to="/assign-trainer"> */}
													Assign Trainer
													{/* </Link> */}
												</Button>
											) : row.status === 2 ? ( // The value 2 represents a request that has been rejected
												<p data-testid={`rejected-text-${row.workshopId}`}>Rejected</p>
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
}

  
