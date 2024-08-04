// SignIn.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignIn from '../src/components/SignIn';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SignIn Component', () => {
  test('renders SignIn component', () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    const titles = screen.getAllByText('Sign In');
    const title = titles.find((element) => element.variant="contained");
    expect(title).toBeInTheDocument();
  });

  test('has ID input field', () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    expect(screen.getByLabelText(/id/i)).toBeInTheDocument();
  });

  test('updates ID field value on change', () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    const idInput = screen.getByLabelText(/id/i);
    fireEvent.change(idInput, { target: { value: '123' } });
    expect(idInput.value).toBe('123');
  });

  test('toggle button changes loginType state', () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    const adminButton = screen.getByText(/admin/i);
    const trainerButton = screen.getByText(/trainer/i);
    const clientButton = screen.getByText(/client/i);

    // Initial state should be admin
    expect(adminButton).toHaveClass('Mui-selected');

    fireEvent.click(trainerButton);
    expect(trainerButton).toHaveClass('Mui-selected');
    expect(adminButton).not.toHaveClass('Mui-selected');

    fireEvent.click(clientButton);
    expect(clientButton).toHaveClass('Mui-selected');
    expect(trainerButton).not.toHaveClass('Mui-selected');
  });

  test('Link navigates with correct state', () => {
    // This test is more complex as it involves routing, so it would be better
    // to use a mock function to test routing behavior
    render(
      <Router>
        <SignIn />
      </Router>
    );

    const idInput = screen.getByLabelText(/id/i);
    fireEvent.change(idInput, { target: { value: '123' } });
    const titles = screen.getAllByText('Sign In');
    const title = titles.find((element) => element.variant="contained");
    
    //const signInButton = screen.getByText(/sign in/i);
    fireEvent.click(title);

    // Check if the link navigates correctly with expected state
    // Since Link is not navigated in the test environment, this is more conceptual
    // You might want to mock the navigation or check the correct URL using history
    // e.g., you could use `react-router`'s `MemoryRouter` and check the path
  });
});
