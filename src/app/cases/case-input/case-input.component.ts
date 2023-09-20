import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoute } from '../../../routes';
import { ExampleContainerComponent } from '../../shared/components/example-container/example-container.component';
import { caseInputRoutes } from './case-input-routes';

@Component({
  selector: 'mm-case-input',
  templateUrl: './case-input.component.html',
  styleUrls: ['./case-input.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ExampleContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseInputComponent {
  routes: AppRoute[];

  constructor() {
    this.routes = caseInputRoutes[0].children;
  }
}
