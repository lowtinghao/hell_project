import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WorkshopRequestTable from '../src/components/WorkshopRequestTable';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { client_id: '0', companyName: 'Client 1', clientType: 'Business', dates: ['2023-01-01', '2023-01-02'], status: 0, workshopId: '1' },
        { client_id: '1', companyName: 'Client 2', clientType: 'Technology', dates: ['2023-02-01', '2023-02-02'], status: 1, workshopId: '2' },
        { client_id: '2', companyName: 'Client 3', clientType: 'Design', dates: ['2023-03-01', '2023-03-02'], status: 2, workshopId: '3' },
      ]),
    })
  );

// Mocking useTheme
jest.mock('@mui/material/styles', () => ({
    ...jest.requireActual('@mui/material/styles'),
    useTheme: () => ({
      palette: {
        custom: {
          accept: 'green',
          reject: 'red'
        },
        getContrastText: () => 'white'
      }
    })
  }));

describe('WorkshopRequestTable Component', () => {
    test('renders WorkshopRequestTable component', async () => {
        render(
            <Router>
                <WorkshopRequestTable />
            </Router>
        );

        expect(screen.getByTestId('table-title')).toBeInTheDocument();
        expect(screen.getByTestId('filter-label')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByTestId('client-id-1')).toBeInTheDocument();
            expect(screen.getByTestId('client-name-1')).toBeInTheDocument();
            expect(screen.getByTestId('client-name-2')).toBeInTheDocument();
            expect(screen.getByTestId('client-name-3')).toBeInTheDocument();
        });
    });

    test('filters workshops dropdown works correctly', async () => {
        render(
            <Router>
                <WorkshopRequestTable />
            </Router>
        );
    
        await waitFor(() => {
            expect(screen.getByTestId('client-name-1')).toBeInTheDocument();
            expect(screen.getByTestId('client-name-2')).toBeInTheDocument();
            expect(screen.getByTestId('client-name-3')).toBeInTheDocument();
        });
        // Simulate click for custom dropdown
        const filterDropdown = screen.getByTestId('ArrowDropDownIcon');
        fireEvent.click(filterDropdown);
        });
        
    });

    test('accepts workshop', async () => {
        render(
            <Router>
                <WorkshopRequestTable />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByTestId('client-name-1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('accept-button-1'));
    
    });

    test('rejects workshop', async () => {
        render(
            <Router>
                <WorkshopRequestTable />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByTestId('client-name-1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('reject-button-1'));

    });

    test('navigates to Assign Trainer page', async () => {
        render(
            <Router>
                <WorkshopRequestTable />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByTestId('client-name-2')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('assign-trainer-button-2'));
    });