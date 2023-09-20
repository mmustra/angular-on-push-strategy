import {
  DestroyRef,
  Directive,
  DoCheck,
  ElementRef,
  Self,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ConfigComponent } from '../components/config/config.component';
import { AnimationService, AnimationType } from '../services/animation.service';
import { DomService } from '../services/dom.service';
import { LogService, LogType } from '../services/log.service';
import { isChildOfParent } from '../utils/element-traverse';

@Directive({
  selector: '[cdLog]',
  standalone: true,
})
export class CdLogDirective implements DoCheck {
  private hasChanges: boolean;
  private counter: Counter;

  constructor(
    @Self() private host: ConfigComponent,
    private el: ElementRef<HTMLElement>,
    private animationService: AnimationService,
    private logService: LogService,
    private domService: DomService,
    private destroyRef: DestroyRef
  ) {
    this.initialize();
  }

  ngDoCheck(): void {
    const { name } = this.host.config;

    ++this.counter.check;

    if (!this.hasChanges) {
      const element = this.el.nativeElement.firstChild as HTMLElement;
      this.animationService
        .animate$({
          element,
          type: AnimationType.Check,
        })
        .subscribe();

      this.logService.log(LogType.Check, name, 'count:', this.counter.check);
    }

    this.hasChanges = false;
  }

  private initialize(): void {
    this.hasChanges = false;
    this.counter = {
      check: 0,
      changes: 0,
      render: 0,
    };

    this.decorateOnChanges();
    this.watchRenders();

    this.el.nativeElement.setAttribute('_cdLog', '');
  }

  private decorateOnChanges(): void {
    const originalChanges = this.host.ngOnChanges.bind(this.host);
    this.host.ngOnChanges = (...args) => {
      originalChanges(...args);

      this.hasChanges = true;

      const { name } = this.host.config;

      this.logService.log(
        LogType.Changes,
        name,
        'count:',
        ++this.counter.changes,
        ...args
      );

      const element = this.el.nativeElement.firstChild as HTMLElement;
      this.animationService
        .animate$({
          element,
          type: AnimationType.Changes,
        })
        .subscribe();
    };
  }

  private watchRenders(): void {
    this.domService
      .fromLayoutChanges$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (mutations) => {
          const componentMutation = mutations.find((mutation) => {
            const element = mutation?.target?.parentElement;

            return isChildOfParent(element, this.el.nativeElement, '_cdLog');
          });

          if (componentMutation) {
            const { name } = this.host.config;

            this.logService.log(
              LogType.Render,
              name,
              'count:',
              ++this.counter.render
            );

            const element = this.el.nativeElement.firstChild as HTMLElement;
            this.animationService
              .animate$({
                element,
                type: AnimationType.Render,
              })
              .subscribe();
          }
        },
      });
  }
}

interface Counter {
  check: number;
  changes: number;
  render: number;
}
