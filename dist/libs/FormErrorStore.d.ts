export declare class FormErrorStore {
    private errors;
    private readonly listeners;
    getError(name: string): string | undefined;
    getErrors(): Record<string, string | undefined>;
    setError(name: string, error: string | undefined): void;
    setErrors(newErrors: Record<string, string | undefined>): void;
    clearErrors(): void;
    makeSubscribe(name: string): (cb: () => void) => () => void;
    makeSnapshot(name: string): () => string | undefined;
}
//# sourceMappingURL=FormErrorStore.d.ts.map