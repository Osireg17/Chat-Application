import React from 'react';
import { render, screen, configure } from '@testing-library/react';
import '@testing-library/jest-dom'
import Login from '../Components/Login';

test('ensures the h1 tag says login', () => {
    render(<Login/>);
    const h1 = screen.getByRole('heading', { name: /login/i });
    expect(h1).toBeInTheDocument();
    
    });

test('renders username input', () => {
    render(<Login/>);
    const linkElement = screen.getByPlaceholderText(/Enter username/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders password input', () => {
    render(<Login/>);
    const linkElement = screen.getByPlaceholderText(/Password/i);
    expect(linkElement).toBeInTheDocument();
} );

test('renders Login button', () => {
    render(<Login/>);
    const linkElement = screen.getByRole('button', {name: /Login/i});
    expect(linkElement).toBeInTheDocument();
} );

test('link there is a link to register', () => {
    render(<Login/>);
    const linkElement = screen.getByRole('link', {name: /Register/i});
    expect(linkElement).toBeInTheDocument();
} );

