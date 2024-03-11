import Header from '../components/Header';

import React from 'react';
import { render } from '@testing-library/react';

test('renders app header', async () => {
  const { getByText } = render(<Header user={null} />);
  const element = getByText("Analytics Dashboard");
  expect(element).toBeInTheDocument();
});

test('renders welcome guest', () => {
  const { getByText } = render(<Header user={null} />);
  const element = getByText("Welcome, Guest!");
  expect(element).toBeInTheDocument();
});


test('renders user name', async () => {
  const { getByText } = render(<Header user={{ "firstName": "Jane", "lastName": "Doe", "email": "janedoe@email.com", "id": 1 }} />);
  const element = getByText("Welcome, Jane!");
  expect(element).toBeInTheDocument();
})