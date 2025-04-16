import React from 'react';
export interface PaginationButtonProps {
    onClick: () => void;
    disabled?: boolean;
}
declare const PaginationButton: {
    (): null;
    Prev: ({ onClick, disabled }: PaginationButtonProps) => React.JSX.Element;
    Next: ({ onClick, disabled }: PaginationButtonProps) => React.JSX.Element;
};
export default PaginationButton;
//# sourceMappingURL=PaginationButton.d.ts.map