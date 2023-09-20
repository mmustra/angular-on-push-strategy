import { baseStyler, Styler } from './base-styler';

export function renderStyler(): Styler {
  return baseStyler((element) => {
    element.style.border = '1px solid rgb(255, 255, 0)';
    element.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
    element.style.boxShadow = 'inset 0px 0px 5px 0px rgb(255, 255, 0, 0.5)';
  });
}
