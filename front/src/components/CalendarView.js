import React, { useEffect, useState } from 'react';
import { Paper, Box, useTheme, Grid } from '@mui/material';
import { Scheduler, WeekView, Appointments, Toolbar, DateNavigator, TodayButton, ViewSwitcher, MonthView,  DayView, AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Room, Person, Group, Comment } from '@mui/icons-material';

// TODO: Change this to an API to retrieve data from the database
const back_url = "localhost:3001";

// Retrieve workshops from database
async function fetchWorkshops() {
    let response = await fetch(`http://${back_url}/admin/workshops`);
    let data = await response.json();
    return data
}
async function fetchTrainers() {
    let response = await fetch(`http://${back_url}/admin/trainers`);
    let data = await response.json();
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

// Format workshop details for component
function workshopDates(workshops, trainers){
	const workshopObjects = Object.values(workshops);
	const trainerObjects = Object.values(trainers);
	console.log('workshop objects:',workshopObjects);
	console.log('trainer objects:',trainerObjects);
	// console.log('workshop objects example:',workshopObjects[0].dates[0]);

	// Date formatter 
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		// return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T12:00`;
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
	};

	// Function to get trainer names from IDs
    const getTrainerNames = (trainerIds) => {
        return trainerIds.map(id => {
            const trainer = trainerObjects.find(t => t.trainer_id === id);
            return trainer ? trainer.trainer_name : 'Unknown Trainer';
        }).join(', ');
    };
	
	const mappedWorkshops = workshopObjects.map(workshop => {
		const startDate = formatDate(workshop.dates[0]);
		let endDate;
		if(workshop.dates[1] && workshop.dates[1] !== ''){
			endDate = formatDate(workshop.dates[1]);
		} else{
			endDate = startDate;
		}
		console.log('start date:',startDate);
		console.log('end date:',endDate);
		return {
			startDate: startDate,
            endDate: endDate,
            title: workshop.workshopName,
			location: workshop.venue || 'Location not specified',
			client: workshop.companyName || 'Client not specified',
			trainers: getTrainerNames(workshop.assignedTrainers || [])
		}
	});

	console.log('mappedWorkshops:',mappedWorkshops)
	return mappedWorkshops;
}



/*async function fetchDates(){
	return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { startDate: '2024-07-22T09:45', endDate: '2024-07-22T11:00', title: 'Workshop 1' },
        { startDate: '2024-07-23T12:00', endDate: '2024-07-23T13:30', title: 'Workshop 2' },
      ]);
    }, 1000);
  });
}*/

// Component for workshop details
const Content = ({ children, appointmentData, ...restProps }) => {
    if (!appointmentData) {
        return <AppointmentTooltip.Content {...restProps}>No data available</AppointmentTooltip.Content>;
    }

    const {
        location = 'N/A',
        client = 'N/A',
		trainers = 'N/A'
        // Add other fields as needed
    } = appointmentData;

    return (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    <Room fontSize="small" />
                </Grid>
                <Grid item xs={10}>
                    <span>{location}</span>
                </Grid>
                <Grid item xs={2}>
                    <Person fontSize="small" />
                </Grid>
                <Grid item xs={10}>
                    <span>{client}</span>
                </Grid>
                <Grid item xs={2}>
                    <Group fontSize="small" />
                </Grid>
                <Grid item xs={10}>
                    <span>{trainers}</span>
                </Grid>
                {/* Add other fields as needed */}
            </Grid>
        </AppointmentTooltip.Content>
    );
};


function CalendarView(){
	const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  	const [data, setData] = useState([]);
	const [allWorkshops, setAllWorkshops] = useState({});
	const [filteredWorkshops, setFilteredWorkshops] = useState({});
	const [allTrainers, setAllTrainers] = useState({});
	const theme = useTheme();

	// Using useEffect() to fetch data when component mounts
	// useEffect(() => {
	// 	const loadData = async() => {
	// 		const fetchedData = await fetchDates();
	// 		setData(fetchedData);
	// 		console.log('dates:',data);
	// 	};
	// 	loadData();
	// }, []);

	// Render data
	useEffect(() => {
		async function fetchData() {
			try {
				const workshops = await fetchWorkshops();
				const trainers = await fetchTrainers();
				const filteredWorkshops = filterWorkshopsToAccepted(workshops, 1);
				const schedulerEvents = workshopDates(filteredWorkshops, trainers);
				setAllWorkshops(workshops);
				setAllTrainers(trainers);
				setFilteredWorkshops(filteredWorkshops);
				setData(schedulerEvents);
				console.log("scheduler events", data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
		fetchData();
		}, [])

	// Handlers
	const handleEventClicked = (workshopData) => {
		console.log('Appointment clicked:', workshopData);
	}

	return(
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Paper style={{ width: '80%', maxWidth: '1000px' }}>
				<Scheduler data={data}>
					<ViewState
						currentDate={currentDate}
						onCurrentDateChange={setCurrentDate}
						defaultCurrentViewName="Month"
					/>
					<DayView startDayHour={9} endDayHour={19} />
					<WeekView startDayHour={9} endDayHour={19} />
					<MonthView />
					<Toolbar />
					<DateNavigator />
					<TodayButton />
					<ViewSwitcher />
					<Appointments onClick={handleEventClicked}/>
					<AppointmentTooltip
						showCloseButton
						showOpenButton
						contentComponent={Content}
					/>
				</Scheduler>
			</Paper>
		</Box>
	)
}

export default CalendarView;