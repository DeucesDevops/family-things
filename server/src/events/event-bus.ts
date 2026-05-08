import { EventEmitter } from 'node:events';
import { logger } from '../config/logger';
import type { DomainEventMap, DomainEventName } from './event-types';

class TypedEventBus {
  private readonly emitter = new EventEmitter();

  emit<TEventName extends DomainEventName>(eventName: TEventName, payload: DomainEventMap[TEventName]) {
    this.emitter.emit(eventName, payload);
  }

  on<TEventName extends DomainEventName>(
    eventName: TEventName,
    handler: (payload: DomainEventMap[TEventName]) => void | Promise<void>,
  ) {
    this.emitter.on(eventName, (payload) => {
      Promise.resolve(handler(payload)).catch((error) => {
        logger.error({ error, eventName }, 'Domain event handler failed');
      });
    });
  }
}

export const eventBus = new TypedEventBus();
