import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardContainerComponent } from '../../../shared/components/card-container/card-container.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Config } from '../../../shared/components/config/config.component';

@Component({
  selector: 'mm-case-input-example-2',
  templateUrl: './case-input-example-2.component.html',
  styleUrls: ['./case-input-example-2.component.css'],
  standalone: true,
  imports: [CommonModule, CardContainerComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseInputExample2Component {
  config: Config;

  constructor() {
    this.config = new Config({
      name: 'Root',
      badge: 'A',
      sender: {
        isActive: true,
        options: { cardName: 'Node-2-2', path: [0] },
      },
      children: [
        new Config({
          name: 'Node-1',
          badge: 'B',
          layout: 'col',
          sender: {
            isActive: true,
            options: { cardName: 'Node-2-1', path: [0] },
          },
        }),
        new Config({
          name: 'Node-2',
          layout: 'col',
          initialData: { data: { message: 'Initial message' }, timeoutMS: 0 },
          receiver: { isActive: true },
          children: [
            new Config({
              name: 'Node-2-1',
              layout: 'col',
              initialData: {
                data: { message: 'Initial message' },
                timeoutMS: 0,
              },
              receiver: { isActive: true },
              children: [
                new Config({
                  name: 'Node-2-1-1',
                  layout: 'col',
                  initialData: {
                    data: { message: 'Initial message' },
                    timeoutMS: 0,
                  },
                  receiver: { isActive: true },
                }),
              ],
            }),
            new Config({
              name: 'Node-2-2',
              layout: 'col',
              initialData: {
                data: { message: 'Initial message' },
                timeoutMS: 0,
              },
              receiver: { isActive: true },
              children: [
                new Config({
                  name: 'Node-2-2-1',
                  receiver: { isActive: true },
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }
}
