import { AppRoute } from '../../../routes';
import { CaseEventsExample1Component } from './case-events-example-1/case-events-example-1.component';
import { CaseEventsExample2Component } from './case-events-example-2/case-events-example-2.component';
import { CaseEventsComponent } from './case-events.component';

export const caseEventsRoutes: AppRoute[] = [
  {
    path: 'case-events',
    title: 'OnP: Case Events',
    component: CaseEventsComponent,
    children: [
      {
        path: 'example-1',
        component: CaseEventsExample1Component,
      },
      {
        path: 'example-2',
        component: CaseEventsExample2Component,
      },
      {
        path: '**',
        redirectTo: 'example-1',
      },
    ],
  },
];
