export abstract class Parsed<T> {
  protected internal: T;
  constructor(toParse: T) {
    this.internal = toParse;
  }

  public getInternal(): T {
    return this.internal;
  }
}
