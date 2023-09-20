import { Data, Route } from '@angular/router';

import { casesRoutes } from './app/cases/cases-routes';
import { homeRoutes } from './app/home/home-routes';

export const routes: AppRoute[] = [
  ...homeRoutes,
  ...casesRoutes,
  {
    path: '**',
    redirectTo: homeRoutes[0].path,
  },
];

export const mapToRouteLink = (path: string): string => `/${path}`;

export interface AppRoute extends Route {
  data?: AppRouteData;
  children?: AppRoute[];
}

export interface AppRouteData extends Data {
  menuName: string;
  menuIcon?: string;
  menuExactMatch?: boolean;
}
