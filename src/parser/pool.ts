import { Identifiable } from "./identifiable";

export class AbstractPool<T extends Identifiable> {
  protected pool: Map<string, T> = new Map();

  public add(t: T) {
    this.pool.set(t.id, t);
    return this;
  }

  public find(s: string) {
    return this.pool.get(s) as T;
  }
}
