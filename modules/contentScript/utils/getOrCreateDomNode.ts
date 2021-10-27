type TagNames = keyof HTMLElementTagNameMap;

export function getOrCreateDomNodeWithId<Element extends TagNames>(
  id: string,
  el: Element,
  parent: HTMLElement,
) {
  let element: HTMLElement | null = parent.querySelector(`#${id}`);

  if (!element) {
    element = document.createElement(el);
    element.id = id;
    parent.appendChild(element);
  }

  return element;
}
