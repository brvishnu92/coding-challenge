import React from "react";
import PaginationButton from "../PaginationButton";


const Pagination = ({ disablePreviousButtons, disableNextButtons, setPage, page, finalPageNo }: { page: number, setPage: Function, finalPageNo: number, disableNextButtons: boolean, disablePreviousButtons: boolean }) => {


    return (<tfoot>
        <tr className="pagination">
            <td colSpan={7}>
                <PaginationButton data-testid='button-first-page' disabled={disablePreviousButtons} label="<<" onClick={() => setPage(1)} />
                <PaginationButton data-testid='button-previous-page' disabled={disablePreviousButtons} label="<" onClick={() => setPage(page - 1)} />
                <label>Page</label>
                <input data-testid='page-input' value={page} onChange={(e) => setPage(parseInt(e.target.value))} style={{ width: page > 99 ? '50px' : '20px' }} />
                <PaginationButton  data-testid='button-next-page' disabled={disableNextButtons} label=">" onClick={() => setPage(page + 1)} />
                <PaginationButton data-testid='button-last-page' disabled={disableNextButtons} label=">>" onClick={() => setPage(finalPageNo)} />
            </td>
        </tr>
    </tfoot>)
}

export default Pagination