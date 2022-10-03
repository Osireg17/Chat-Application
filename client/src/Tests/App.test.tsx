import React from 'react';
import { render, screen, configure } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';

test('ensures the h1 tag says register', () => {
  render(<App />);
  const h1 = screen.getByRole('heading', { name: /register/i });
  expect(h1).toBeInTheDocument();
  
});

test('renders username input', () => {
  render(<App />);
  const linkElement = screen.getByPlaceholderText(/Enter username/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders email input', () => {
  render(<App />);
  const linkElement = screen.getByPlaceholderText(/Enter email/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders password input', () => {
  render(<App />);
  const linkElement = screen.getByPlaceholderText(/Password/i);
  expect(linkElement).toBeInTheDocument();
} );

test('renders confirm password input', () => {
  render(<App />);
  const linkElement = screen.getByPlaceholderText(/Confirm Password/i);
  expect(linkElement).toBeInTheDocument();
} );

test('renders Register button', () => {
  render(<App />);
  const linkElement = screen.getByRole('button', {name: /Register/i});
  expect(linkElement).toBeInTheDocument();
} );

test('renders label for username', () => {
  render(<App />);
  const linkElement = screen.getByText(/Username/i);
  expect(linkElement).toBeInTheDocument();
});

// Run test to check if text appears in input fields when user types in them




