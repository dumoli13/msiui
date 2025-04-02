import React from 'react';
export interface SkeletonProps {
    width?: number;
    height?: number;
    type?: 'circle' | 'rounded' | 'rect';
}
/**
 *
 * A predefined skeleton loader for input fields, designed to simulate loading states for forms or inputs.
 * It consists of a title placeholder and a large input field placeholder.
 *
 */
declare const Skeleton: {
    ({ width, height, type }: SkeletonProps): React.JSX.Element;
    input(): React.JSX.Element;
    table({ column }: {
        column: number;
    }): React.JSX.Element;
};
export default Skeleton;
//# sourceMappingURL=Skeleton.d.ts.map