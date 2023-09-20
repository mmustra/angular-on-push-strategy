export function isChildOfParent(
  child: HTMLElement,
  parent: HTMLElement,
  attributeBreak?: string
): boolean {
  let isSuccess = false;
  let attributeCount = 0;

  while (child) {
    if (attributeBreak && child.attributes.getNamedItem(attributeBreak)) {
      ++attributeCount;

      if (attributeCount > 1) {
        break;
      }
    }

    if (child === parent) {
      isSuccess = true;
      break;
    }

    child = child.parentElement;
  }

  return isSuccess;
}
