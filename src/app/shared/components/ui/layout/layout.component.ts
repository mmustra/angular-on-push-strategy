import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { fromMutation } from '../../../utils/mutation-observer';

@Component({
  selector: 'mm-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements AfterViewInit {
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private destroyRef: DestroyRef
  ) {}

  ngAfterViewInit(): void {
    this.watchHeaderElements();
  }

  private watchHeaderElements(): void {
    const headerElement =
      this.elementRef.nativeElement.querySelector<HTMLElement>('.header');

    this.setContentHeight();

    fromMutation(headerElement, { childList: true })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (mutations) => {
          // NOTICE Needs time for re-rendered elements
          if (mutations.length > 1) {
            setTimeout(() => this.setContentHeight());
          } else {
            this.setContentHeight();
          }
        },
      });
  }

  private setContentHeight(): void {
    const headerElement =
      this.elementRef.nativeElement.querySelector<HTMLElement>('.header');
    const contentElement =
      this.elementRef.nativeElement.querySelector<HTMLElement>('.content');

    const headerHeight = headerElement.getBoundingClientRect().height;

    contentElement.style.height = `calc(100vh - ${headerHeight}px)`;
  }
}
