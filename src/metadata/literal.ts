import { Metadata } from "./metadata";

export class MetadataLiteral extends Metadata {
  constructor(private internal: string) {
    super();
  }

  public toJavascript(): string {
    return this.internal;
  }
}
