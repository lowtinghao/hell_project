import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Scheduler, WeekView, Appointments, Toolbar, DateNavigator, TodayButton, ViewSwitcher, MonthView,  DayView,} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

// TODO: Change this to an API to retrieve data from the database
async function fetchData(){
	return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { startDate: '2024-07-22T09:45', endDate: '2024-07-22T11:00', title: 'Workshop 1' },
        { startDate: '2024-07-23T12:00', endDate: '2024-07-23T13:30', title: 'Workshop 2' },
      ]);
    }, 1000);
  });
}

function CalendarView(){
	const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState([]);

	// Using useEffect() to fetch data when component mounts
	useEffect(() => {
		const loadData = async() => {
			const fetchedData = await fetchData();
			setData(fetchedData);
		};
		loadData();
	}, []);

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
					<Appointments />
				</Scheduler>
			</Paper>
		</Box>
	)
}

export default CalendarView;