export interface SkeletonProps {
    width?: number;
    height?: number;
    type?: 'circle' | 'rounded' | 'rect';
}
export interface SkeletonInputProps {
    size?: 'default' | 'large';
    height?: number;
}
export interface SkeletonTableProps {
    column?: number;
    row?: number;
    size?: 'small' | 'default' | 'large';
}
/**
 *
 * A predefined skeleton loader for input fields, designed to simulate loading states for forms or inputs.
 * It consists of a title placeholder and a large input field placeholder.
 *
 */
declare const Skeleton: {
    ({ width, height, type }: SkeletonProps): import("react/jsx-runtime").JSX.Element;
    Input: {
        ({ size, height }: SkeletonInputProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    Table: {
        ({ column, row, size, }: SkeletonTableProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
};
export default Skeleton;
//# sourceMappingURL=Skeleton.d.ts.map