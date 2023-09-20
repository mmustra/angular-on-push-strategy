import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardContainerComponent } from '../../../shared/components/card-container/card-container.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Config } from '../../../shared/components/config/config.component';

@Component({
  selector: 'mm-case-async-pipe-example-1',
  templateUrl: './case-async-pipe-example-1.component.html',
  styleUrls: ['./case-async-pipe-example-1.component.css'],
  standalone: true,
  imports: [CommonModule, CardContainerComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseAsyncPipeExample1Component {
  config: Config;

  constructor() {
    this.config = new Config({
      name: 'Root',
      badge: 'A',
      initialData: { data: { message: 'Initial message' }, timeoutMS: 2000 },
      receiver: { isActive: true, isAsyncPipe: true },
      children: [
        new Config({
          name: 'Node-1',
          badge: 'B',
          layout: 'col',
          receiver: { isActive: true, isAsyncPipe: true },
          initialData: {
            data: { message: 'Initial message' },
            timeoutMS: 4000,
          },
          children: [
            new Config({
              name: 'Node-1-1',
            }),
            new Config({
              name: 'Node-1-2',
            }),
          ],
        }),
        new Config({
          name: 'Node-2',
          layout: 'col',
          children: [
            new Config({
              name: 'Node-2-1',
              badge: 'C',
              initialData: {
                data: { message: 'Initial message' },
                timeoutMS: 6000,
              },
              receiver: { isActive: true, isAsyncPipe: true },
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
