export class FormDisabledStore {
  private disabled = false;
  private readonly listeners = new Set<() => void>();

  get = (): boolean => {
    return this.disabled;
  };

  set = (value: boolean): void => {
    if (this.disabled === value) return;
    this.disabled = value;
    for (const cb of this.listeners) cb();
  };

  subscribe = (cb: () => void): (() => void) => {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  };

  getSnapshot = (): boolean => {
    return this.disabled;
  };
}
