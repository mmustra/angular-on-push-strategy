import { merge } from 'lodash-es';

import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  Type,
} from '@angular/core';

@Component({ selector: 'mm-base', template: `` })
export abstract class ConfigComponent implements OnChanges {
  @Input() config: Config;

  abstract ngOnChanges(changes?: SimpleChanges): void;
}

export function provideConfig(component: Type<ConfigComponent>) {
  return {
    provide: ConfigComponent,
    useExisting: forwardRef(() => component),
  };
}

class DataHandler {
  isActive: boolean = false;
}

class ReceiverHandler extends DataHandler {
  isAsyncPipe?: boolean = false;
}

class SendOptions {
  path?: number[];
  cardName?: string = '';
  changeType?: ChangeType = 'reference';
}

class SenderHandler extends DataHandler {
  options?: SendOptions;
  withCdr?: boolean;

  constructor() {
    super();

    this.options = null;
    this.withCdr = false;
  }
}

export class CardData {
  message: string = '';
}

class InitialData {
  data: CardData = new CardData();
  timeoutMS?: number = null;
  withCdr?: boolean = false;
}

export class Config {
  name: string;
  badge: string;
  layout: 'row' | 'col';
  initialData: InitialData;
  sender: SenderHandler;
  receiver: ReceiverHandler;
  children: Config[];

  constructor(config: ConfigPayload) {
    this.name = config.name;
    this.badge = config.badge ?? '';
    this.layout = config.layout ?? 'row';
    this.initialData = merge(new InitialData(), config.initialData);
    this.sender = merge(new SenderHandler(), config.sender);
    this.receiver = merge(new ReceiverHandler(), config.receiver);
    this.children = config.children ?? [];
  }
}

export class Payload {
  path: number[];
  changeType?: ChangeType;
  data?: CardData;
  withCdr?: boolean;

  constructor(payload: Payload) {
    this.path = payload.path;
    this.changeType = payload.changeType ?? 'reference';
    this.data = payload.data ?? new CardData();
    this.withCdr = payload.withCdr ?? false;
  }
}
type ConfigPayload = Pick<Config, 'name'> & Partial<Omit<Config, 'name'>>;
type ChangeType = 'reference' | 'mutation';
