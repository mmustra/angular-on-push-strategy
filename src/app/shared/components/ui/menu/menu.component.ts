import { filter, flow, map, partialRight, startCase } from 'lodash-es';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppRoute, mapToRouteLink, routes } from '../../../../../routes';

@Component({
  selector: 'mm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [CommonModule, TabMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  items: MenuItem[];

  constructor() {
    this.items = flow(
      partialRight(filter<AppRoute[]>, 'component'),
      partialRight(map<MenuItem[]>, (route: AppRoute) => ({
        label: route.data?.menuName ?? startCase(route.path),
        icon: `pi pi-fw ${route.data?.menuIcon ?? 'pi-file'}`,
        routerLink: mapToRouteLink(route.path),
        routerLinkActiveOptions: { exact: !!route.data?.menuExactMatch },
      }))
    )(routes);
  }
}
