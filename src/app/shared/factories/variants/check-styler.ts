import { baseStyler, Styler } from './base-styler';

export function checkStyler(): Styler {
  return baseStyler((element) => {
    element.style.border = '1px solid rgb(0, 97, 255)';
    element.style.boxShadow = 'inset 0px 0px 5px 0px rgb(0, 97, 255, 0.5)';
  });
}
