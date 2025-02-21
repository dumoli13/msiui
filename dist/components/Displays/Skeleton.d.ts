import React from 'react';
export interface SkeletonProps {
    width?: number;
    height?: number;
    type?: 'circle' | 'rounded' | 'rect';
}
/**
 * Input Skeleton Component
 *
 * A predefined skeleton loader for input fields, designed to simulate loading states for forms or inputs.
 * It consists of a title placeholder and a large input field placeholder.
 *
 * @returns {JSX.Element} A skeleton loader simulating an input field and its title.
 *
 * @example Basic Usage:
 * ```tsx
 * <Skeleton.input />
 * ```
 */
declare const Skeleton: {
    ({ width, height, type }: SkeletonProps): React.JSX.Element;
    input(): React.JSX.Element;
    table({ column }: {
        column: number;
    }): React.JSX.Element;
};
export default Skeleton;
