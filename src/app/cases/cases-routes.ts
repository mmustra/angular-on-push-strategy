import { AppRoute } from '../../routes';
import { caseAsyncPipeRoutes } from './case-async-pipe/case-async-pipe-routes';
import { caseEventsRoutes } from './case-events/case-events-routes';
import { caseInputRoutes } from './case-input/case-input-routes';

export const casesRoutes: AppRoute[] = [
  ...caseEventsRoutes,
  ...caseInputRoutes,
  ...caseAsyncPipeRoutes,
];
