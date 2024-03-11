import csv from 'csvtojson'
import { allowedOrderByValues, allowedSortByValues, ordersCsvFilePath, recordsPerPage, storesCsvFilePath } from "./utils/constants";
import { extractStoreInfo, getOverDueDays, sortOrdersBasedOnParams } from "./utils/common";
import { Orders, Stores, sortByType } from "./utils/types";

/**
  * Returns the modified orders by providing store information and the days overdue
  * @param orders - Orders data from csv file
  * @param stores - Stores data from csv file
  * @param orderBy - Parameter to order ascending or descending
  * @param sortBy - Sort based on one of keys of order 
  * @returns Modified orders with store information and daysOverdue.
  *
  */

export const computeOrders = (orders: Orders[], stores: Stores[], orderBy: string, sortBy: string) => {
    const pendingOrders = orders.filter(({ shipment_status }) => shipment_status === 'Pending')
    const pendingOrdersWithStoreInfo: Orders[] = pendingOrders
        .map((row) => ({
            ...row,
            ...extractStoreInfo(row.storeId, stores),
            daysOverdue: getOverDueDays(row)
        }))

    return sortOrdersBasedOnParams(pendingOrdersWithStoreInfo, orderBy, sortBy as sortByType)
}


export const getOrders = async (req: any, res: any) => {

    try {
        const page: number = parseInt(req.params.page as string) || 1
        const sortBy: string = req.query.sortBy as string || 'daysOverdue'
        const orderBy: string = req.query.orderBy as string || 'desc'

        if (page < 0) {
            res.status(400).json({ message: 'Invalid page number provided.' })
            return
        }

        if (!allowedOrderByValues.includes(orderBy)) {
            res.status(400).json({ message: 'Invalid orderBy value provided.' })
            return
        }
        if (!allowedSortByValues.includes(sortBy)) {
            res.status(400).json({ message: 'Invalid sortBy value provided.' })
            return
        }


        const orders = await csv().fromFile(ordersCsvFilePath)
        const stores = await csv().fromFile(storesCsvFilePath)

        const filteredOrders = computeOrders(orders, stores, orderBy, sortBy)

        const startIndex = page * recordsPerPage
        const endIndex = startIndex + recordsPerPage
        const finalPageIndex = parseInt((filteredOrders.length / recordsPerPage).toString())

        res.status(200).json({ responses: filteredOrders.slice(startIndex, endIndex), finalPageIndex })
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Unknown error."
        res.status(500).json({ message })
    }

}