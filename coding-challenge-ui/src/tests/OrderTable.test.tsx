import OrderTable from '../components/OrderTable';
import React from 'react';
import { fireEvent, getByText, render } from '@testing-library/react';
import { orderData } from './mockData';

test('renders order data with daysOverdue in descending order by default', async () => {
  const { getByTestId } = render(<OrderTable orders={orderData} handleSort={jest.fn()} loading={false} setPage={jest.fn()} page={1} finalPageNo={10} />);
  expect(getByTestId("shopName-0-1")).toHaveTextContent('Snack Co.')

  const firstRowOverdueValue = parseInt(getByTestId("daysOverdue-0-6").textContent as string)
  const secondRowOverdueValue = parseInt(getByTestId("daysOverdue-1-6").textContent as string)
  expect(firstRowOverdueValue).toBeGreaterThan(secondRowOverdueValue)
});

test('sort button click triggers sort function call', async () => {
  const mockSortFn = jest.fn()
  const { getByTestId } = render(<OrderTable orders={orderData} handleSort={mockSortFn} loading={false} setPage={jest.fn()} page={1} finalPageNo={10} />);
  fireEvent.click(getByTestId("sort-Store"))
  expect(mockSortFn).toBeCalledTimes(1)
});

test('no orders show no record text', async () => {
  const mockSortFn = jest.fn()
  const { getByText } = render(<OrderTable orders={[]} handleSort={mockSortFn} loading={false} setPage={jest.fn()} page={1} finalPageNo={10} />);

  expect(getByText("No Records")).toBeInTheDocument()
});

test('loading state renders loading text', async () => {
  const mockSortFn = jest.fn()
  const { getByText } = render(<OrderTable orders={[]} handleSort={mockSortFn} loading={true} setPage={jest.fn()} page={1} finalPageNo={10} />);

  expect(getByText("Loading...")).toBeInTheDocument()
});