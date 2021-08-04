import { AxiosPromise } from "axios";

interface ModelAttributes<T> {
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
  set(updProps: T): void;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(updProps: T): void {
    this.attributes.set(updProps);
    this.trigger("change");
  }

  async fetch(): Promise<void> {
    const id = this.get("id") as number | undefined;

    if (id == null) {
      throw new Error("Cannot fetch without an id");
    } else {
      const response = await this.sync.fetch(id);
      this.set(response.data);
    }
  }

  async save(): Promise<void> {
    try {
      await this.sync.save(this.attributes.getAll());
      this.trigger("save");
    } catch (e) {
      this.trigger("error");
    }
  }
}
