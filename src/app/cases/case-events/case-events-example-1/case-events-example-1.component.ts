import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardContainerComponent } from '../../../shared/components/card-container/card-container.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Config } from '../../../shared/components/config/config.component';

@Component({
  selector: 'mm-case-events-example-1',
  templateUrl: './case-events-example-1.component.html',
  styleUrls: ['./case-events-example-1.component.css'],
  standalone: true,
  imports: [CommonModule, CardContainerComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseEventsExample1Component {
  config: Config;

  constructor() {
    this.config = new Config({
      name: 'Root',
      badge: 'A',
      sender: { isActive: true },
      children: [
        new Config({
          name: 'Node-1',
          layout: 'col',
          children: [
            new Config({
              name: 'Node-1-1',
              badge: 'B',
              sender: { isActive: true },
            }),
            new Config({
              name: 'Node-1-2',
            }),
          ],
        }),
        new Config({
          name: 'Node-2',
          layout: 'col',
          badge: 'C',
          sender: { isActive: true },
          children: [
            new Config({
              name: 'Node-2-1',
            }),
            new Config({
              name: 'Node-2-2',
            }),
          ],
        }),
      ],
    });
  }
}
