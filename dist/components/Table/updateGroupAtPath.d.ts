import type { TableGroupNode } from '../../types';
declare const updateGroupAtPath: <T>(groups: TableGroupNode<T>[], path: T[keyof T][], updater: (node: TableGroupNode<T>) => TableGroupNode<T>) => TableGroupNode<T>[];
export default updateGroupAtPath;
//# sourceMappingURL=updateGroupAtPath.d.ts.map