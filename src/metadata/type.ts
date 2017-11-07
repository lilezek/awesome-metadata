import { Symbol as AstSymbol, Type } from "ts-simple-ast";
import * as ts from "typescript";
import { MetadataArray } from "./array";
import { BodyMember } from "./body";
import { MetadataLiteral } from "./literal";
import { MetadataObject } from "./object";
import { MetadataString } from "./string";

export enum ETypes {
  PRIMITIVE,
  INTERFACE,
  CLASS,
  UNION,
}

export interface IType {
  kind: ETypes;
}

export interface IGenericType extends IType {
  generics?: MetadataArray<MetadataType>;
}

export interface IUnionType extends IType {
  kind: ETypes.UNION;
  /**
   * If true, the union type is an AND type. Otherwise, its an OR union type.
   */
  and: boolean;

  left: MetadataType;
  right: MetadataType;
}

export interface IPrimitiveType extends IType {
  kind: ETypes.PRIMITIVE;
  primitive: MetadataString;
}

/**
 * This represents a type which might be anon.
 */
export interface ILiteralType extends IGenericType {
  kind: ETypes.INTERFACE;
  body: {
    [key: string]: BodyMember;
  };
}

export interface IClassType extends IGenericType {
  kind: ETypes.CLASS;
  ctor: MetadataLiteral;
}

export type anyType = (IClassType | ILiteralType | IPrimitiveType | IUnionType);

function TypeIsClass(type: Type) {
  // TODO: This function fails for classes like Map.
  if (type.getObjectFlags() & ts.ObjectFlags.Class) {
    return true;
  } else {
    if (type.getConstructSignatures().length > 0) {
      return true;
    } else {
      const symbol = type.getSymbol();
      if (symbol) {
        if (symbol.getDeclarations().some((d) => d.getKind() === ts.SyntaxKind.ClassDeclaration)) {
          return true;
        }
      }
    }
  }
  return false;
}

export class MetadataType extends MetadataObject {
  protected internal: anyType;

  constructor(type: Type) {
    super({});
    if (type.isAnonymousType()) {
      // TODO: Process this anonymous type.
      this.internal.kind = ETypes.INTERFACE;
    } else if (type.isArrayType()) {
      const classType = this.internal as IClassType;
      classType.kind = ETypes.CLASS;
      classType.ctor = new MetadataLiteral("Array");
      classType.generics = new MetadataArray(type.getTypeArguments().map((t) => new MetadataType(t)));
    } else if (type.isEnumType()) {
      const primitiveType = this.internal as IPrimitiveType;
      primitiveType.kind = ETypes.PRIMITIVE;
      // TODO: Enumerations might be strings with latest TypeScript versions.
      primitiveType.primitive = new MetadataString("number");
    } else if (type.isBooleanType()) {
      const primitiveType = this.internal as IPrimitiveType;
      primitiveType.kind = ETypes.PRIMITIVE;
      primitiveType.primitive = new MetadataString("boolean");
    } else if (type.isUndefinedType()) {
      const primitiveType = this.internal as IPrimitiveType;
      primitiveType.kind = ETypes.PRIMITIVE;
      primitiveType.primitive = new MetadataString("undefined");
    } else if (type.isUnionType()) {
      const unionType = this.internal as IUnionType;
      unionType.kind = ETypes.UNION;
      unionType.and = false;
      unionType.left = new MetadataType(type.getUnionTypes()[0]);
      unionType.right = new MetadataType(type.getUnionTypes()[1]);
    } else if (type.isIntersectionType()) {
      const unionType = this.internal as IUnionType;
      unionType.kind = ETypes.UNION;
      unionType.and = true;
      unionType.left = new MetadataType(type.getIntersectionTypes()[0]);
      unionType.right = new MetadataType(type.getIntersectionTypes()[1]);
    } else if (type.isObjectType()) {
      const objectFlags = type.getObjectFlags();
      if (TypeIsClass(type)) {
        const classType = this.internal as IClassType;
        classType.kind = ETypes.CLASS;
        classType.ctor = new MetadataLiteral((type.getSymbol() as AstSymbol).getName());
        classType.generics = new MetadataArray(type.getTypeArguments().map((t) => new MetadataType(t)));
      } else if (objectFlags & ts.ObjectFlags.Interface) {
        // TODO: Interface marshalling not trivial an not implemented yet.
        const interfaceType = this.internal as ILiteralType;
        interfaceType.kind = ETypes.INTERFACE;
        interfaceType.generics = new MetadataArray();
        interfaceType.body = {};
      } else {
        console.log("Constructors: " + type.getConstructSignatures().length);
        console.log("Object not parsed: " + objectFlags);
        console.log("Object's name: " + (type.getSymbol() as AstSymbol).getName());
      }
    } else if (type.getFlags() & ts.TypeFlags.Any) {
      const primitiveType = this.internal as IPrimitiveType;
      primitiveType.kind = ETypes.PRIMITIVE;
      primitiveType.primitive = new MetadataString("any");
    } else if (type.getFlags() & ts.TypeFlags.String) {
      const primitiveType = this.internal as IPrimitiveType;
      primitiveType.kind = ETypes.PRIMITIVE;
      primitiveType.primitive = new MetadataString("string");
    } else if (type.getFlags() & ts.TypeFlags.Number) {
      const primitiveType = this.internal as IPrimitiveType;
      primitiveType.kind = ETypes.PRIMITIVE;
      primitiveType.primitive = new MetadataString("number");
    } else {
      console.log("Type not parsed: " + type.getFlags());
    }
  }
}
