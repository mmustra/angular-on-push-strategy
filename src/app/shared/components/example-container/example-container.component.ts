import {
  filter,
  findIndex,
  flow,
  map,
  partialRight,
  split,
  startCase,
} from 'lodash-es';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { AppRoute } from '../../../../routes';

@Component({
  selector: 'mm-example-container',
  templateUrl: './example-container.component.html',
  styleUrls: ['./example-container.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, FieldsetModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleContainerComponent implements OnInit {
  @Input({ required: true }) routes: AppRoute[];
  @Output() onRouteChange: EventEmitter<number>;

  routeButtons: ExampleRouteButton[];
  activeIndex: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.onRouteChange = new EventEmitter();
  }

  ngOnInit(): void {
    this.routeButtons = this.mapToExampleRouteButtons(this.routes);
    this.activeIndex = this.getActiveIndex(this.routeButtons);
  }

  changeRoute(index: number): void {
    this.activeIndex = index;
    const activeRouteButton = this.routeButtons[index];

    this.router
      .navigate([`${activeRouteButton.path}`], {
        relativeTo: this.activatedRoute,
      })
      .then((isRouteActivated) => {
        if (isRouteActivated) {
          this.onRouteChange.next(index);
        }
      });
  }

  withActiveClass(index: number): string {
    return index === this.activeIndex ? 'p-button-primary' : '';
  }

  private mapToExampleRouteButtons(routes: AppRoute[]): ExampleRouteButton[] {
    return flow(
      partialRight(filter<AppRoute[]>, 'component'),
      partialRight(map<ExampleRouteButton[]>, (route: AppRoute) => ({
        name: startCase(route.data?.menuName ?? route.path),
        path: route.path,
      }))
    )(routes);
  }

  private getActiveIndex(routeButtons: ExampleRouteButton[]): number {
    const activatedPath = split(this.router.url, '/').pop();

    return findIndex(routeButtons, {
      path: activatedPath,
    });
  }
}

export interface ExampleRouteButton {
  name: string;
  path: string;
}
