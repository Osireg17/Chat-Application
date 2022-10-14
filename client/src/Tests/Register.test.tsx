import React from 'react';
import { render, screen, configure } from '@testing-library/react';
import '@testing-library/jest-dom'
import Register from '../Components/Register';

test('ensures the h1 tag says register', () => {
  render(<Register/>);
  const h1 = screen.getByRole('heading', { name: /register/i });
  expect(h1).toBeInTheDocument();
  
});

test('renders username input', () => {
  render(<Register/>);
  const linkElement = screen.getByPlaceholderText(/Enter username/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders email input', () => {
  render(<Register/>);
  const linkElement = screen.getByPlaceholderText(/Enter email/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders password input', () => {
  render(<Register/>);
  const linkElement = screen.getByPlaceholderText(/Password/i);
  expect(linkElement).toBeInTheDocument();
} );

test('renders confirm password input', () => {
  render(<Register/>);
  const linkElement = screen.getByPlaceholderText(/Confirm Password/i);
  expect(linkElement).toBeInTheDocument();
} );

test('renders Register button', () => {
  render(<Register/>);
  const linkElement = screen.getByRole('button', {name: /Register/i});
  expect(linkElement).toBeInTheDocument();
} );

test('renders label for username', () => {
  render(<Register/>);
  const linkElement = screen.getByText(/Username/i);
  expect(linkElement).toBeInTheDocument();
});

// Test that the register button is disabled when the form is empty
test('register button is disabled when form is empty', () => {
  render(<Register/>);
  const button = screen.getByRole('button', {name: /Register/i});
  expect(button).toBeDisabled();
});

// Test all the form labels to see if error messages appear when the form is empty
test('username error message appears when form is empty', () => {
  render(<Register/>);
  const button = screen.getByRole('button', {name: /Register/i});
  button.click();
  const error = screen.getByText(/Username is required/i);
  expect(error).toBeInTheDocument();
});

test('email error message appears when form is empty', () => {
  render(<Register/>);
  const button = screen.getByRole('button', {name: /Register/i});
  button.click();
  const error = screen.getByText(/Email is required/i);
  expect(error).toBeInTheDocument();
});

test('password error message appears when form is empty', () => {
  render(<Register/>);
  const button = screen.getByRole('button', {name: /Register/i});
  button.click();
  const error = screen.getByText(/Password is required/i);
  expect(error).toBeInTheDocument();
});

test('confirm password error message appears when form is empty', () => {
  render(<Register/>);
  const button = screen.getByRole('button', {name: /Register/i});
  button.click();
  const error = screen.getByText(/Confirm password is required/i);
  expect(error).toBeInTheDocument();
});

test('there is a link to login', () => {
  render(<Register/>);
  const linkElement = screen.getByRole('link', {name: /Login/i});
  expect(linkElement).toBeInTheDocument();
} );


