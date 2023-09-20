import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import {
  AnimationService,
  AnimationType,
} from '../../../services/animation.service';
import { LogService } from '../../../services/log.service';

@Component({
  selector: 'mm-reload',
  templateUrl: './reload.component.html',
  styleUrls: ['./reload.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReloadComponent implements OnInit {
  @Input({ required: true }) container$: Observable<HTMLElement>;
  @Input({ required: true }) createFunc: () => void;
  @Input({ required: true }) destroyFunc: () => void;

  container: HTMLElement;

  constructor(
    private logService: LogService,
    private animationService: AnimationService,
    private destroyRef: DestroyRef
  ) {
    this.container = null;
  }

  ngOnInit(): void {
    this.watchContainer();
  }

  reload(): void {
    this.logService.break();
    this.logService.log('RELOAD');

    this.animationService.reset();

    this.animationService
      .animate$({
        element: this.container,
        type: AnimationType.Destroy,
        customSpeed: 100,
      })
      .subscribe({
        next: () => {
          this.destroyFunc();
          this.createFunc();
        },
      });
  }

  private watchContainer(): void {
    this.container$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: (container) => (this.container = container) });
  }
}
