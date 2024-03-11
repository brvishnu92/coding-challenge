import Button from '../components/PaginationButton';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

test('is enabled and clickable', async () => {

  const clickMockFn = jest.fn()
  const { getByTestId } = render(
      <Button data-testid='button-enabled' disabled={false} onClick={clickMockFn} label='Hi' />
  );
  expect(getByTestId("button-enabled")).toBeEnabled()
  expect(getByTestId("button-enabled")).toHaveTextContent('Hi')
  fireEvent.click(getByTestId("button-enabled"))
  expect(clickMockFn).toBeCalledTimes(1)
  
});
test('is disabled and not clickable', async () => {

  const clickMockFn = jest.fn()
  const { getByTestId } = render(
      <Button data-testid='button-disabled' disabled={true} onClick={clickMockFn} label='Hi' />
  );
  expect(getByTestId("button-disabled")).toBeDisabled()
  expect(getByTestId("button-disabled")).toHaveTextContent('Hi')
  fireEvent.click(getByTestId("button-disabled"))
  expect(clickMockFn).toBeCalledTimes(0)
});


test('default is enabled', async () => {

  const clickMockFn = jest.fn()
  const { getByTestId } = render(
      <Button data-testid='button-enabled' disabled={undefined} onClick={clickMockFn} label='Hi' />
  );
  expect(getByTestId("button-enabled")).toBeEnabled()
  fireEvent.click(getByTestId("button-enabled"))
  expect(clickMockFn).toBeCalledTimes(1)
  
});