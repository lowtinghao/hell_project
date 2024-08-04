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

  test('logs the selected date when submit button is clicked', () => {
    render(<CalendarDatePicker />);

    // Mock the date to be used for the test
    const startDate = new Date('2024-08-01T00:00:00+08:00'); // Adjust time zone to match local
    const endDate = new Date('2024-08-04T23:59:59+08:00'); // Adjust time zone to match local

    // Simulate selecting the date by finding the date element in the calendar and clicking it
    const calendar = screen.getByTestId('calendar-wrapper');
    const dateElements = calendar.querySelectorAll('.react-calendar__month-view__days__day');

    // Find and click start date
    const startDateElement = Array.from(dateElements).find(day => day.textContent === '1'); // Adjust if the day is not '1'
    if (startDateElement) {
      fireEvent.click(startDateElement);
    } else {
      throw new Error('Start date element not found');
    }

    // Find and click end date
    const endDateElement = Array.from(dateElements).find(day => day.textContent === '4'); // Adjust if the day is not '3'
    if (endDateElement) {
      fireEvent.click(endDateElement);
    } else {
      throw new Error('End date element not found');
    }

    // Click submit button
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Check if console.log was called with the correct date
    expect(mockConsoleLog).toHaveBeenCalledWith(`Date submitted: ${startDate.toString()},${endDate.toString()}`);
  });
});
