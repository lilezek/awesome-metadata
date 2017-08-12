import * as ts from "typescript";

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
  generics?: IType[];
}

export interface IUnionType extends IType {
  kind: ETypes.UNION;
  /**
   * If true, the union type is an AND type. Otherwise, its an OR union type.
   */
  and: boolean;

  left: IType;
  right: IType;
}

export interface IPrimitiveType extends IType {
  kind: ETypes.PRIMITIVE;
  primitive: string;
}

export interface IInterfaceType extends IGenericType {
  kind: ETypes.INTERFACE;
  body: {
    [key: string]: IType;
  };
}

export interface IClassType extends IGenericType {
  kind: ETypes.CLASS;
  ctor: string;
  path?: string;
}

export type anyType = IClassType | IInterfaceType | IPrimitiveType | IUnionType;

function map<T, V>(obj: { [key: string]: T }, fn: (key: string | number, value: T) => V): {
  [key: string]: V;
} {
  const result = {} as { [key: string]: V; };
  for (const k in obj) {
    result[k] = fn(k, obj[k]);
  }
  return result;
}

export class Type {
  private kind: ETypes;
  private ctor?: string;
  private and?: boolean;
  private left?: Type;
  private right?: Type;
  private body?: {
    [key: string]: Type;
  };
  private primitive?: string;
  private generics?: Type[];
  private path?: string;

  constructor(private tnode: ts.TypeNode | undefined, private typechecker: ts.TypeChecker) {
    this.traverse(tnode);
  }

  public toType() {
    return {
      kind: this.kind,
      ctor: this.ctor,
      and: this.and,
      left: this.left,
      right: this.right,
      body: this.body,
      primitive: this.primitive,
      generics: this.generics,
    };
  }

  public stringify(): string {
    return "{" +
      "kind:" + this.kind +
      (this.ctor ? ",ctor:" + this.ctor : "") +
      (this.and ? ",and:" + this.and : "") +
      (this.left ? ",left:" + this.left.stringify() : "") +
      (this.right ? ",right:" + this.right.stringify() : "") +
      (this.primitive ? ",primitive: \"" + this.primitive + "\"" : "") +
      (this.generics && this.generics.length ? ",generics: [" + this.generics.map((v) => v.stringify()).reduce((a, b) => a + "," + b) + "]" : "") +
    "}";
    // TODO: Add body
    // ${this.body ? ",body:" + map(this.body, (key, value) => value.stringify()) : ""},
  }

  private traverse(node?: ts.Node) {
    if (!node) {
      this.kind = ETypes.PRIMITIVE;
      this.primitive = "any";
    } else if (node.kind === ts.SyntaxKind.ArrayType) {
      const anode = node as ts.ArrayTypeNode;
      this.kind = ETypes.CLASS;
      this.ctor = "Array";
      this.generics = [new Type(anode.elementType, this.typechecker)];
    } else if (node.kind === ts.SyntaxKind.TypeReference) {
      const anode = node as ts.TypeReferenceNode;
      // TODO: Extract path of reference
      this.path = "";
      // TODO: Check if it is either a class or interface
      this.kind = ETypes.CLASS;
      // TODO: Do not use getText, resolve the type instead.
      this.ctor = anode.typeName.getText();
    }
  }

}
