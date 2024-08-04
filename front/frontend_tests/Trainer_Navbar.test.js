import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TrainerNavbar } from '../src/components/Trainer_Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
    palette: {
        custom: {
            accept: '#4caf50',
            reject: '#f44336',
        },
    },
});

afterEach(cleanup);

describe('TrainerNavbar', () => {
    test('renders initial tab', () => {
        render(
          <BrowserRouter>
              <ThemeProvider theme={theme}>
                  <TrainerNavbar />
              </ThemeProvider>
          </BrowserRouter>
        );

        expect(screen.getByTestId('view workshops-button')).toBeInTheDocument();
    });

    test('renders the Workshop Resource Portal component', () => {
        render(
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <TrainerNavbar />
            </ThemeProvider>
          </BrowserRouter>
        );
        const titleElements = screen.getAllByText('Workshop Resource Portal');
        const title = titleElements.find((element) => element.color = '#0672cb');
        expect(title).toBeInTheDocument();
  
        const logo = screen.getAllByAltText('Dell Technologies Logo');
        const logo1 =logo.find((element) => element.backgroundColor = 'red');
        expect(logo1).toBeInTheDocument();
    });

    test('renders avatar icon, open settings appears when hover over avatar icon', async () => {
        render(
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <TrainerNavbar />
            </ThemeProvider>
          </BrowserRouter>
        );
        const logo2 = screen.getByAltText('Remy Sharp');
        expect(logo2).toBeInTheDocument();
        // Hover over the avatar to display the tooltip
        userEvent.hover(logo2);

        // Verify if the tooltip text "Open settings" is displayed
        const tooltip = await screen.findByText('Open settings');
        expect(tooltip).toBeInTheDocument();
    });
    test('settings items appear when clicking on avatar', async () => {
      render(
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <TrainerNavbar />
          </ThemeProvider>
        </BrowserRouter>
      );

      const logo3 = screen.getByAltText('Remy Sharp');

      // Click on the avatar to open the settings menu
      userEvent.click(logo3);

      // Check if the settings items are displayed
      const accountSetting = await screen.findByText('Account');
      const logoutSetting = await screen.findByText('Logout');
      expect(accountSetting).toBeInTheDocument();
      expect(logoutSetting).toBeInTheDocument();
  });
});