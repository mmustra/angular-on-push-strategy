import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  ReferenceLink,
  ReferenceLinkComponent,
} from './reference-link/reference-link.component';

@Component({
  selector: 'mm-references',
  standalone: true,
  imports: [CommonModule, ReferenceLinkComponent],
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferencesComponent {
  references: ReferenceLink[];

  constructor() {
    this.references = [
      {
        author: 'Angular',
        title: 'Unidirectional data flow',
        linkUrl: 'https://angular.io/guide/glossary#unidirectional-data-flow',
      },
      {
        author: 'Angular',
        title: 'View hierarchy',
        linkUrl: 'https://angular.io/guide/glossary#view-hierarchy',
      },
      {
        author: 'Deepak Pandey',
        title: 'Understanding Angular Views',
        linkUrl:
          'https://javascript.plainenglish.io/views-in-angular-390c3906b988',
      },
      {
        author: 'Angular',
        title: 'Change detection',
        linkUrl: 'https://angular.io/guide/glossary#change-detection',
      },
      {
        author: 'Netanel Basal',
        title: 'Guide to Angular onPush Change Detection',
        linkUrl:
          'https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4',
      },
    ];
  }
}
