import { computeOrders, getOrders } from "../orders";
import csv from 'csvtojson'

// jest.mock("csvtojson", () => {
//   console.log("mocking here");
//   const mCsv = {
//     on: jest.fn(),
//   fromFile: jest.fn().mockResolvedValue([]),
//   };
//   return {
//     __esModule: true,
//     default: () => mCsv,
//   };
// });

test("getSales returns error on invalid page parameter", async () => {
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  }


  const req = {
    query: {},
    params: { page: -10 }
  };

  await getOrders(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.status().json).toHaveBeenCalledWith({ "message": "Invalid page number provided." });
});

test("getSales returns error on invalid sortBy parameter", async () => {
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };
  const req = {
    query: { sortBy: 'test' },
    params: {}
  };
  await getOrders(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.status().json).toHaveBeenCalledWith({ "message": "Invalid sortBy value provided." });
});

test("getSales returns error on invalid orderBy parameter", async () => {
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };
  const req = {
    query: { sortBy: 'daysOverdue', orderBy: 'ascending' },
    params: {}
  };
  await getOrders(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.status().json).toHaveBeenCalledWith({ "message": "Invalid orderBy value provided." });
});

test("getSales runs", async () => {

  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };

  const req = {
    query: { sortBy: 'daysOverdue', orderBy: 'asc' },
    params: {}
  };
  await getOrders(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
});


test("computeOrders returns sorted orders", async () => {

  const orders = await csv().fromFile('./data/orders.test.csv')
  const stores = await csv().fromFile('./data/stores.csv')

  const ordersResp = await computeOrders(orders, stores, 'desc', 'daysOverdue');
  expect(ordersResp).toHaveLength(20);
  expect(ordersResp[0].daysOverdue).toBeGreaterThan(ordersResp[1].daysOverdue as number)
});

test("computeOrders returns sorted orders for strings", async () => {

  const orders = await csv().fromFile('./data/orders.test.csv')
  const stores = await csv().fromFile('./data/stores.csv')

  const ordersResp = await computeOrders(orders, stores, 'desc', 'marketplace');
  expect(ordersResp).toHaveLength(20);
  expect(ordersResp[0].marketplace).toEqual(ordersResp[1].marketplace)
});


test("computeOrders returns no store information when no matching stores provided", async () => {

  const orders = await csv().fromFile('./data/orders.test.csv')
  // const stores = await csv().fromFile('./data/stores.csv')

  const ordersResp = await computeOrders(orders, [], 'desc', 'marketplace');
  expect(ordersResp).toHaveLength(20);
  expect(ordersResp[0].marketplace).toEqual('')
});


test("check if storeInfo returned in sorted orders", async () => {

  const orders = await csv().fromFile('./data/orders.test.csv')
  const stores = await csv().fromFile('./data/stores.csv')

  const ordersResp = computeOrders(orders, stores, 'desc', 'daysOverdue');
  expect(ordersResp[0]).toHaveProperty('marketplace')
  expect(ordersResp[0]).toHaveProperty('shopName')
});


test("throws error on invalid file provided", async () => {
  await expect(async () => {
    const orders = await csv().fromFile('./data/fake-orders.test.csv')
  }).rejects.toEqual(new Error('File does not exist. Check to make sure the file path to your csv is correct.'))
});

test("throws error on invalid request", async () => {
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };

  const req = {
    // query: { sortBy: 'daysOverdue', orderBy: 'asc' },
    // params: {}
  };
  await getOrders(req, res);
  expect(res.status).toHaveBeenCalledWith(500);
});
