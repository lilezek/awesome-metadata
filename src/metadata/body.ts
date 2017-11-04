import { MetadataLiteral } from "./literal";
import { MetadataObject } from "./object";
import { MetadataString } from "./string";
import { IClassType, ILiteralType, IPrimitiveType, IUnionType, MetadataType } from "./type";

export enum EVisibility {
  NONE,
  PUBLIC,
  PRIVATE,
  PROTECTED,
}

export interface IVisibility {
  visibility: EVisibility;
}

export interface IOptionality {
  optional: boolean;
}

export type BodyMember = MetadataType & IVisibility & IOptionality;

/**
 * In order to use this metadata, just define the body member.
 */
export class MetadataBody extends MetadataObject {
  public body: { [key: string]: BodyMember };

  constructor() {
    super({});
    this.body = {};
  }

  public toJavascript() {
    this.internal = this.body;
    return super.toJavascript();
  }
}
