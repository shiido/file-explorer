export interface Registry {
  unregister: () => void;
}

export interface Callable {
  [key: string]: any;
}

export interface Subscriber {
  [key: string]: Callable;
}

export interface IEventBus {
  dispatch<T>(event: string, arg?: T): void;
  register(event: string, callback: any): Registry;
}
