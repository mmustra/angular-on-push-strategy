import { finalize, Observable, share } from 'rxjs';

import { Injectable } from '@angular/core';

import { fromMutation } from '../utils/mutation-observer';

@Injectable({ providedIn: 'root' })
export class DomService {
  private layoutChanges$: Observable<readonly MutationRecord[]>;

  constructor() {
    this.layoutChanges$ = null;
  }

  fromLayoutChanges$(): Observable<readonly MutationRecord[]> {
    if (this.layoutChanges$) {
      return this.layoutChanges$;
    }

    const bodyMutations$ = fromMutation(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['data-message'],
    });

    this.layoutChanges$ = bodyMutations$.pipe(
      finalize(() => (this.layoutChanges$ = null)),
      share()
    );

    return this.layoutChanges$;
  }
}
