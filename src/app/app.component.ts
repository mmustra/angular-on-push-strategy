import { filter } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TeleportModule, TeleportOutletDirective } from '@ngneat/overview';

import { LayoutComponent } from './shared/components/ui/layout/layout.component';
import { MenuComponent } from './shared/components/ui/menu/menu.component';
import { AnimationService } from './shared/services/animation.service';
import { LogService } from './shared/services/log.service';

@Component({
  selector: 'mm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, TeleportModule, LayoutComponent, MenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChildren(TeleportOutletDirective)
  teleportOutlet: QueryList<TeleportOutletDirective>;

  constructor(
    private router: Router,
    private animationService: AnimationService,
    private logService: LogService,
    private destroyRef: DestroyRef
  ) {
    this.watchRoutes();
  }

  private watchRoutes(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (event) => {
          this.logService.break();
          this.logService.log(
            'NEW ROUTE:',
            (event as NavigationEnd).urlAfterRedirects
          );
          this.animationService.reset();
        },
      });
  }
}
