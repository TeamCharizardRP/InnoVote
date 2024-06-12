import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { LoginPage } from '../src/features/auth/LoginPage'; // whatever path 
import { SignupPage } from '../src/features/auth/SignupPage'; // whatever path 

describe('LoginPage component', () => {
  it('should render LoginPage', () => {
    render(<LoginPage />);
    // check rendering of components
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Log in')

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  })
})

describe('SignupPage component', () => {
  it('should render SignupPage', () => {
    render(<SignupPage />);
    // check rendering of components
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign up')

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  })
})
