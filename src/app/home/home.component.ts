import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LegendComponent } from './legend/legend.component';
import { ReferencesComponent } from './references/references.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LegendComponent, ReferencesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
