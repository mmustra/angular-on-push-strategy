import { Observable } from 'rxjs';

export function fromMutation(
  target: Node,
  options: MutationObserverInit
): Observable<readonly MutationRecord[]> {
  return new Observable((observer) => {
    const mutationObserver = new MutationObserver((mutations) => {
      observer.next(mutations);
    });

    mutationObserver.observe(target, options);

    return () => {
      mutationObserver.disconnect();
    };
  });
}
