import { Directive, HostListener, SkipSelf } from '@angular/core';

import { ConfigComponent } from '../components/config/config.component';
import { AnimationService } from '../services/animation.service';
import { LogService, LogType } from '../services/log.service';

@Directive({
  selector: '[clickLog]',
  standalone: true,
})
export class ClickLogDirective {
  private counter: number;

  constructor(
    @SkipSelf() private host: ConfigComponent,
    private animationService: AnimationService,
    private logService: LogService
  ) {
    this.counter = 0;
  }

  @HostListener('click') logAndReset() {
    const { name } = this.host.config;

    this.logService.newLine();
    this.logService.log(LogType.Click, name, 'count:', ++this.counter);

    this.animationService.reset();
  }
}
