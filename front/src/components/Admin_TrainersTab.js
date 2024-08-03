import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography, Tab } from '@mui/material';
import WorkshopDetailsPopup from './Admin_TrainersWorkshopsPopup';

const back_url = "localhost:3001";
async function fetchWorkshops() {
    let response = await fetch(`http://${back_url}/admin/workshops`);
    let data = await response.json();
		console.log('Fetched workshops');
    return data
}

async function fetchTrainers() {
    let response = await fetch(`http://${back_url}/admin/trainers`);
    let data = await response.json();
		console.log('Fetched trainers');
    return data
}

const filterWorkshopsToAccepted = (workshops, filter) => {

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

/*const filterWorkshopByTrainer = (workshops, trainerID) => {
    let filtered = [];
    let i;
    let j;
		console.log(workshops)
    for (i in Object.keys(workshops)){
			console.log('current workshop:',i)
        for (j in workshops[i].assignedTrainers){
            console.log('workshop:',workshops[i].workshopName);
						console.log('trainer assigned (j):',j)
						console.log('trainerID:',trainerID)
            // console.log('total assigned:',workshops[i].assignedTrainers);
            if (trainerID === j){
							console.log("trainer matched")
                filtered.push(workshops[i]);
								console.log('filtered',filtered);
            }
        }
    }
		console.log(filtered);
    return filtered;
}*/

const filterWorkshopByTrainer = (workshops, trainerID) => {
	let filtered = [];
	
	for (let workshopId in workshops) {
			const workshop = workshops[workshopId];
			console.log('Current workshop:', workshop.workshopId);
			
			if (workshop.assignedTrainers && workshop.assignedTrainers[trainerID]) {
					console.log('Trainer matched:', trainerID);
					filtered.push(workshop);
			}
	}
	
	console.log('Filtered workshops:', filtered);
	return filtered;
};

function TrainersTab(){
	// Initialize states
	const [filter, setFilter] = useState('All');
	const [rows, setRows] = useState([]);
	const [trainers, setTrainers] = useState({});
	const [allWorkshops, setAllWorkshops] = useState({});
	const [filteredWorkshops, setFilteredWorkshops] = useState({});
	const [allTrainers, setAllTrainers] = useState({});
	const [openPopup, setOpenPopup] = useState(false);
	const [assignedWorkshops, setAssignedWorkshops] = useState([]);
	const theme = useTheme();

  const filteredRows = Object.values(allTrainers);

	// Handlers
	const handleFilterChange = (event) => {
		console.log(event.target.value);
  	setFilter(event.target.value);
  };

	const handleOpenPopup = async (row) => {
		const trainerAssignedWorkshops = filterWorkshopByTrainer(allWorkshops, row.trainer_id);
		setAssignedWorkshops(trainerAssignedWorkshops);
		setOpenPopup(true);
		console.log('Open popup');
		console.log('assigned',assignedWorkshops);
	}

	const handleClosePopup = () => {
		// const res = filterWorkshopByTrainer(workshops, row.trainer_id);
		setOpenPopup(false);
		setAssignedWorkshops([]);
		console.log('Close popup');
	}
	
	// useEffect hooks
	// On initial render
	useEffect(() => {
		async function fetchData() {
				const workshops = await fetchWorkshops();
				const trainers = await fetchTrainers();
				setAllWorkshops(workshops);
				setAllTrainers(trainers);
				setFilteredWorkshops(filterWorkshopsToAccepted(workshops, 1));
		}
		fetchData();
		}, [])

	// // When ViewWorkshop is clicked
	// useEffect(() => {
	// 	async function fetchAssignedWorkshops(trainerId) {
	// 		setAssignedWorkshops(filterWorkshopByTrainer(workshops, trainerId));
	// 	}
	// 	fetchAssignedWorkshops();
	// 	}, [])

	

	// Main view
	return(
			<div>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
						<TableContainer component={Paper} sx={{ maxWidth: 900, width: '100%', margin: 'auto' }}>
							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
								<Typography variant="h5"> Trainers </Typography>
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
										<MenuItem value="New">Assigned</MenuItem>
										<MenuItem value="New">Not Assigned</MenuItem>
									</Select>
								</FormControl>
							</Box>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell align="center">Trainer ID</TableCell>
										<TableCell align="center">Trainer Name</TableCell>
										<TableCell align="center">Workshops Assigned</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filteredRows.map((row) => (
										<TableRow key={row.trainer_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
											<TableCell align="center">{row.trainer_id}</TableCell>
											<TableCell align="center">{row.trainer_name}</TableCell>
											<TableCell align="center">
												<>
												{/* {console.log(allWorkshops, row.trainer_id)} */}
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
												onClick={() => handleOpenPopup(row)}
												>
													View Assigned Workshops
												</Button>
												</>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
					<WorkshopDetailsPopup open={openPopup} handleClose={handleClosePopup} workshops={assignedWorkshops}/>
			</div>
	)
}

export default TrainersTab;