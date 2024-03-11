export interface User {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
}

type ShipmentStatus = 'Pending' | 'Shipped'
export type OrderByType = 'asc' | 'desc'

export interface Orders {
    Id: number;
    storeId: number;
    orderId: string;
    latest_ship_date: Date | string;
    shipment_status: ShipmentStatus;
    destination: string;
    items: number;
    orderValue: number;
    daysOverdue?: number;
    marketplace?: string;
    country: string
}

export interface Stores {
    storeId: number;
    marketplace: string;
    country: string;
    shopName: string;
}

export type SortByType = keyof Orders
