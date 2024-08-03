import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';

const back_url = "localhost:3001";
// TODO: Modify this function as GET request from DB for ALL trainers
function createData(trainerId, trainerName, trainerTeam, trainerAvail) {
	return { trainerId, trainerName, trainerTeam, trainerAvail };
}

/* Initial testing 
// To remove this function when GET is implemented
const initialRows = [
	retrieveTrainers(0, 'Aaron', 'Business', 'Busy'),
	retrieveTrainers(1, 'Bob', 'Design', 'Available'),
	retrieveTrainers(2, 'Chris', 'IT', 'Available'),
	retrieveTrainers(3, 'Damian', 'IT', 'Available')
]; */

const filterTrainers = (trainers, filter) => {
	let filtered = [];
	let i;
	if (filter === -1) {
		for (i in Object.keys(trainers)){
			filtered.push(trainers[i]);
		}
	} else {
		for (i in Object.keys(trainers)){
			if (trainers[i].status === filter){
				filtered.push(trainers[i]);
			}
		}
	}

	return filtered;
}

  // This function converts filtered list of trainers into the correct format
const formatTrainerJson = (filteredTrainers) => {
	let i;
	let trainerRows = [];
	for (i in filteredTrainers){
		trainerRows.push(createData(
			filteredTrainers[i].trainer_id,
			filteredTrainers[i].trainer_name
		));
	}
	return trainerRows;
}


// TODO: Modify this function as GET request from DB --> function should be pointing to request that was clicked in previous page
function ShowWorkshopDetails(workshop){
	console.log((new Date(workshop['fromDate'])).toLocaleDateString());
	return (
		<div>
			{/* Show details of selected worskshop */}
			<Box p={2} mb={4}>
				<TableContainer component={Paper} sx={{ maxWidth: 900, width: '100%', margin: 'auto' }}>
					<Typography variant="h5">Workshop details:</Typography>
					<p/>
					<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Worskshop ID</TableCell>
							<TableCell align="center">Client ID</TableCell>
							<TableCell align="center">Client Name</TableCell>
							<TableCell align="center">Workshop Name</TableCell>
							<TableCell align="center">Workshop Type</TableCell>
							<TableCell align="center">From</TableCell>
							<TableCell align="center">To</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableCell align="center" component="th" scope="row">{workshop.workshopId}</TableCell>
							<TableCell align="center">{workshop['clientid']}</TableCell>
							<TableCell align="center">{workshop['clientname']}</TableCell>
							<TableCell align="center">{workshop['workname']}</TableCell>
							<TableCell align="center">{workshop['worktype']}</TableCell>
							<TableCell align="center">{(new Date(workshop['fromDate'])).toLocaleDateString()}</TableCell>
							<TableCell align="center">{(new Date(workshop['fromDate'])).toLocaleDateString()}</TableCell>
					</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</div>
	);
}


/* Main view fucntionality */
function TrainerAvailability() {
	// Retrieve passed data of workshop using location
	const location = useLocation();
  const workshop = location.state?.workshop;

	console.log("workshop id",workshop.workshopId);

	// Initializing useStates	
	const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState('All');
	const theme = useTheme();
	const [trainers, setTrainers] = useState({});

	// Initialization
	const filteredRows = rows.filter((row) => {
    if (filter === 'All') {
      return true;
    }
    return row.status === filter;
  }); 

	// Retrieving trainers from backend
	async function fetchTrainers() {
		let response = await fetch(`http://${back_url}/admin/trainers`);
		let data = await response.json();
		setTrainers(data);
	}

	// POST method to DB when assigning trainer
	const assignTrainer = async (trainer_id, workshop_id) => {
		let trainerToAssign = trainers.find(trainer => trainer.trainerId === trainer_id);
		const response = await fetch(`http://${back_url}/admin/assign-trainer/${trainer_id}/${workshop_id}`, {
			method : 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(trainerToAssign)
		})

		if (response.status === 200) {
			console.log('Trainer assigned');
			return true;
		} else {
			console.log('Failed to assign trainer');
			return false;
		}
	}


	// This effect fetches trainer data from the backend, on initial render.
	useEffect(() => {
		fetchTrainers();
		}, []);

	// This effect populates the table when workshops update
	useEffect(() => {
		let filtered = filterTrainers(trainers, -1);
		let formattedTrainers = formatTrainerJson(filtered);
		setRows([...formattedTrainers]);
		console.log("Populating Table")
	}, [trainers]);



	// Button handlers here
	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const handleAssign = async (row, workshop) => {
    /*const newRows = [...rows];
    newRows[index].trainerAvail = 'Assigned';
    setRows(newRows);*/
		
		// TODO: function to send POST to DB for workshop trainer assignment
		const res = await assignTrainer(row.trainerId, workshop.workshopId);
		if (res){
			console.log('Trainer assigned');
			fetchTrainers();
		} else{
			console.log('Failed to assign trainer');
		}
  };

	return (
		<div>
			{ShowWorkshopDetails(workshop)}
		
			{/* Show all available trainers */}
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
				<TableContainer component={Paper} sx={{ maxWidth: 900, width: '100%', margin: 'auto' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
						<Typography variant="h5">Trainers</Typography>
						<FormControl sx={{ m: 1, minWidth: 120 }}>
							<InputLabel id="filter-label">Filter</InputLabel>
							<Select labelId="filter-label" id="filter-select" value={filter} label="Filter" onChange={handleFilterChange}>
								<MenuItem value="Available">Available</MenuItem>
								<MenuItem value="Busy">Busy</MenuItem>
								<MenuItem value="Assigned">Assigned</MenuItem>
								<MenuItem value="All">All</MenuItem>
							</Select>
						</FormControl>
				</Box>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">ID</TableCell>
							<TableCell align="center">Name</TableCell>
							<TableCell align="center">Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="center" component="th" scope="row">{row.trainerId}</TableCell>
									<TableCell align="center">{row.trainerName}</TableCell>
									<TableCell align="center">
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
													onClick={() => handleAssign(row, workshop)}
													>
													Assign Workshop
												</Button>
										</>
										{/* {row.trainerAvail === 'Available'? (
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
													onClick={() => handleAssign(row)}
													>
													Assign Workshop
												</Button>
											</>
										) : (
											row.trainerAvail
										)}  */}
									</TableCell>
							</TableRow>
						))}
					</TableBody>
					
					</Table>
				</TableContainer>
			</Box>
		</div>
	);
}

export default TrainerAvailability;
