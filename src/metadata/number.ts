import { MetadataLiteral } from "./literal";

export class MetadataNumber extends MetadataLiteral {
  constructor(n: number) {
    super("" + n);
  }
}
