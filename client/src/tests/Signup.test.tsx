import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signup from './Signup';

// Mock the axios library to prevent actual API calls during testing
jest.mock('axios');

describe('Signup Component', () => {
  test('renders Signup component', () => {
    render(<Signup />);
    const usernameInput = screen.getByPlaceholderText(/Vlados/i);
    const emailInput = screen.getByPlaceholderText(/tigidik@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const signupButton = screen.getByText(/Signup/i);

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    render(<Signup />);
    const usernameInput = screen.getByPlaceholderText(/Vlados/i);
    const emailInput = screen.getByPlaceholderText(/tigidik@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const signupButton = screen.getByText(/Signup/i);

    // Mock an API response for a successful signup
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ success: true, msg: 'User created successfully' }),
    } as Response);

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(signupButton);

    // Wait for the async operation (API call) to complete
    await waitFor(() => {
      expect(screen.queryByText(/User created successfully/i)).toBeInTheDocument();
    });
  });
});