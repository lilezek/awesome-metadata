import { Metadata } from "./metadata";

export class MetadataObject extends Metadata {
  constructor(private internal: any) {
    super();
  }

  public toJavascript(): string {
    const strings = [];
    for (const k in this.internal) {
      if (this.internal.hasOwnProperty(k)) {
        const v = this.internal[k];
        if (v instanceof Metadata) {
          strings.push(v.toJavascript());
        } else {
          strings.push(JSON.stringify(v));
        }
      }
    }
    return strings.join("");
  }

}
