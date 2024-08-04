import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AdminNavbar } from '../src/components/Admin_Navbar';
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

describe('AdminNavbar', () => {
    test('renders initial tabs', () => {
        render(
          <BrowserRouter>
              <ThemeProvider theme={theme}>
                  <AdminNavbar />
              </ThemeProvider>
          </BrowserRouter>
        );

        expect(screen.getByRole('button', { name: /Home/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Form/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Trainers/i })).toBeInTheDocument();
    });

    test('default selected tab is Home', async () => {
        render(
          <BrowserRouter>
              <ThemeProvider theme={theme}>
                  <AdminNavbar />
              </ThemeProvider>
          </BrowserRouter>
        );

        const homeTabs = screen.getAllByText('Home');
        const homeTab = homeTabs.find((element) => element.color = '#636363');
        expect(homeTab).toBeInTheDocument();
    });

    test('selects the Form tab when clicked', async () => {
        render(
          <BrowserRouter>
              <ThemeProvider theme={theme}>
                  <AdminNavbar />
              </ThemeProvider>
          </BrowserRouter>
        );

        const formTabs = await screen.getAllByText('Form');
        const formTab = formTabs.find((element) => element.color = '#636363');
        userEvent.click(formTab);
        expect(formTab).toBeInTheDocument();
    });

    test('selects the Trainers tab when clicked', async () => {
        render(
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <AdminNavbar />
            </ThemeProvider>
          </BrowserRouter>
        );

        // Wait for the state to be updated
        const trainersTabs = await screen.getAllByText('Trainers');
        const trainersTab = trainersTabs.find((element) => element.color = '#636363');
        userEvent.click(trainersTab);
        expect(trainersTab).toBeInTheDocument();
    });

    test('renders the Workshop Resource Portal component', () => {
        render(
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <AdminNavbar />
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
              <AdminNavbar />
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
            <AdminNavbar />
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