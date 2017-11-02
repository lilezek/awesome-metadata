import { Metadata } from "./metadata";

export class MetadataArray<T> extends Metadata {
  private internal: T[];

  constructor() {
    super();
    this.internal = [];
  }

  public toJavascript(): string {
    const strings = ["["];
    for (const v of this.internal) {
      if (v instanceof Metadata) {
        strings.push(v.toJavascript());
      } else {
        strings.push(JSON.stringify(v));
      }
    }
    return strings.join(",") + "]";
  }

  public push(t: T) {
    return this.internal.push(t);
  }

  public get(i: number) {
    return this.internal[i];
  }

  public set(i: number, t: T) {
    this.internal[i] = t;
  }
}
