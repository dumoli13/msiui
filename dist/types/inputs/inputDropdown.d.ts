import type { ModalAnimationConfig } from '../animation';
export interface InputDropdownProps {
    id?: string;
    open: boolean;
    children: React.ReactNode;
    elementRef: React.RefObject<HTMLDivElement | null>;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    fullWidth?: boolean;
    maxHeight?: number;
    animation?: ModalAnimationConfig;
}
//# sourceMappingURL=inputDropdown.d.ts.map