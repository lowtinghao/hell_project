import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
    const [value, setValue] = useState(new Date());
  
    const handleDateChange = (date) => {
      setValue(date);
    };
  
    // TODO: Implement backend code
    const handleSubmit = async () => {
        console.log('Date submitted: ' + value)

    };
  
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <Calendar onChange={handleDateChange} value={value} selectRange={true}/>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
                <button onClick={handleSubmit}>Submit</button>
            </Box>
        </Box>
    );
  };
  

export {CalendarView};