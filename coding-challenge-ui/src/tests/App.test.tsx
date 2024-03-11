import App from "../App";
import React from "react";
import { act, fireEvent, getByText, render, waitFor } from "@testing-library/react";
import { orderData } from "./mockData";


const mockedFetchFnSuccessResp = () => jest.fn((url) => {
  if (url === "http://localhost:8080/user") {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({
        firstName: "Jane",
        lastName: "Doe",
        email: "",
        id: 1,
      }),
    }) as Promise<Response>;
  } else {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({ orders: orderData, finalPageIndex: 1 }),
    }) as Promise<Response>;
  }
});

test("renders user name and table heading", async () => {
  await act(async () => {
    const originalFetch = global.fetch;
    global.fetch = mockedFetchFnSuccessResp()


    const { getByText } = render(<App />);

    await waitFor(() => {
      const headingElement = getByText("Overdue Orders");
      expect(headingElement).toBeInTheDocument();
      const element = getByText("Welcome, Jane!");
      expect(element).toBeInTheDocument();
    })

    global.fetch = originalFetch;
  });
});


test("renders users orders and sorting icon triggers api call", async () => {
  await act(async () => {
    const originalFetch = global.fetch;
    global.fetch = mockedFetchFnSuccessResp()

    const { getByTestId } = render(<App />);

    await waitFor(() => {
      const element = getByTestId("shopName-0-1");
      expect(element).toContainHTML('Snack Co.')
      fireEvent.click(getByTestId("sort-Days Overdue"))
      expect(global.fetch).toBeCalledTimes(2)
      fireEvent.click(getByTestId("sort-Days Overdue"))
      expect(global.fetch).toBeCalledTimes(3)
    })

    await waitFor(() => {
      fireEvent.click(getByTestId("sort-Store"))
      expect(global.fetch).toBeCalledTimes(4)
    })
    global.fetch = originalFetch;

  });
});



const mockedFetchFnFailedResp = () => jest.fn(() => {
  return Promise.resolve({
    ok: true,
    status: 400,
    json: async () => ({
      message: 'Error occured.'
    }),
  }) as Promise<Response>;
});

test("error thrown by user api", async () => {
  await act(async () => {
    const originalFetch = global.fetch;
    global.fetch = mockedFetchFnFailedResp()

    const { getByText } = render(<App />);

    await waitFor(() => {
      const element = getByText("Error occured.");
      expect(element).toBeInTheDocument()
    })

    global.fetch = originalFetch;
  });
});


const mockNetworkErrorFetchFn = () => jest.fn(() => {
  return Promise.reject({
    status: 500,
    message: 'Network failed.'
  }) as Promise<Response>;
});


test("network error thrown by user api", async () => {
  await act(async () => {
    const originalFetch = global.fetch;
    global.fetch = mockNetworkErrorFetchFn()

    const { getByText } = render(<App />);

    await waitFor(() => {
      const element = getByText("Network failed.");
      expect(element).toBeInTheDocument()
    })

    global.fetch = originalFetch;
  });
});