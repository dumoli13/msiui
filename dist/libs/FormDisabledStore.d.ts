export declare class FormDisabledStore {
    private disabled;
    private readonly listeners;
    get: () => boolean;
    set: (value: boolean) => void;
    subscribe: (cb: () => void) => (() => void);
    getSnapshot: () => boolean;
}
//# sourceMappingURL=FormDisabledStore.d.ts.map