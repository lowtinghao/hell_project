import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '../src/components/tab';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        custom: {
            accept: '#4caf50',
            reject: '#f44336',
        },
    },
});

afterEach(cleanup);

describe('Navbar', () => {
    test('renders initial tabs', () => {
        render(
          <ThemeProvider theme={theme}>
            <Navbar />
          </ThemeProvider>
        );
    
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Form')).toBeInTheDocument();
        expect(screen.getByText('Trainers')).toBeInTheDocument();
    });

    test('default selected tab is Home', async () => {
        render(
          <ThemeProvider theme={theme}>
            <Navbar />
          </ThemeProvider>
        );

        // Wait for the state to be updated
        const homeTab = await screen.findByRole('tab', { name: /Home/i });
        expect(homeTab).toHaveAttribute('aria-selected');
    });

    test('selects the Form tab when clicked', async () => {
        render(
          <ThemeProvider theme={theme}>
            <Navbar />
          </ThemeProvider>
        );

        const formTab = await screen.findByRole('tab', { name: /Form/i });
        fireEvent.click(formTab);
        expect(formTab).toHaveAttribute('aria-selected', 'true');
    });

    test('selects the Trainers tab when clicked', async () => {
      render(
        <ThemeProvider theme={theme}>
          <Navbar />
        </ThemeProvider>
      );

      const trainerTab = await screen.findByRole('tab', { name: /Trainers/i });
      fireEvent.click(trainerTab);
      expect(trainerTab).toHaveAttribute('aria-selected', 'true');
  });
});

