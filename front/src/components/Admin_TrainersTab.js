import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';


function fetchTrainers(trainerId, trainerName){
    return { trainerId, trainerName};
}
