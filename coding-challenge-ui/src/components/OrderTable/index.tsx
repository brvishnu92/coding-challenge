import React from "react";
// import PaginationButton from "../PaginationButton";

import SortIcon from '../../../src/assets/sort.png'
import { getFlagIconUrl } from "../../utils/common";
import { Orders } from "../../types";
import Pagination from "../Pagination";
import { orderTableHeaderValues } from "../../utils/constants";

const OrderTable = ({ handleSort, loading, orders, page, setPage, finalPageNo }: { loading: boolean, orders: Array<any>, handleSort: Function, page: number, setPage: Function, finalPageNo: number, }) => {

    const headers = orderTableHeaderValues.map(({ name }) => name)
    const orderProperties = orderTableHeaderValues.map(({ value }) => value)

    const disablePreviousButtons = loading || page <= 1
    const disableNextButtons = loading || page >= finalPageNo


    return (<table>
        <thead>
            <tr>
                {headers.map(header => (
                    <th key={header}>
                        {header}
                        <img src={SortIcon} data-testid={`sort-${header}`} style={{ width: '15px', marginLeft: '5px' }} onClick={() => handleSort(header)} />
                    </th>))}
            </tr>
        </thead>
        {
            (loading || orders.length === 0) ?
                <tbody>
                    <tr>
                        <td colSpan={headers.length} style={{ textAlign: 'center', color: 'grey' }}>
                            {loading ? 'Loading...' : 'No Records'}
                        </td>
                    </tr>
                </tbody>
                :
                <tbody>
                    {orders.map((row, rowIndex) => (
                        <tr key={row.Id}>
                            {orderProperties.map((cell, index) => (
                                <td key={cell} data-testid={`${cell}-${rowIndex}-${index}`}>
                                    {cell === orderProperties[0] && <img src={getFlagIconUrl(row.country)} />}
                                    {row[cell as keyof Orders]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
        }

        <Pagination disableNextButtons={disableNextButtons} disablePreviousButtons={disablePreviousButtons} setPage={setPage} page={page} finalPageNo={finalPageNo} />
    </table>)
}

export default OrderTable