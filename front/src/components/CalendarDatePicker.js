import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarDatePicker = ({value, onChange, onDateSubmit}) => {
    const [dateValue, setDateValue] = useState(value);
    const [selectedDates, setSelectedDates] = useState(value);
  
    const handleDateChange = (date) => {
        setDateValue(date);
        setSelectedDates(date);
        onChange(date);
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
    };
  
    // TODO: Add POST request from backend
    const handleInternalSubmit = () => {
        onDateSubmit(selectedDates);
    };
  
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div data-testid="calendar-wrapper">
                <Calendar onChange={handleDateChange} value={dateValue} selectRange={true} />
                {selectedDates && (
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Selected Dates: {Array.isArray(selectedDates) 
                        ? `${formatDate(selectedDates[0])} - ${formatDate(selectedDates[1])}` 
                        : formatDate(selectedDates)}
                </Typography>
                )}
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
                <button onClick={handleInternalSubmit} data-testid='submit-button'>Save dates</button>
            </Box>
        </Box>
    );
  };
  

export default CalendarDatePicker;
