import { Styler } from './variants/base-styler';
import { changesStyler } from './variants/changes-styler';
import { checkStyler } from './variants/check-styler';
import { destroyStyler } from './variants/destroy-styler';
import { renderStyler } from './variants/render-styler';

export class StyleFactoryService {
  static createStyler(type: StyleType): Styler {
    let styler = null;

    switch (type) {
      case StyleType.Check: {
        styler = checkStyler();
        break;
      }
      case StyleType.Changes: {
        styler = changesStyler();
        break;
      }
      case StyleType.Render: {
        styler = renderStyler();
        break;
      }
      case StyleType.Destroy: {
        styler = destroyStyler();
        break;
      }
      default: {
        throw new Error(`Unknown style type: ${type}`);
      }
    }

    return styler;
  }
}

export enum StyleType {
  Check,
  Changes,
  Render,
  Destroy,
}
