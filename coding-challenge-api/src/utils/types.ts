
type ShipmentStatus = 'Pending' | 'Shipped'

export type Orders = {
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
}

export type Stores = {
    storeId: number;
    marketplace: string;
    country: string;
    shopName: string;
}

export type sortByType = keyof Orders
