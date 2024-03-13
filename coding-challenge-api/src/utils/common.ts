import { differenceInDays } from "date-fns";
import { numberSearchFields } from "./constants";
import { Orders, Stores, sortByType } from "./types";


export const covertDateToISO = (date: string): string => `${date.split('/')[2]}/${date.split('/')[1]}/${date.split('/')[0]}`

export const extractStoreInfo = (id: number, stores: Stores[]): Object => {
    const matchingStore = stores.find(({ storeId }: { storeId: number }) => id === storeId)
    if (matchingStore) {
        const { marketplace, shopName, country } = matchingStore
        return { marketplace, shopName, country }
    } else {
        return { marketplace: '', shopName: '', country: 'AUS' }
    }
}

export const getOverDueDays = (orderInfo: Orders) => differenceInDays(new Date(), new Date(covertDateToISO(orderInfo.latest_ship_date as string)))

export const sortOrdersBasedOnParams = (orders: Orders[], orderBy: string, sortBy: sortByType): Orders[] => {

    const sortedOrdersAsc = orders.sort((a: Orders, b: Orders) => {
        if (numberSearchFields.includes(sortBy)) {
            return ((a[sortBy] as any) - (b[sortBy] as any))
        } else {
            if ((a[sortBy] as string).toLowerCase() > (b[sortBy] as string).toLowerCase()) return 1;
            if ((a[sortBy] as string).toLowerCase() < (b[sortBy] as string).toLowerCase()) return -1;
            return 0;
        }
    })

    return orderBy === 'desc' ? sortedOrdersAsc.reverse() : sortedOrdersAsc
}