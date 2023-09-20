import { baseStyler, Styler } from './base-styler';

export function destroyStyler(): Styler {
  return baseStyler(
    (element) => {
      element.style.filter = 'blur(1rem)';
      element.style.pointerEvents = 'none';
    },
    (element, revertStyle) => {
      const currentOpacity = element.style.opacity;
      element.style.opacity = '0';

      revertStyle(() => {
        element.style.opacity = currentOpacity;
      });
    }
  );
}
