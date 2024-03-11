import React from "react";
import { Button } from "./styles";


const PaginationButton = ({ 'data-testid': dataTestId, onClick, label, disabled = false }: { 'data-testid': string, onClick: React.MouseEventHandler, label: string, disabled?: boolean }): React.JSX.Element => {

    return (
        <Button data-testid={dataTestId} disabled={disabled} onClick={onClick}>{label}</Button>
    )
}


export default PaginationButton