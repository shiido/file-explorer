import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';

test('check if you have text in the index page', () => {
  render(<App />);
  expect(screen.getByText(/file explorer/i)).toBeInTheDocument();
});

test('check if the add-new-directory button exists', () => {
  render(<App />);
  const buttonEl = screen.getByRole('new-directory-button');
  expect(buttonEl).toBeInTheDocument();
});

test('check if add-new-directory button open the modal', () => {
  render(<App />);
  const buttonEl = screen.getByRole('new-directory-button');
  fireEvent.click(buttonEl);
  expect(screen.getByText(/Monitoring new directory/g)).toBeInTheDocument();
});

test('check if modal has components (buttons, inputs)', () => {
  render(<App />);
  const buttonNewDirectoryEl = screen.getByRole('new-directory-button');
  fireEvent.click(buttonNewDirectoryEl);

  const inputEl = screen.getByRole('new-directory-input');
  expect(inputEl).toBeInTheDocument();
  expect(inputEl).toHaveAttribute('placeholder', 'Enter the directory for example /home/user/Documents');

  const buttonCancelEl = screen.getByRole('cancel-modal-button');
  expect(buttonCancelEl).toBeInTheDocument();

  const buttonAcceptEl = screen.getByRole('accept-modal-button');
  expect(buttonAcceptEl).toBeInTheDocument();
});

test('check if new-directory input works', () => {
  render(<App />);
  const buttonNewDirectoryEl = screen.getByRole('new-directory-button');
  fireEvent.click(buttonNewDirectoryEl);

  const inputEl = screen.getByRole('new-directory-input');
  fireEvent.change(inputEl, { target: { value: '/home' } });

  expect(inputEl).toHaveValue('/home');
});