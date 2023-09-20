import { AppRoute } from '../../routes';
import { HomeComponent } from './home.component';

export const homeRoutes: AppRoute[] = [
  {
    title: 'OnP: Home',
    data: { menuName: '', menuIcon: 'pi-home', menuExactMatch: true },
    path: '',
    component: HomeComponent,
  },
];
