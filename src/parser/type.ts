import * as ts from "typescript";
import { Interface } from "./interface";

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
  private body?: Interface;
  private primitive?: string;
  private generics?: Type[];
  private path?: string;
  private optional = false;

  constructor(private tnode: ts.TypeNode | ts.BindingName | ts.PropertyName, private typechecker: ts.TypeChecker) {
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
      (this.body ? ",body: " + this.body.stringify() : "") +
      (this.generics && this.generics.length ? ",generics: [" + this.generics.map((v) => v.stringify()).reduce((a, b) => a + "," + b) + "]" : "") +
      "}";
  }

  private traverse(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.ArrayType) {
      const anode = node as ts.ArrayTypeNode;
      this.kind = ETypes.CLASS;
      this.ctor = "Array";
      this.generics = [new Type(anode.elementType, this.typechecker)];
    } else if (node.kind === ts.SyntaxKind.TypeReference) {
      const anode = node as ts.TypeReferenceNode;
      const type = this.typechecker.getTypeAtLocation(anode);
      const symbol = type.symbol || type.aliasSymbol;
      if (type && symbol) {
        const decls = symbol.getDeclarations() as ts.Declaration[];
        // TODO: parse all declarations, not only the first
        const decl = decls[0];
        if (decl.kind === ts.SyntaxKind.EnumDeclaration) {
          this.kind = ETypes.PRIMITIVE;
          this.primitive = "number";
        } else if (decl.kind === ts.SyntaxKind.ClassDeclaration) {
          this.kind = ETypes.CLASS;
          this.ctor = anode.getText();
          this.path = decl.getSourceFile().fileName;
        } else if (decl.kind === ts.SyntaxKind.InterfaceDeclaration) {
          this.kind = ETypes.INTERFACE;
          this.body = new Interface(decl as ts.InterfaceDeclaration, this.typechecker);
        } else if (decl.kind === ts.SyntaxKind.TypeAliasDeclaration) {
          const alias = decl as ts.TypeAliasDeclaration;
          this.traverse(alias.type);
        } else {
          console.error(decl.kind);
        }
      } else {
        throw new Error("This AST contains a TypeReference without declaration");
      }
    } else if (node.kind === ts.SyntaxKind.StringKeyword) {
      this.kind = ETypes.PRIMITIVE;
      this.primitive = "string";
    } else if (node.kind === ts.SyntaxKind.BooleanKeyword) {
      this.kind = ETypes.PRIMITIVE;
      this.primitive = "boolean";
    } else if (node.kind === ts.SyntaxKind.AnyKeyword) {
      this.kind = ETypes.PRIMITIVE;
      this.primitive = "any";
    } else if (node.kind === ts.SyntaxKind.NumberKeyword) {
      this.kind = ETypes.PRIMITIVE;
      this.primitive = "number";
    } else if (node.kind === ts.SyntaxKind.UndefinedKeyword) {
      this.kind = ETypes.PRIMITIVE;
      this.primitive = "undefined";
    } else if (node.kind === ts.SyntaxKind.NullKeyword) {
      this.kind = ETypes.PRIMITIVE;
      this.primitive = "null";
    } else if (node.kind === ts.SyntaxKind.ObjectKeyword) {
      this.kind = ETypes.PRIMITIVE;
      this.primitive = "object";
    } else if (node.kind === ts.SyntaxKind.TypeLiteral) {
      this.kind = ETypes.INTERFACE;
      this.body = new Interface(node as ts.TypeLiteralNode, this.typechecker);
    } else if (node.kind === ts.SyntaxKind.Identifier) {
      const type = this.typechecker.getTypeAtLocation(node) as ts.Type & { intrinsicName?: string };
      const symbol = type.symbol || type.aliasSymbol;
      if (type && symbol) {
        const decls = symbol.getDeclarations() as ts.Declaration[];
        // TODO: parse all declarations, not only the first
        const decl = decls[0];
        if (decl.kind === ts.SyntaxKind.EnumDeclaration) {
          this.kind = ETypes.PRIMITIVE;
          this.primitive = "number";
        } else if (decl.kind === ts.SyntaxKind.ClassDeclaration) {
          this.kind = ETypes.CLASS;
          this.ctor = node.getText();
          this.path = decl.getSourceFile().fileName;
        } else if (decl.kind === ts.SyntaxKind.InterfaceDeclaration) {
          this.kind = ETypes.INTERFACE;
          this.body = new Interface(decl as ts.InterfaceDeclaration, this.typechecker);
        } else if (decl.kind === ts.SyntaxKind.TypeAliasDeclaration) {
          const alias = decl as ts.TypeAliasDeclaration;
          this.traverse(alias.type);
        } else {
          console.error(decl.kind);
        }
      } else if (type.intrinsicName) {
        this.kind = ETypes.PRIMITIVE;
        this.primitive = type.intrinsicName;
      } else {
        throw new Error("This AST contains a TypeReference without declaration");
      }
    } else if (node.kind === ts.SyntaxKind.UnionType) {
      const union = node as ts.UnionTypeNode;
      this.kind = ETypes.UNION;
      this.and = false;
      this.left = new Type(union.types[0], this.typechecker);
      this.right = new Type(union.types[1], this.typechecker);
    } else {
      console.error(node.kind);
    }
  }
}
