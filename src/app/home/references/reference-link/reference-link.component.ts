import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mm-reference-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reference-link.component.html',
  styleUrls: ['./reference-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceLinkComponent {
  @Input() author: string;
  @Input({ required: true }) title: string;
  @Input({ required: true }) linkUrl: string;
  @Input() linkName: string;

  constructor() {
    this.author = '';
    this.title = '';
    this.linkUrl = '';
    this.linkName = 'link';
  }
}

export interface ReferenceLink {
  author?: string;
  title: string;
  linkUrl: string;
  linkName?: string;
}
