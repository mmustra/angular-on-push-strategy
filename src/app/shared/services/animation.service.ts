import { map } from 'lodash-es';
import {
  concatMap,
  delay,
  finalize,
  forkJoin,
  Observable,
  of,
  startWith,
  Subject,
  Subscriber,
  switchMap,
  take,
  tap,
} from 'rxjs';

import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  StyleFactoryService,
  StyleType,
} from '../factories/style-factory.service';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private playerSource$: Subject<void>;
  private optionsSource$: Subject<void>;
  private queueSource$: Subject<AnimationQueue>;
  private _speed: AnimationSpeed;
  private _isVisible: boolean;

  constructor(private destroyRef: DestroyRef) {
    this._speed = AnimationSpeed.Normal;
    this._isVisible = true;
    this.playerSource$ = new Subject();
    this.optionsSource$ = new Subject();
    this.queueSource$ = new Subject();

    this.watchAnimation();
  }

  get speed(): AnimationSpeed {
    return this._speed;
  }

  get isVisible(): boolean {
    return this._isVisible;
  }

  animate$(animation: AnimationData): Observable<HTMLElement> {
    return new Observable((subscriber) =>
      this.queueSource$.next({ animation, subscriber })
    );
  }

  animateMultiple$(animations: AnimationData[]): Observable<HTMLElement[]> {
    const animationObservables = map(animations, (animation) =>
      this.animate$(animation)
    );

    return forkJoin(animationObservables);
  }

  reset(): void {
    this.playerSource$.next();
  }

  changeSpeed(speed: AnimationSpeed): void {
    this._speed = speed;
    this.optionsSource$.next();
  }

  changeVisibility(isVisible: boolean): void {
    this._isVisible = isVisible;
    this.optionsSource$.next();
  }

  private watchAnimation(): void {
    const player$ = this.playerSource$.asObservable().pipe(startWith(null));
    const options$ = this.optionsSource$.asObservable().pipe(startWith(null));
    const queue$ = this.queueSource$.asObservable().pipe(
      concatMap(({ animation, subscriber }) =>
        options$.pipe(
          switchMap(() => this.animateElement$(animation)),
          take(1),
          tap(subscriber)
        )
      )
    );

    player$
      .pipe(
        switchMap(() => queue$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private animateElement$({
    element,
    type,
    customSpeed,
  }: AnimationData): Observable<HTMLElement> {
    const styleType = type as unknown as StyleType;
    const delayTime = customSpeed ? customSpeed : this._speed;
    const { setStyle, revertStyle } =
      StyleFactoryService.createStyler(styleType);

    return of(element).pipe(
      tap(() => {
        if (this.isVisible) {
          setStyle(element, delayTime);
        }
      }),
      delay(delayTime),
      tap(() => revertStyle(element, delayTime)),
      delay(delayTime),
      finalize(() => revertStyle(element))
    );
  }
}

export enum AnimationSpeed {
  Slow = 400,
  Normal = 200,
  Fast = 100,
}

export enum AnimationType {
  Check,
  Changes,
  Render,
  Destroy,
}

interface AnimationData {
  element: HTMLElement;
  type: AnimationType;
  customSpeed?: number;
}

interface AnimationQueue {
  animation: AnimationData;
  subscriber: Subscriber<HTMLElement>;
}
