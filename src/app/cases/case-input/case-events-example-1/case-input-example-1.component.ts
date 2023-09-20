import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardContainerComponent } from '../../../shared/components/card-container/card-container.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Config } from '../../../shared/components/config/config.component';

@Component({
  selector: 'mm-case-input-example-1',
  templateUrl: './case-input-example-1.component.html',
  styleUrls: ['./case-input-example-1.component.css'],
  standalone: true,
  imports: [CommonModule, CardContainerComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseInputExample1Component {
  config: Config;

  constructor() {
    this.config = new Config({
      name: 'Root',
      children: [
        new Config({
          name: 'Node-1',
          layout: 'col',
          badge: 'A',
          sender: {
            isActive: true,
            options: { path: [-1, 1], changeType: 'mutation' },
          },
          children: [
            new Config({
              name: 'Node-1-1',
              badge: 'B',
              sender: { isActive: true, options: { path: [-1, -1, 1, 0] } },
            }),
            new Config({
              name: 'Node-1-2',
              badge: 'C',
              sender: { isActive: true, options: { path: [-1, -1, 1, 1] } },
            }),
          ],
        }),
        new Config({
          name: 'Node-2',
          layout: 'col',
          receiver: { isActive: true },
          children: [
            new Config({
              name: 'Node-2-1',
              receiver: { isActive: true },
            }),
            new Config({
              name: 'Node-2-2',
              receiver: { isActive: true },
            }),
          ],
        }),
      ],
    });
  }
}
