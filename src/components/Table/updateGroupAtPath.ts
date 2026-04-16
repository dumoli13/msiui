import type { TableGroupNode } from '../../types';

const checkObjectIdentical = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;

  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  ) {
    return false;
  }

  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!checkObjectIdentical(objA[key], objB[key])) return false;
  }

  return true;
};

const updateGroupAtPath = <T>(
  groups: TableGroupNode<T>[],
  path: T[keyof T][],
  updater: (node: TableGroupNode<T>) => TableGroupNode<T>,
): TableGroupNode<T>[] => {
  if (path.length === 0) return groups;

  return groups.map((group) => {
    if (!checkObjectIdentical(group.value, path[0])) return group;

    if (path.length === 1) return updater(group);

    return {
      ...group,
      children: updateGroupAtPath(
        (group.children ?? []) as TableGroupNode<T>[],
        path.slice(1),
        updater,
      ),
    };
  });
};

export default updateGroupAtPath;
