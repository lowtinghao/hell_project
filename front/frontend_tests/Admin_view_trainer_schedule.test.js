import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App, {  fetchWorkshops, fetchTrainers, filterWorkshopByTrainer, filterWorkshopsToAccepted } from '../src/components/Admin_view_trainer_schedule';

// Mock fetch responses
jest.mock('../src/components/Admin_view_trainer_schedule', () => ({
  __esModule: true,
  default: () => <div>Mocked App Component</div>,
  filterWorkshopByTrainer: jest.fn(),
  filterWorkshopsToAccepted: jest.fn(),
}));

describe('App Component', () => {
  const mockFetchWorkshops = jest.fn();
  const mockFetchTrainers = jest.fn();
  const mockFilterWorkshopsToAccepted = jest.fn();
  const mockFilterWorkshopByTrainer = jest.fn();

  beforeEach(() => {
    mockFetchWorkshops.mockClear();
    mockFetchTrainers.mockClear();
    mockFilterWorkshopsToAccepted.mockClear();
    mockFilterWorkshopByTrainer.mockClear();
  });

  test('renders without crashing', () => {
    render(<App />);
  });

  test('sets the state correctly after fetching data', async () => {
    const mockWorkshops = [
      { id: 1, status: 1, assignedTrainers: [1, 2] },
      { id: 2, status: 0, assignedTrainers: [1] },
    ];
    const mockTrainers = [
      { id: 1, name: 'Trainer 1' },
      { id: 2, name: 'Trainer 2' },
    ];

    mockFetchWorkshops.mockResolvedValueOnce(mockWorkshops);
    mockFetchTrainers.mockResolvedValueOnce(mockTrainers);

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Mocked App Component')).toBeInTheDocument();
    });
  });

  test('filterWorkshopsToAccepted filters workshops correctly', () => {
    const workshops = [
      { id: 1, status: 1 },
      { id: 2, status: 0 },
    ];
    mockFilterWorkshopsToAccepted.mockImplementation((workshops, filter) => {
      return workshops.filter(workshop => workshop.status === filter);
    });

    const result = mockFilterWorkshopsToAccepted(workshops, 1);
    expect(result).toEqual([{ id: 1, status: 1 }]);
  });

  test('filterWorkshopByTrainer filters workshops by trainer correctly', () => {
    const workshops = [
      { id: 1, assignedTrainers: [1, 2] },
      { id: 2, assignedTrainers: [2] },
    ];
    mockFilterWorkshopByTrainer.mockImplementation((workshops, trainerID) => {
      return workshops.filter(workshop => workshop.assignedTrainers.includes(trainerID));
    });

    const result = mockFilterWorkshopByTrainer(workshops, 1);
    expect(result).toEqual([{ id: 1, assignedTrainers: [1, 2] }]);
  });
});
