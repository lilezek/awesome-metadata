import { Metadata } from "./metadata";

export class MetadataObject extends Metadata {
  constructor(protected internal: any) {
    super();
  }

  public toJavascript(): string {
    return this.pToJavascript(this.internal);
  }

  private pToJavascript(x: any): string {
    const strings = ["{"];
    let first = true;
    for (const k in x) {
      if (!first) {
        strings.push(",");
      }
      first = false;
      strings.push(k);
      strings.push(":");
      if (x.hasOwnProperty(k)) {
        const v = x[k];
        if (v instanceof Metadata) {
          strings.push(v.toJavascript());
        } else {
          strings.push(JSON.stringify(v));
        }
      }

    }
    strings.push("}");
    return strings.join("");
  }
}
