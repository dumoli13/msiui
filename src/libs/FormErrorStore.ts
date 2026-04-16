export class FormErrorStore {
  private errors: Record<string, string | undefined> = {};
  private readonly listeners: Map<string, Set<() => void>> = new Map();

  getError(name: string): string | undefined {
    return this.errors[name];
  }

  getErrors(): Record<string, string | undefined> {
    return { ...this.errors };
  }

  setError(name: string, error: string | undefined): void {
    if (this.errors[name] === error) return;
    this.errors[name] = error;
    for (const cb of this.listeners.get(name) ?? []) cb();
  }

  setErrors(newErrors: Record<string, string | undefined>): void {
    const changed = new Set<string>();

    for (const [name, error] of Object.entries(newErrors)) {
      if (this.errors[name] !== error) {
        this.errors[name] = error;
        changed.add(name);
      }
    }

    for (const name of Object.keys(this.errors)) {
      if (!(name in newErrors) && this.errors[name] !== undefined) {
        this.errors[name] = undefined;
        changed.add(name);
      }
    }

    for (const name of changed) {
      for (const cb of this.listeners.get(name) ?? []) cb();
    }
  }

  clearErrors(): void {
    const names = Object.keys(this.errors);
    this.errors = {};
    for (const name of names) {
      for (const cb of this.listeners.get(name) ?? []) cb();
    }
  }

  makeSubscribe(name: string): (cb: () => void) => () => void {
    return (cb: () => void) => {
      if (!this.listeners.has(name)) this.listeners.set(name, new Set());
      this.listeners.get(name)?.add(cb);
      return () => this.listeners.get(name)?.delete(cb);
    };
  }

  makeSnapshot(name: string): () => string | undefined {
    return () => this.errors[name];
  }
}
