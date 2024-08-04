import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TrainerAvailability from '../src/components/TrainerAvailability';
//import { BrowserRouter} from 'react-router-dom';
//import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

describe('TrainerAvailability Component', () => {
  test('renders TrainerAvailability component', () => {
    render(
      <Router>
        <TrainerAvailability />
      </Router>
    );

    // Check if the initial rows are rendered
    expect(screen.getByText('Aaron')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Chris')).toBeInTheDocument();
    expect(screen.getByText('Damian')).toBeInTheDocument();
  });

  test('displays workshop details', () => {
    const workshop = {
      clientid: '123',
      clientname: 'ABC Corp',
      workname: 'React Workshop',
      worktype: 'Technical',
      fromDate: '2023-08-01T00:00:00.000Z'
    };

    render(
      <Router>
        <TrainerAvailability location={{ state: { workshop } }} />
      </Router>
    );

    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('ABC Corp')).toBeInTheDocument();
    expect(screen.getByText('React Workshop')).toBeInTheDocument();
    expect(screen.getByText('Technical')).toBeInTheDocument();
    expect(screen.getByText('8/1/2023')).toBeInTheDocument(); // Adjust date format as needed
  });

  test('filters trainers based on availability', () => {
    render(
      <Router>
        <TrainerAvailability />
      </Router>
    );

    // Select 'Available' filter
    fireEvent.change(screen.getByLabelText('Filter'), { target: { value: 'Available' } });

    // Check that only available trainers are shown
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Chris')).toBeInTheDocument();
    expect(screen.getByText('Damian')).toBeInTheDocument();
    expect(screen.queryByText('Aaron')).toBeNull();
  });

  test('assigns workshop to a trainer', () => {
    render(
      <Router>
        <TrainerAvailability />
      </Router>
    );

    // Click on 'Assign Workshop' button for the first available trainer
    fireEvent.click(screen.getAllByText('Assign Workshop')[0]);

    // Check that the trainer's availability is updated
    expect(screen.getAllByText('Assigned')[0]).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <TrainerAvailability />
      </Router>
    );
    
    expect(asFragment()).toMatchSnapshot();
  });

});
