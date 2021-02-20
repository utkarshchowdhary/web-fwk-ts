export class Attributes<T> {
  constructor(private data: T) {}

  getAll(): T {
    return this.data;
  }

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set(updProps: T): void {
    Object.assign(this.data, updProps);
  }
}
