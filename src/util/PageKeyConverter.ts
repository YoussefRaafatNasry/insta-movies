/**
 * Converts from a page's index to a key and vice versa.
 */
export class PageKeyConverter {
  constructor(public prefix: string) {}

  toKey(index: number): string {
    return `${this.prefix}${index}`;
  }

  toIndex(key: string): number {
    return parseInt(key.replace(this.prefix, ""));
  }
}
