import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '../components/tab.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Custom theme
const theme = createTheme({
    palette: {
        custom: {
            accept: '#4caf50',
            reject: '#f44336',
        },
    },
});

describe('Navbar', () => {
    test('renders initial tabs', () => {
        render(
          <ThemeProvider theme={theme}>
            <Navbar />
          </ThemeProvider>
        );
    
        // Check if the initial tabs are rendered correctly
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Form')).toBeInTheDocument();
        expect(screen.getByText('Trainers')).toBeInTheDocument();
    });

    test('tab switching functionality', () => {
        // Simulate clicking the "Form" tab
        const formTab = screen.getByText('Form');
        fireEvent.click(formTab);
        // Verify "Form" tab content is displayed
        expect(screen.getByText('Form content')).toBeInTheDocument();
        // Simulate clicking the "Trainers" tab
        const trainersTab = screen.getByText('Trainers');
        fireEvent.click(trainersTab);
        // Verify "Trainers" tab content is displayed
        expect(screen.getByText('Trainers content')).toBeInTheDocument();
    });

    test('default selected tab', () => {
        // Verify "Home" tab is selected by default
        expect(screen.getByText('Home')).toHaveAttribute('aria-selected', 'true');
    });
});
