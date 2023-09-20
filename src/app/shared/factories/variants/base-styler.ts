import {
  flow,
  forEach,
  includes,
  isNumber,
  merge,
  noop,
  partialRight,
  reduce,
  split,
  trim,
} from 'lodash-es';

export function baseStyler(
  baseSetStyle: BaseSetHandler,
  baseRevertStyle?: BaseRevertHandler
): Styler {
  const state: StyleState = new StyleState();

  return {
    setStyle: (element, transitionMS): void => {
      tryClearTimer(state);

      if (!element?.style) {
        return;
      }

      saveStyles(StyleType.Old, element, state);

      if (isNumber(transitionMS)) {
        element.style.transition = `${transitionMS}ms all`;
      }

      baseSetStyle(element);

      saveStyles(StyleType.New, element, state);
    },
    revertStyle: (element, transitionMS) => {
      tryClearTimer(state);

      if (!element?.style || !state.newStyle) {
        return;
      }

      if (isNumber(transitionMS)) {
        element.style.transition = `${transitionMS}ms all`;
      }

      const revertHandler: RevertHandler = getRevertHandler(
        element,
        state,
        transitionMS
      );

      if (baseRevertStyle) {
        baseRevertStyle(element, revertHandler);
      } else {
        revertHandler();
      }
    },
  };
}

function saveStyles(
  type: StyleType,
  element: HTMLElement,
  state: StyleState
): void {
  const style = mapStyleToObject(element.getAttribute('style'));

  if (type === StyleType.Old) {
    state.oldStyle = style;
  } else {
    state.newStyle = style;
  }
}

function revertStyles(
  element: HTMLElement,
  styleState: StyleState,
  exceptions?: string[]
): void {
  forEach(styleState.newStyle, (val, key) => {
    const isKeyException = includes(exceptions, key);
    if (isKeyException) {
      return;
    }

    const newVal = element.style[key];
    if (newVal && newVal === val) {
      const oldVal = styleState.oldStyle[key];
      element.style[key] = oldVal ?? '';
    }
  });
}

function getRevertHandler(
  element: HTMLElement,
  state: StyleState,
  transitionMS: number
): RevertHandler {
  return isNumber(transitionMS)
    ? (onDone = noop): void => {
        revertStyles(element, state, ['transition']);

        const cancelation = setTimeout(() => {
          element.style.transition = state.oldStyle.transition ?? '';

          merge(state, new StyleState());
          onDone();
        }, transitionMS);

        state.cancelation = cancelation;
      }
    : (onDone = noop): void => {
        element.style.transition = '';
        revertStyles(element, state);

        merge(state, new StyleState());
        onDone();
      };
}

function tryClearTimer(styleState: StyleState): void {
  const { cancelation } = styleState;

  if (cancelation) {
    clearTimeout(cancelation);
  }
}

function mapStyleToObject(style: string): Partial<CSSStyleDeclaration> {
  return flow(
    partialRight(split, ';'),
    partialRight(
      reduce,
      (acc, text) => {
        if (!trim(text)) {
          return acc;
        }

        const [key, val] = split(text, ':');
        acc[trim(key)] = trim(val);

        return acc;
      },
      {}
    )
  )(style);
}

export interface Styler {
  setStyle: StylerHandler;
  revertStyle: StylerHandler;
}

class StyleState {
  oldStyle: Partial<CSSStyleDeclaration>;
  newStyle: Partial<CSSStyleDeclaration>;
  cancelation: NodeJS.Timeout;

  constructor(state?: Partial<StyleState>) {
    this.oldStyle = state?.oldStyle ?? null;
    this.newStyle = state?.newStyle ?? null;
    this.cancelation = state?.cancelation ?? null;
  }
}

type BaseSetHandler = (element: HTMLElement) => void;
type BaseRevertHandler = (
  element: HTMLElement,
  revetStyle: RevertHandler
) => void;
type StylerHandler = (element: HTMLElement, transitionMS?: number) => void;
type RevertHandler = (onDone?: () => void) => void;

enum StyleType {
  Old,
  New,
}
