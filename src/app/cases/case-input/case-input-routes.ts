import { AppRoute } from '../../../routes';
import { CaseInputExample1Component } from './case-events-example-1/case-input-example-1.component';
import { CaseInputExample2Component } from './case-events-example-2/case-input-example-2.component';
import { CaseInputComponent } from './case-input.component';

export const caseInputRoutes: AppRoute[] = [
  {
    path: 'case-input',
    title: 'OnP: Case @Input()',
    data: { menuName: 'Case @Input()' },
    component: CaseInputComponent,
    children: [
      {
        path: 'example-1',
        component: CaseInputExample1Component,
      },
      {
        path: 'example-2',
        component: CaseInputExample2Component,
      },
      {
        path: '**',
        redirectTo: 'example-1',
      },
    ],
  },
];
