import express, { Request, Response } from "express";

import cors from "cors";
import { getUser } from "./user";

import csv from 'csvtojson'
import { allowedOrderByValues, allowedSortByValues, ordersCsvFilePath, recordsPerPage, storesCsvFilePath } from "./utils/constants";
import { differenceInDays, toDate, format } from "date-fns";
import { sortOrdersBasedOnParams, extractStoreInfo, covertDateToISO } from "./utils/common";
import { sortByType } from "./utils/types";
import { getOrders } from "./orders";


const app = express();
const port = 8080;

app.use(cors());
app.get("/user", getUser);


app.get("/sales/:page?", getOrders);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
