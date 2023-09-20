import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { StyleType } from '../../shared/factories/style-factory.service';
import { LegendItemComponent } from './legend-item/legend-item.component';

@Component({
  selector: 'mm-legend',
  standalone: true,
  imports: [CommonModule, LegendItemComponent],
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent {
  StyleType = StyleType;

  agendaItems: AgendaItems[];

  constructor() {
    this.agendaItems = [
      {
        style: StyleType.Check,
        text: 'Indicates "DoCheck" cycle for component',
      },
      {
        style: StyleType.Changes,
        text: 'Indicates "OnChanges" cycle for component',
      },
      {
        style: StyleType.Render,
        text: 'Indicates "Render" for component',
      },
    ];
  }
}

interface AgendaItems {
  style: StyleType;
  text: string;
}
