import { ElementAttribute, DOMElement } from "../types/domElement";

const createElement = (
  tagName: string,
  attributes: ElementAttribute,
  value: Array<DOMElement> | string,
): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName);

  // Check whether property exist in attributes object or not
  Object.keys(attributes).forEach((prop) => {
    element[prop as keyof ElementAttribute] = attributes[prop as keyof ElementAttribute];
  });

  /**
   * Check whether value is a array or not
   * If array, loop and append all node in array
   */
  if (Array.isArray(value)) {
    value.map((item: HTMLElement) => element.append(item));
  } else element.innerHTML = value;

  return element;
};

export { createElement };