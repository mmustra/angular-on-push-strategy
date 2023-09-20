import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoute } from '../../../routes';
import { ExampleContainerComponent } from '../../shared/components/example-container/example-container.component';
import { caseEventsRoutes } from './case-events-routes';

@Component({
  selector: 'mm-case-events',
  templateUrl: './case-events.component.html',
  styleUrls: ['./case-events.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ExampleContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseEventsComponent {
  routes: AppRoute[];

  constructor() {
    this.routes = caseEventsRoutes[0].children;
  }
}
