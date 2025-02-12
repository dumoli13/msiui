import React from 'react';
interface PaginationButtonProps {
    onClick: () => void;
    disabled?: boolean;
}
declare const PaginationButton: {
    (): null;
    prev({ onClick, disabled }: PaginationButtonProps): React.JSX.Element;
    next({ onClick, disabled }: PaginationButtonProps): React.JSX.Element;
};
export default PaginationButton;
