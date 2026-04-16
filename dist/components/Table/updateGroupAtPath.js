const checkObjectIdentical = (a, b) => {
    if (a === b)
        return true;
    if (typeof a !== 'object' ||
        typeof b !== 'object' ||
        a === null ||
        b === null) {
        return false;
    }
    const objA = a;
    const objB = b;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length)
        return false;
    for (const key of keysA) {
        if (!keysB.includes(key))
            return false;
        if (!checkObjectIdentical(objA[key], objB[key]))
            return false;
    }
    return true;
};
const updateGroupAtPath = (groups, path, updater) => {
    if (path.length === 0)
        return groups;
    return groups.map((group) => {
        if (!checkObjectIdentical(group.value, path[0]))
            return group;
        if (path.length === 1)
            return updater(group);
        return {
            ...group,
            children: updateGroupAtPath((group.children ?? []), path.slice(1), updater),
        };
    });
};
export default updateGroupAtPath;
