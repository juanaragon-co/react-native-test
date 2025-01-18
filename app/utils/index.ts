interface Element {
  height: number;
}

export function sortElements(array: Element[]): Element[] {
  return array.sort((a, b) => b.height - a.height);
}

