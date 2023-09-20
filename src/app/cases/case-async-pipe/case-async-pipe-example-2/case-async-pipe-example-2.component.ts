import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardContainerComponent } from '../../../shared/components/card-container/card-container.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Config } from '../../../shared/components/config/config.component';

@Component({
  selector: 'mm-case-async-pipe-example-2',
  templateUrl: './case-async-pipe-example-2.component.html',
  styleUrls: ['./case-async-pipe-example-2.component.css'],
  standalone: true,
  imports: [CommonModule, CardContainerComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseAsyncPipeExample2Component {
  config: Config;

  constructor() {
    this.config = new Config({
      name: 'Root',
      children: [
        new Config({
          name: 'Node-1',
          layout: 'col',
          badge: 'A',
          sender: { isActive: true, options: { cardName: 'Node-2-1' } },
          children: [
            new Config({
              name: 'Node-1-1',
              badge: 'B',
              sender: { isActive: true, options: { cardName: 'Node-2-2' } },
            }),
            new Config({
              name: 'Node-1-2',
            }),
          ],
        }),
        new Config({
          name: 'Node-2',
          layout: 'col',
          initialData: { data: { message: 'Initial Data' }, timeoutMS: 0 },
          receiver: { isActive: true },
          children: [
            new Config({
              name: 'Node-2-1',
              receiver: { isActive: true, isAsyncPipe: true },
            }),
            new Config({
              name: 'Node-2-2',
              receiver: { isActive: true, isAsyncPipe: true },
            }),
          ],
        }),
      ],
    });
  }
}
