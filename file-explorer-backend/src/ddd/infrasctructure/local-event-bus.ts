import { IEventBus, Subscriber, Registry } from "../domain/contracts/event-bus";

export class LocalEventBus implements IEventBus {

   private subscribers: Subscriber;
   private static nextId = 0;
   private static instance?: LocalEventBus = undefined;

   private constructor() {
      this.subscribers = {};
   }

   public static getInstance(): LocalEventBus {
      if (this.instance === undefined) {
         this.instance = new LocalEventBus();
      }

      return this.instance;
   }

   public dispatch<T>(event: string, arg?: T): void {
      const subscriber = this.subscribers[event];

      if (subscriber === undefined) {
         return;
      }

      Object.keys(subscriber).forEach((key) => subscriber[key](arg));
   }

   public register(event: string, callback: Function): Registry {
      const id = this.getNextId();
      if (!this.subscribers[event]) this.subscribers[event] = {};

      this.subscribers[event][id] = callback;

      return {
         unregister: () => {
            delete this.subscribers[event][id];
            if (Object.keys(this.subscribers[event]).length === 0)
               delete this.subscribers[event];
         },
      };
   }

   private getNextId(): number {
      return LocalEventBus.nextId++;
   }

}