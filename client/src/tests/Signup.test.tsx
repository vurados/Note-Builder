import { describe, expect, test, vi} from 'vitest'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import {Signup} from '../Pages/Signup';

// Mock the axios library to prevent actual API calls during testing
vi.mock('axios');

describe('Signup Component', () => {
  test('renders Signup component', () => {
    render(<Signup />);

    
    const usernameInput = screen.getAllByPlaceholderText('Username')
    const emailInput = screen.getAllByPlaceholderText('Email');
    const passwordInput = screen.getAllByPlaceholderText('Password');
    const signupButton = screen.getByText('Signup');

    expect(usernameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    render(<Signup />);

    const usernameInput = screen.getAllByPlaceholderText('Username')
    const emailInput = screen.getAllByPlaceholderText('Email');
    const passwordInput = screen.getAllByPlaceholderText('Password');
    const signupButton = screen.getByText('Signup');

    // Mock an API response for a successful signup
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
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