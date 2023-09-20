import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

import {
  StyleFactoryService,
  StyleType,
} from '../../../shared/factories/style-factory.service';

@Component({
  selector: 'mm-legend-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legend-item.component.html',
  styleUrls: ['./legend-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendItemComponent implements OnInit {
  @Input({ required: true }) style: StyleType;
  @Input() text: string;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;
    const container = element.querySelector<HTMLElement>('.card-container');

    const { setStyle } = StyleFactoryService.createStyler(this.style);

    setStyle(container);
  }
}
