import * as ts from "typescript";
import { IType, Type } from "./type";

export interface IInterface {
  
}

export interface IDeclaration {
  name: string;
  type: Type;
  optional: boolean;
}

export enum EVisibility {
  NONE,
  PUBLIC,
  PRIVATE,
  PROTECTED,
}

export interface IVisibility {
  visibility: EVisibility;
}

export interface IClass {
  name: string;
  inherits?: IClass;
  implements: IInterface[];
  members: Array<IDeclaration & IVisibility>;
  file: string;
}

export class Class implements IClass {
  public members: Array<IDeclaration & IVisibility> = [];
  public file: string;
  public inherits?: IClass;
  public implements: IInterface[] = [];
  public name: string;
  /**
   * Anonymous class
   */
  public anon: boolean;

  constructor(private cl: ts.ClassDeclaration, private typechecker: ts.TypeChecker) {
    this.traverse(cl);
  }

  public getId() {
    return this.cl.getSourceFile().fileName + "#" + this.name;
  }

  public getName() {
    return this.name;
  }

  public getAbsolutePath() {
    return this.cl.getSourceFile().fileName;
  }

  public toJSONString() {
    return `{
      constructor: ${this.name}
    }`;
  }

  public toMetadataArray() {
    let body = "";
    this.members.forEach((member) => {
      body += `${member.name}: {type: ${member.type.stringify()}, visibility: ${member.visibility}, optional: ${member.optional}},`;
    });
    return [{
      name: "atm:body",
      value: `{${body}}`,
    }];
  }

  private traverse(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.ClassDeclaration || node.kind === ts.SyntaxKind.InterfaceDeclaration) {
      const cl = node as ts.InterfaceDeclaration;
      if (cl.name) {
        this.name = cl.name.getText();
        this.anon = false;
      } else {
        this.anon = true;
        return;
      }
      if (cl.heritageClauses) {
        // For each heritage clause
        cl.heritageClauses.forEach((heritageClause) => {
          // Of this type
          const isImplements = heritageClause.token === ts.SyntaxKind.ImplementsKeyword;

          // For each type in clause
          heritageClause.types.forEach((types) => {
            const symbol = this.typechecker.getSymbolAtLocation(types.expression) as ts.Symbol;
            const type = this.typechecker.getTypeOfSymbolAtLocation(symbol, types.expression);
            const decls = symbol.getDeclarations() as ts.Declaration[];

            // Get declaration
            decls.forEach((vclass: ts.ClassDeclaration) => {
              if (!vclass.name) {
                // TODO: do something with anonclass extensions:
              } else {
                if (!isImplements) {
                  this.inherits = new Class(vclass, this.typechecker);
                }
              }
            });
          });
        });
      }
    } else if (node.kind === ts.SyntaxKind.PropertyDeclaration) {
      const member = {} as IDeclaration & IVisibility;
      const prop = node as ts.PropertyDeclaration;
      member.visibility = EVisibility.PROTECTED;
      member.optional = prop.questionToken !== undefined;
      if (prop.modifiers) {
        prop.modifiers.forEach((element) => {
          if (element.kind === ts.SyntaxKind.PublicKeyword) {
            member.visibility = EVisibility.PUBLIC;
          } else if (element.kind === ts.SyntaxKind.PrivateKeyword) {
            member.visibility = EVisibility.PRIVATE;
          }
        });
      }
      member.name = prop.name.getText();
      // TODO: Use a better form of obtaining the type
      member.type = new Type(prop.type || prop.name, this.typechecker);
      this.members.push(member);
    } else if (node.kind === ts.SyntaxKind.Constructor) {
      const constructor = node as ts.ConstructorDeclaration;
      constructor.parameters.forEach((parameter) => {
        if (parameter.modifiers) {
          let visibility = EVisibility.NONE;
          parameter.modifiers.forEach((modifier) => {
            if (modifier.kind === ts.SyntaxKind.PrivateKeyword) {
              visibility = EVisibility.PRIVATE;
            } else if (modifier.kind === ts.SyntaxKind.PublicKeyword) {
              visibility = EVisibility.PUBLIC;
            } else if (modifier.kind === ts.SyntaxKind.ProtectedKeyword) {
              visibility = EVisibility.PROTECTED;
            }
          });
          if (visibility !== EVisibility.NONE) {
            this.members.push({
              visibility,
              name: parameter.name.getText(),
              type: new Type(parameter.type || parameter.name, this.typechecker),
              optional: parameter.questionToken !== undefined,
            });
          }
        }
      });
    } else if (node.kind === ts.SyntaxKind.MethodDeclaration) {
      // TODO: do something with methods.
      // const method = node as ts.MethodDeclaration;
      // let visibility = ts.ModifierFlags.Private;
      // if (method.modifiers) {
      //   method.modifiers.forEach((element) => {
      //     if (element.kind === ts.SyntaxKind.PublicKeyword) {
      //       visibility = ts.ModifierFlags.Public;
      //     } else if (element.kind === ts.SyntaxKind.PrivateKeyword) {
      //       visibility = ts.ModifierFlags.Private;
      //     }
      //   });
      // }

      // const parameters = [] as Serial.UMLClassProperty[];

      // method.parameters.forEach((el) => {
      //   parameters.push({
      //     name: (el.name ? el.name.getText() : ""),
      //     type: (el.type ? el.type.getText() : ""),
      //     default: (el.initializer ? el.getText() : undefined),
      //   });
      // });

      // const signature = this.typechecker.getSignatureFromDeclaration(method) as ts.Signature;
      // const type = this.typechecker.getReturnTypeOfSignature(signature);
      // const stringType = this.typechecker.typeToString(type);

      // // TODO: use visibility
      // if (visibility as ts.ModifierFlags === ts.ModifierFlags.Public) {
      //   this.methods.push({
      //     name: method.name.getText(),
      //     type: (stringType === "void" ? "" : stringType),
      //     arguments: parameters,
      //   });
      // }
    }
    ts.forEachChild(node, this.traverse.bind(this));
  }
}
