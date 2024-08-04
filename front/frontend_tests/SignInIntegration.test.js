// SignInIntegration.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SignIn from '../src/components/SignIn';
import App from '../src/pages/Login.js';

test('client logs in and is redirected to the client page', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/client" element={<App />} />
      </Routes>
    </MemoryRouter>
  );

  // Set login type to "client" and enter ID
  fireEvent.click(screen.getByText('Client'));
  fireEvent.change(screen.getByLabelText(/ID/i), { target: { value: '1' } });

  // Click Sign In button using data-testid
  fireEvent.click(screen.getByTestId('sign-in-button'));

  // Assert that the client is redirected to the client page
  await waitFor(() => expect(screen.getByText('Client')).toBeInTheDocument());
});

test('trainer logs in and is redirected to the trainer home page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/trainer" element={<App />} />
        </Routes>
      </MemoryRouter>
    );
  
    // Set login type to "client" and enter ID
    fireEvent.click(screen.getByText('Trainer'));
    fireEvent.change(screen.getByLabelText(/ID/i), { target: { value: '1' } });
  
    // Click Sign In button using data-testid
    fireEvent.click(screen.getByTestId('sign-in-button'));
  
    // Assert that the client is redirected to the client page
    await waitFor(() => expect(screen.getByText('Trainer')).toBeInTheDocument());
  });

  test('trainer logs in and is redirected to the trainer home page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/admin" element={<App />} />
        </Routes>
      </MemoryRouter>
    );
  
    // Set login type to "client" and enter ID
    fireEvent.click(screen.getByText('Admin'));
    fireEvent.change(screen.getByLabelText(/ID/i), { target: { value: '1' } });
  
    // Click Sign In button using data-testid
    fireEvent.click(screen.getByTestId('sign-in-button'));
  
    // Assert that the client is redirected to the client page
    await waitFor(() => expect(screen.getByText('Admin')).toBeInTheDocument());
  });
