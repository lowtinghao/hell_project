import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StickyHeadTable from '../pages/adminhome.js';
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

describe('StickyHeadTable', () => {
    // Render the component before each test
    test('renders initial data', () => {
        render(
            <ThemeProvider theme={theme}>
                <StickyHeadTable />
            </ThemeProvider>
        );
        
        // Check if the initial data is rendered correctly
        expect(screen.getByText('Client 1')).toBeInTheDocument();
        expect(screen.getByText('Workshop 1')).toBeInTheDocument();
        expect(screen.getByText('Business')).toBeInTheDocument();
        expect(screen.getByText('New')).toBeInTheDocument();
    });

    test('accepts a workshop', () => {
        // Simulate clicking the "Accept" button
        const acceptButton = screen.getAllByText('Accept')[0];
        fireEvent.click(acceptButton);
        // Check if the status changes to "Assign Instructors"
        expect(screen.getByText('Assign Instructors')).toBeInTheDocument();
    });

    test('rejects a workshop', () => {
        // Simulate clicking the "Reject" button
        const rejectButton = screen.getAllByText('Reject')[0];
        fireEvent.click(rejectButton);
        // Check if the status changes to "Rejected"
        expect(screen.getByText('Rejected')).toBeInTheDocument();
    });

    test('filters workshops by "All"', () => {
        // Simulate changing the filter to "All"
        const filterSelect = screen.getByLabelText('Filter');
        fireEvent.change(filterSelect, { target: { value: 'All' } });
        // Check if all rows with status "New" are displayed
        expect(screen.getAllByText('New').length).toBe(4); // Initially all are "New"
    });

    test('filters workshops by "New"', () => {
        // Simulate changing the filter to "New"
        const filterSelect = screen.getByLabelText('Filter');
        fireEvent.change(filterSelect, { target: { value: 'New' } });
        // Check if all rows with status "New" are displayed
        expect(screen.getAllByText('New').length).toBe(4); // Initially all are "New"
    });

    test('filters workshops by "Assign Instructors"', () => {
        // First, accept a workshop to change its status
        const acceptButton = screen.getAllByText('Accept')[0];
        fireEvent.click(acceptButton);

        // Simulate changing the filter to "Assign Instructors"
        const filterSelect = screen.getByLabelText('Filter');
        fireEvent.change(filterSelect, { target: { value: 'Assign Instructors' } });
        // Check if the row with status "Assign Instructors" is displayed
        expect(screen.getAllByText('Assign Instructors').length).toBe(1);
    });

    test('filters workshops by "Rejected"', () => {
        // First, reject a workshop to change its status
        const rejectButton = screen.getAllByText('Reject')[0];
        fireEvent.click(rejectButton);

        // Simulate changing the filter to "Rejected"
        const filterSelect = screen.getByLabelText('Filter');
        fireEvent.change(filterSelect, { target: { value: 'Rejected' } });
        // Check if the row with status "Rejected" is displayed
        expect(screen.getAllByText('Rejected').length).toBe(1);
    });

    test('accept button changes status correctly', () => {
        // Simulate clicking the "Accept" button
        const acceptButton = screen.getAllByText('Accept')[0];
        fireEvent.click(acceptButton);
        // Verify the status change
        expect(screen.getAllByText('Assign Instructors').length).toBe(1);
    });

    test('reject button changes status correctly', () => {
        // Simulate clicking the "Reject" button
        const rejectButton = screen.getAllByText('Reject')[0];
        fireEvent.click(rejectButton);
        // Verify the status change
        expect(screen.getAllByText('Rejected').length).toBe(1);
    });

    test('filtering after accepting a workshop', () => {
        // Simulate clicking the "Accept" button
        const acceptButton = screen.getAllByText('Accept')[0];
        fireEvent.click(acceptButton);
        // Simulate changing the filter to "Assign Instructors"
        const filterSelect = screen.getByLabelText('Filter');
        fireEvent.change(filterSelect, { target: { value: 'Assign Instructors' } });
        // Verify the filtering
        expect(screen.getAllByText('Assign Instructors').length).toBe(1);
    });

    test('filtering after rejecting a workshop', () => {
        // Simulate clicking the "Reject" button
        const rejectButton = screen.getAllByText('Reject')[0];
        fireEvent.click(rejectButton);
        // Simulate changing the filter to "Rejected"
        const filterSelect = screen.getByLabelText('Filter');
        fireEvent.change(filterSelect, { target: { value: 'Rejected' } });
        // Verify the filtering
        expect(screen.getAllByText('Rejected').length).toBe(1);
    });

    test('displays no workshops when filter is not matched', () => {
        // Simulate changing the filter to "Assign Instructors" without accepting any workshop
        const filterSelect = screen.getByLabelText('Filter');
        fireEvent.change(filterSelect, { target: { value: 'Assign Instructors' } });
        // Verify no rows are displayed
        expect(screen.queryByText('Assign Instructors')).not.toBeInTheDocument();
    });
});

