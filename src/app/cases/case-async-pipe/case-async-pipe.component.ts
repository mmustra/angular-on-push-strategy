import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoute } from '../../../routes';
import { ExampleContainerComponent } from '../../shared/components/example-container/example-container.component';
import { caseAsyncPipeRoutes } from './case-async-pipe-routes';

@Component({
  selector: 'mm-case-async-pipe',
  templateUrl: './case-async-pipe.component.html',
  styleUrls: ['./case-async-pipe.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ExampleContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseAsyncPipeComponent {
  routes: AppRoute[];

  constructor() {
    this.routes = caseAsyncPipeRoutes[0].children;
  }
}
