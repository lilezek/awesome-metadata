import { MetadataLiteral } from "./literal";

export class MetadataString extends MetadataLiteral {
  constructor(s: string) {
    // TODO: Does this escapes correctly?
    super(`"${s.replace(`"`, `\"`)})}"`);
  }
}
