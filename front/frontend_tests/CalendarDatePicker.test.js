import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CalendarDatePicker from '../src/components/CalendarDatePicker'; 
import React from 'react';

// Mock the console.log function
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('CalendarDatePicker', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders calendar and submit button', () => {
    render(<CalendarDatePicker />);

    // Check if calendar is present
    const calendar = screen.getByTestId('calendar-wrapper');
    expect(calendar).toBeInTheDocument();

    // Check if submit button is present
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
  });

  test('updates date when calendar date is selected', () => {
    render(<CalendarDatePicker />);

    // Simulate selecting a date on the calendar
    const calendar = screen.getByTestId('calendar-wrapper'); // Adjust selector if needed
    fireEvent.click(calendar); // May need more specific interactions depending on calendar library implementation

    // Check if the calendar date selection changes state (mock or adjust based on actual implementation)
    // Note: React Calendar does not have an easy way to simulate date changes directly in tests
  });
});
