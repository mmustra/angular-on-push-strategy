import { AppRoute } from '../../../routes';
import { CaseAsyncPipeExample1Component } from './case-async-pipe-example-1/case-async-pipe-example-1.component';
import { CaseAsyncPipeExample2Component } from './case-async-pipe-example-2/case-async-pipe-example-2.component';
import { CaseAsyncPipeComponent } from './case-async-pipe.component';

export const caseAsyncPipeRoutes: AppRoute[] = [
  {
    path: 'case-async-pipe',
    title: 'OnP: Case AsyncPipe',
    data: { menuName: 'Case AsyncPipe' },
    component: CaseAsyncPipeComponent,
    children: [
      {
        path: 'example-1',
        component: CaseAsyncPipeExample1Component,
      },
      {
        path: 'example-2',
        component: CaseAsyncPipeExample2Component,
      },
      {
        path: '**',
        redirectTo: 'example-1',
      },
    ],
  },
];
