import { filter, map, Observable, ReplaySubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { Payload } from '../components/config/config.component';

@Injectable({
  providedIn: 'root',
})
export class PayloadService {
  private payloadSource$: ReplaySubject<PayloadDTO>;

  constructor() {
    this.payloadSource$ = new ReplaySubject(1);
  }

  listen$(cardName: string): Observable<Payload> {
    return this.payloadSource$.asObservable().pipe(
      filter((dto) => !!dto && dto.cardName === cardName),
      map(({ payload }) => payload)
    );
  }

  emit(cardName: string, payload: Payload): void {
    this.payloadSource$.next({ cardName, payload });
  }

  reset(): void {
    this.payloadSource$.next(null);
  }
}

interface PayloadDTO {
  cardName: string;
  payload: Payload;
}
