import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';
const back_url = "localhost:3001";


// TODO: Modify this function as GET request from DB for ALL trainers
function retrieveTrainers(trainerId, trainerName, trainerTeam, trainerAvail) {
	return { trainerId, trainerName, trainerTeam, trainerAvail };
}
// To remove this function when GET is implemented
const initialRows = [
	retrieveTrainers(0, 'Aaron', 'Business', 'Busy'),
	retrieveTrainers(1, 'Bob', 'Design', 'Available'),
	retrieveTrainers(2, 'Chris', 'IT', 'Available'),
	retrieveTrainers(3, 'Damian', 'IT', 'Available')
];




// TODO: Modify this function as GET request from DB --> function should be pointing to request that was clicked in previous page
function ShowWorkshopDetails(workshop){
	const [workshops, setWorkshops] = useState({});
	const [rows, setRows] = useState([]);


	async function fetchWorkshops() {
		let response = await fetch(`http://${back_url}/admin/workshops`);
		let data = await response.json();
		setWorkshops(data)};

	useEffect(() => {
		fetchWorkshops();
		}, []);


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

  function createData(clientid, clientname, workname, worktype, fromDate, toDate, status, workshopId) {
    return { clientid, clientname, workname, worktype, fromDate, toDate, status, workshopId};
  }

  useEffect(() => {
	let filtered = filterWorkshops(workshops, -1);
	let formattedWorkshops = formatWorkshopJson(filtered);
	setRows([...formattedWorkshops]);
	console.log("Populating Table")
}, [workshops]);

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
							<TableCell>Client ID</TableCell>
							<TableCell>Client Name</TableCell>
							<TableCell align="center">Workshop Name</TableCell>
							<TableCell align="center">Workshop Type</TableCell>
							<TableCell align="center">From</TableCell>
							<TableCell align="center">To</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
							<TableCell component="th" scope="row">{workshop['clientid']}</TableCell>
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
function TrainerAvailability(props) {
	// Retrieve passed data of workshop using location
  	const workshop = props.workshop;

	// Initializing useStates	
	const [rows, setRows] = useState(initialRows);
  const [filter, setFilter] = useState('All');
	const theme = useTheme();

	// Initialization
	const filteredRows = rows.filter((row) => {
    if (filter === 'All') {
      return true;
    }
    return row.status === filter;
  }); 

	// Button handlers here
	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const handleAssign = (index) => {
    const newRows = [...rows];
    newRows[index].trainerAvail = 'Assigned';
    setRows(newRows);
		
		// TODO: function to send POST to DB for workshop trainer assignment
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
										<TableCell>ID</TableCell>
										<TableCell>Name</TableCell>
										<TableCell align="center">Team</TableCell>
										<TableCell align="center">Availability</TableCell>
									</TableRow>
								</TableHead>
					</Table>
					<TableBody>
						{filteredRows.map((row) => (
							<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component="th" scope="row">{row.trainerId}</TableCell>
									<TableCell align="center">{row.trainerName}</TableCell>
									<TableCell align="center">{row.trainerTeam}</TableCell>
									<TableCell align="center">{row.trainerAvail}</TableCell>
									<TableCell align="center">
										{row.trainerAvail === 'Available'? (
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
													onClick={() => handleAssign(rows.indexOf(row))}
													>
													Assign Workshop
												</Button>
											</>
										) : (
											row.trainerAvail
										)} 
									</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TableContainer>
			</Box>
		</div>
	);
}

export default TrainerAvailability;
