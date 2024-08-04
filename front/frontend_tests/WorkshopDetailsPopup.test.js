import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WorkshopDetailsPopup from '../src/components/WorkshopDetailsPopup';

const mockWorkshop = {
  id: '123',
  name: 'React Workshop',
  client: 'Client A',
  venue: 'Online',
  startDate: '2023-08-01T18:00:00.000Z',
  endDate: '2023-08-01T20:00:00.000Z',
  details: { instructor: 'John Doe', duration: '2 hours' },
  participants: ['Alice', 'Bob'],
};

describe('WorkshopDetailsPopup', () => {
  test('renders correctly when open', () => {
    render(<WorkshopDetailsPopup open={true} handleClose={jest.fn()} workshop={mockWorkshop} />);
    expect(screen.getByTestId('workshop-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('workshop-dialog-title')).toHaveTextContent('Workshop Details');
  });

  test('displays workshop details', () => {
    render(<WorkshopDetailsPopup open={true} handleClose={jest.fn()} workshop={mockWorkshop} />);
    expect(screen.getByTestId('workshop-row-id')).toHaveTextContent('123');
    expect(screen.getByTestId('workshop-row-name')).toHaveTextContent('React Workshop');
    expect(screen.getByTestId('workshop-row-client')).toHaveTextContent('Client A');
    expect(screen.getByTestId('workshop-row-venue')).toHaveTextContent('Online');
    expect(screen.getByTestId('workshop-row-startDate')).toHaveTextContent(new Date(mockWorkshop.startDate).toLocaleString());
    expect(screen.getByTestId('workshop-row-endDate')).toHaveTextContent(new Date(mockWorkshop.endDate).toLocaleString());
    expect(screen.getByTestId('workshop-row-details')).toHaveTextContent('instructorJohn Doeduration2 hours');
    expect(screen.getByTestId('workshop-row-participants')).toHaveTextContent('Alice');
    expect(screen.getByTestId('workshop-row-participants')).toHaveTextContent('Bob');
  });

  test('calls handleClose when the close button is clicked', () => {
    const handleClose = jest.fn();
    render(<WorkshopDetailsPopup open={true} handleClose={handleClose} workshop={mockWorkshop} />);
    fireEvent.click(screen.getByTestId('close-button'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not render dialog when open is false', () => {
    render(<WorkshopDetailsPopup open={false} handleClose={jest.fn()} workshop={mockWorkshop} />);
    expect(screen.queryByTestId('workshop-dialog')).not.toBeInTheDocument();
  });
});
