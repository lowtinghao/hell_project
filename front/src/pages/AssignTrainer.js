import { Link, useLocation, useNavigate } from 'react-router-dom';
import TrainerAvailability from '../components/TrainerAvailability';
import { ThemeProvider } from '../components/ThemeProvider';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

function App() {	
	//console.log("Admin ID: " + id);
	return (
		<div>
			<h2>Assign Trainer</h2>
			<Button><Link to="/admin">Back</Link></Button>
			<ThemeProvider>
				<TrainerAvailability/>
			</ThemeProvider>
		</div>
	);
}
export default App;