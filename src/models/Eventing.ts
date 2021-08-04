export class Eventing {
  events: { [key: string]: (() => void)[] } = {};

  on = (eventName: string, callback: () => void): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (handlers != null) {
      handlers.forEach((callback) => callback());
    }
  };
}
