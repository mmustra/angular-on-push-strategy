import { ToolbarModule } from 'primeng/toolbar';
import { Observable, ReplaySubject } from 'rxjs';

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Input,
  Self,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeleportModule } from '@ngneat/overview';

import { PayloadService } from '../../services/payload.service';
import { CardComponent } from '../card/card.component';
import { Config } from '../config/config.component';
import { AnimationSpeedComponent } from './animation-speed/animation-speed.component';
import { ReloadComponent } from './reload/reload.component';

@Component({
  selector: 'mm-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css'],
  providers: [PayloadService],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToolbarModule,
    TeleportModule,
    AnimationSpeedComponent,
    ReloadComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContainerComponent implements AfterViewInit {
  @Input() config: Config;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  componentRef: ComponentRef<any>;
  container$: Observable<HTMLElement>;

  private containerSource$: ReplaySubject<HTMLElement>;

  constructor(@Self() private payloadService: PayloadService) {
    this.componentRef = null;
    this.containerSource$ = new ReplaySubject(1);
    this.container$ = this.containerSource$.asObservable();
  }

  ngAfterViewInit(): void {
    this.createComponent();
  }

  createComponent = (): void => {
    this.componentRef = this.container.createComponent(CardComponent);
    this.componentRef.instance.config = this.config;
    this.componentRef.changeDetectorRef.detectChanges();
    const element = this.componentRef.location.nativeElement.firstChild;
    this.containerSource$.next(element);
  };

  destroyComponent = (): void => {
    this.componentRef.destroy();
    this.payloadService.reset();
  };
}
