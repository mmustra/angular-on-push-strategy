import {
  SelectButtonChangeEvent,
  SelectButtonModule,
} from 'primeng/selectbutton';
import {
  ToggleButtonChangeEvent,
  ToggleButtonModule,
} from 'primeng/togglebutton';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  AnimationService,
  AnimationSpeed,
} from '../../../services/animation.service';

@Component({
  selector: 'mm-animation-speed',
  templateUrl: './animation-speed.component.html',
  styleUrls: ['./animation-speed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, SelectButtonModule, ToggleButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimationSpeedComponent {
  isAnimationVisible: boolean;
  selectedAnimationOption: boolean | AnimationSpeed;
  animationOptions: AnimationOption[];

  constructor(private animationService: AnimationService) {
    this.selectedAnimationOption = this.animationService.speed;
    this.isAnimationVisible = this.animationService.isVisible;
    this.animationOptions = [
      { name: '0.5x', value: AnimationSpeed.Slow },
      { name: '1x', value: AnimationSpeed.Normal },
      { name: '2x', value: AnimationSpeed.Fast },
    ];
  }

  changeSpeed({ value }: SelectButtonChangeEvent): void {
    this.animationService.changeSpeed(value);
  }

  changeVisibility({ checked }: ToggleButtonChangeEvent): void {
    this.animationService.changeVisibility(checked);
  }
}

interface AnimationOption {
  name: string;
  value: boolean | AnimationSpeed;
}
