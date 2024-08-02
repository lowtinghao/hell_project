import { Link, useLocation } from 'react-router-dom';
import TrainerAvailability from '../components/TrainerAvailability';
import { ThemeProvider } from '../components/ThemeProvider';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';
import { useState } from 'react';

function App() {
	const location = useLocation();
	//console.log("Admin ID: " + id);
	return (
		<div>
			<h2>Assign Trainer</h2>
			<ThemeProvider>
				<TrainerAvailability/>
			</ThemeProvider>
			<button><Link to="/admin">Back</Link></button>
		</div>
	);
}
export default App;