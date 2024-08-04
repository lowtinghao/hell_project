import React from 'react';
import { render, screen } from '@testing-library/react';
import CalendarView from '../src/components/CalendarView';

// Mock @devexpress/dx-react-scheduler-material-ui
jest.mock('@devexpress/dx-react-scheduler-material-ui', () => ({
    Scheduler: ({ children }) => <div>{children}</div>,
    WeekView: () => <div>WeekView</div>,
    Appointments: () => <div>Appointments</div>,
    Toolbar: () => <div>Toolbar</div>,
    DateNavigator: () => <div>DateNavigator</div>,
    TodayButton: () => <div>Today</div>,
    ViewSwitcher: () => <div>ViewSwitcher</div>,
    MonthView: () => <div>MonthView</div>,
    DayView: () => <div>DayView</div>
}));

// Mock @devexpress/dx-react-scheduler
jest.mock('@devexpress/dx-react-scheduler', () => ({
    ViewState: () => <div>ViewState</div>
}));

describe('CalendarView', () => {
    test('renders CalendarView component', () => {
        render(<CalendarView />);
        
        // Check if the component renders expected text/content
        expect(screen.getByText('Today')).toBeInTheDocument();
        expect(screen.getByText('WeekView')).toBeInTheDocument();
        expect(screen.getByText('Appointments')).toBeInTheDocument();
        expect(screen.getByText('Toolbar')).toBeInTheDocument();
        expect(screen.getByText('DateNavigator')).toBeInTheDocument();
        expect(screen.getByText('ViewSwitcher')).toBeInTheDocument();
        expect(screen.getByText('MonthView')).toBeInTheDocument();
        expect(screen.getByText('DayView')).toBeInTheDocument();
    });


  // test('displays the current date and available views', async () => {
  //   render(<CalendarView />);

  //   screen.debug();

  //   // Check if the Today button is present
  //   const todayButton = screen.queryByRole('button', { name: /today/i });
  //   expect(todayButton).toBeInTheDocument();
    
  //   // Check other buttons
  //   const monthButton = screen.queryByRole('button', { name: /month/i });
  //   expect(monthButton).toBeInTheDocument();
  //   const weekButton = screen.queryByRole('button', { name: /week/i });
  //   expect(weekButton).toBeInTheDocument();
  //   const dayButton = screen.queryByRole('button', { name: /day/i });
  //   expect(dayButton).toBeInTheDocument();
  // });
});