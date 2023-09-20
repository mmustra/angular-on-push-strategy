import { cloneDeep, forEach, isNumber } from 'lodash-es';
import { BadgeModule } from 'primeng/badge';
import { Subject } from 'rxjs';

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { CdLogDirective } from '../../directives/cd-log.directive';
import { ClickLogDirective } from '../../directives/click-log.directive';
import { PayloadService } from '../../services/payload.service';
import { getRandomText } from '../../utils/random-text';
import {
  CardData,
  Config,
  ConfigComponent,
  Payload,
  provideConfig,
} from '../config/config.component';

@Component({
  selector: 'mm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BadgeModule,
    CdLogDirective,
    ClickLogDirective,
  ],
  providers: [provideConfig(CardComponent)],
  hostDirectives: [{ directive: CdLogDirective }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent
  extends ConfigComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() payload: Payload;
  @Input() data: CardData;
  @Output() onData: EventEmitter<Payload>;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  data$: Subject<CardData>;
  childrenRefs: ComponentRef<CardComponent>[];

  constructor(
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    private payloadService: PayloadService
  ) {
    super();

    this.childrenRefs = [];
    this.onData = new EventEmitter();
    this.data$ = new Subject();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newPayload = changes?.payload?.currentValue as Payload;

    if (newPayload) {
      this.handlePayload(newPayload);
    }
  }

  ngOnInit(): void {
    this.initializeData();
    this.watchServicePayload();
  }

  ngAfterViewInit(): void {
    this.tryCreateChildren();
  }

  ngOnDestroy(): void {
    forEach(this.childrenRefs, (childRef) => childRef.destroy());
  }

  sendData(): void {
    const { options, withCdr } = this.config.sender;
    const message = getRandomText();

    if (!options) {
      return;
    }

    const { path, cardName, changeType } = options;

    const payload = new Payload({
      path,
      changeType,
      withCdr,
      data: { message },
    });

    if (cardName) {
      this.payloadService.emit(cardName, payload);
    } else {
      this.handlePayload(payload);
    }
  }

  private handlePayload(payload: Payload): void {
    const { path = [] } = payload;
    const childIndex = path[0];

    if (!isNumber(childIndex)) {
      this.handleLocalPayload(payload);
    } else if (childIndex < 0) {
      this.handleParentPayload(payload);
    } else {
      this.handleChildPayload(payload);
    }
  }

  private handleLocalPayload(payload: Payload): void {
    const { name } = this.config;
    const { isActive = false, isAsyncPipe = false } = this.config.receiver;
    const { changeType = 'reference', withCdr = false } = payload;

    if (!isActive) {
      throw new Error(`${name}: Receiver not active!`);
    }

    if (isAsyncPipe) {
      this.data$.next(payload.data);
    } else if (changeType === 'reference') {
      this.data = payload.data;
    } else if (changeType === 'mutation') {
      this.data.message = payload.data.message;
    } else {
      throw new Error(`${name}: Local payload not handled!`);
    }

    if (withCdr) {
      this.cdr.markForCheck();
    }
  }

  private handleParentPayload(payload: Payload): void {
    const { path = [] } = payload;
    const newPayload = new Payload(payload);
    newPayload.path = path.slice(1);

    this.onData.emit(newPayload);
  }

  private handleChildPayload(payload: Payload): void {
    const { name } = this.config;
    const { path = [], changeType = 'reference', withCdr = false } = payload;
    const childIndex = path[0];
    const childRef = this.childrenRefs[childIndex];
    const isReceiverAsync = childRef.instance.config.receiver.isAsyncPipe;
    const newPath = path.slice(1);

    if (newPath.length) {
      const newPayload = new Payload(payload);
      newPayload.path = newPath;
      childRef.setInput('payload', newPayload);
    } else if (isReceiverAsync) {
      childRef.instance.data$.next(payload.data);
    } else if (changeType === 'reference') {
      childRef.setInput('data', payload.data);
    } else if (changeType === 'mutation') {
      childRef.instance.data.message = payload.data.message;
      if (withCdr) {
        childRef.changeDetectorRef.markForCheck();
      }
    } else {
      throw new Error(`${name}: Child payload not handled!`);
    }
  }

  private watchServicePayload(): void {
    const { name } = this.config;

    this.payloadService
      .listen$(name)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: this.handlePayload.bind(this) });
  }

  private tryCreateChildren(): void {
    const { children } = this.config;

    if (!children?.length) {
      return;
    }

    this.container.clear();

    forEach(children, (childConfig) => {
      const childRef = this.createComponent(childConfig);
      this.childrenRefs.push(childRef);
    });

    this.cdr.detectChanges();
  }

  private createComponent(config: Config): ComponentRef<CardComponent> {
    const componentRef = this.container.createComponent(CardComponent);
    componentRef.instance.config = config;
    componentRef.instance.onData
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: this.handlePayload.bind(this) });

    return componentRef;
  }

  private initializeData(): void {
    const { isAsyncPipe } = this.config.receiver;
    const { data, timeoutMS, withCdr } = this.config.initialData;

    if (isNumber(timeoutMS)) {
      setTimeout(() => {
        if (isAsyncPipe) {
          this.data$.next(data);
        } else {
          this.data = cloneDeep(data);
        }
        if (withCdr) {
          this.cdr.markForCheck();
        }
      }, timeoutMS);
    } else if (isAsyncPipe) {
      this.data$.next(data);
    } else {
      this.data = cloneDeep(data);
    }
  }
}
