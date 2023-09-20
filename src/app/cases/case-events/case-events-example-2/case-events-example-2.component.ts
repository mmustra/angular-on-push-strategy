import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardContainerComponent } from '../../../shared/components/card-container/card-container.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Config } from '../../../shared/components/config/config.component';

@Component({
  selector: 'mm-case-events-example-2',
  templateUrl: './case-events-example-2.component.html',
  styleUrls: ['./case-events-example-2.component.css'],
  standalone: true,
  imports: [CommonModule, CardContainerComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseEventsExample2Component {
  config: Config;

  constructor() {
    this.config = new Config({
      name: 'Root',
      initialData: { data: { message: 'Initial message' }, timeoutMS: 0 },
      receiver: { isActive: true },
      children: [
        new Config({
          name: 'Node-1',
          layout: 'col',
          initialData: { data: { message: 'Initial message' }, timeoutMS: 0 },
          receiver: { isActive: true },
          children: [
            new Config({
              name: 'Node-1-1',
              badge: 'A',
              sender: { isActive: true },
            }),
          ],
        }),
        new Config({
          name: 'Node-2',
          layout: 'col',
          children: [
            new Config({
              name: 'Node-2-1',
              initialData: {
                data: { message: 'On side path!' },
                timeoutMS: 0,
              },
              receiver: { isActive: true },
            }),
            new Config({
              name: 'Node-2-2',
              badge: 'B',
              initialData: {
                data: { message: 'Initial message' },
                timeoutMS: 0,
              },
              sender: { isActive: true },
              receiver: { isActive: true },
            }),
          ],
        }),
      ],
    });
  }
}
