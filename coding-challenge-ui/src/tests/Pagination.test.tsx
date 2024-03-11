import Pagination from '../components/Pagination';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

test('viewing first page disables previous buttons', async () => {


  const page = 1

  const { getByTestId } = render(
    <table>
      <Pagination disablePreviousButtons={page === 1} disableNextButtons={false} setPage={jest.fn()} page={1} finalPageNo={10} />
    </table>
  );
  expect(getByTestId("button-first-page")).toBeDisabled()
  expect(getByTestId("button-previous-page")).toBeDisabled()
  expect(getByTestId("button-next-page")).toBeEnabled()
  expect(getByTestId("button-last-page")).toBeEnabled()
});

test('viewing last page disables next buttons', async () => {

  const page = 10
  const lastPage = 10
  const { getByTestId } = render(
    <table>
      <Pagination disablePreviousButtons={false} disableNextButtons={page === lastPage} setPage={jest.fn()} page={10} finalPageNo={10} />
    </table>
  );
  expect(getByTestId("button-first-page")).toBeEnabled()
  expect(getByTestId("button-previous-page")).toBeEnabled()
  expect(getByTestId("button-next-page")).toBeDisabled()
  expect(getByTestId("button-last-page")).toBeDisabled()
});

test('input changes and pagination buttons fires page state change', async () => {

  const mockSetPageFn = jest.fn()
  const { getByTestId, rerender } = render(
    <table>
      <Pagination disablePreviousButtons={false} disableNextButtons={false} setPage={mockSetPageFn} page={10} finalPageNo={10} />
    </table>
  );

  fireEvent.change(getByTestId('page-input'), { target: { value: '2' } })
  expect(mockSetPageFn).toBeCalledTimes(1)
  fireEvent.click(getByTestId('button-first-page'))
  expect(mockSetPageFn).toBeCalledTimes(2)
  fireEvent.click(getByTestId('button-previous-page'))
  expect(mockSetPageFn).toBeCalledTimes(3)
  fireEvent.click(getByTestId('button-next-page'))
  expect(mockSetPageFn).toBeCalledTimes(4)
  fireEvent.click(getByTestId('button-last-page'))
  expect(mockSetPageFn).toBeCalledTimes(5)

  rerender(   <table>
    <Pagination disablePreviousButtons={false} disableNextButtons={false} setPage={mockSetPageFn} page={200} finalPageNo={10} />
  </table>)
  fireEvent.change(getByTestId('page-input'), { target: { value: '201' } })
  expect(mockSetPageFn).toBeCalledTimes(6)

})