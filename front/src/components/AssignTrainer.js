import { Link, useLocation } from 'react-router-dom';
import TrainerAvailability from './TrainerAvailability';
import { ThemeProvider } from './ThemeProvider';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';


function App() {
	return (
		<div>
			<h2>Assign Trainer</h2>
			<ThemeProvider>
				<TrainerAvailability/>
			</ThemeProvider>
			<button></button>
		</div>
	);
}
export default App;