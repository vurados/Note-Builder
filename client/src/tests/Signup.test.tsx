import { afterAll, beforeEach, describe, expect, test, vi} from 'vitest'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import  userEvent from '@testing-library/user-event'

import {Signup} from '../Pages/Signup';
import axios from 'axios';

// Mock the axios library to prevent actual API calls during testing
vi.mock('axios');

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
   ...vi.importActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));


describe('Signup Component', () => {

    test('renders Signup component', async () => {
        render(<Signup />);
        
        await waitFor(async () => {
            expect(await screen.getByLabelText('Username')).toBeInTheDocument()
            expect(await screen.getByLabelText('Email')).toBeInTheDocument();
            expect(await screen.getByLabelText('Password')).toBeInTheDocument();
            expect(await screen.getByRole('signup-button')).toBeInTheDocument();
        })
    });

    test('handles form submission', async () => {
        render(<Signup />);

        // Mock an API response for a successful signup
        vi.spyOn(axios, 'post').mockResolvedValueOnce({
            data: { success: true, msg: 'User created successfully', user:{id: 1} }
        });
        

        await waitFor(async () => {
            fireEvent.change(await screen.getByLabelText('Username'), { target: { value: 'testUser' } });
            fireEvent.change(await screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
            fireEvent.change(await screen.getByLabelText('Password'), { target: { value: 'testPassword' } });
            fireEvent.click(screen.getByRole('signup-button'));
        })
        // Wait for the async operation (API call) to complete
        await waitFor(async () => {
            await expect( await mockedUsedNavigate).toHaveBeenCalled();
        });
    });

    // test('error handling form submission', async () => {
    //     render(<Signup />);

    //     // Mock an API response for a successful signup
    //     vi.spyOn(axios, 'post').mockResolvedValueOnce({
    //         json: async () => ({ success: false, msg: 'Error occureed' }),
    //     } as Response);

    //     await waitFor(async () => {
    //         fireEvent.change(await screen.getByLabelText('Username'), { target: { value: 'te' } });
    //         fireEvent.change(await screen.getByLabelText('Email'), { target: { value: 'test@example' } });
    //         fireEvent.change(await screen.getByLabelText('Password'), { target: { value: 'te' } });
    //         // fireEvent.click(screen.getByRole('signup-button'));
    //     })
    //     await waitFor(async () => {
    //         expect(await screen.getByText('username must', {exact: false})).toBeInTheDocument()
    //         expect(await screen.getByText('email', {exact: false})).toBeInTheDocument();
    //         expect(await screen.getByText('password', {exact: false})).toBeInTheDocument();
    //         await fireEvent.click(screen.getByRole('signup-button'));
    //         expect(await screen.getByText(/Username already exist/)).toBeInTheDocument();
    //     })
    //     // Wait for the async operation (API call) to complete
    //     waitFor(async () => {
    //         expect(await mockedUsedNavigate).not.toHaveBeenCalled();
    //     });
    // });

});