import * as ts from "typescript";
import { Type } from "./type";

export class Interface {
  public body: any = {};

  constructor(private inode: ts.InterfaceDeclaration | ts.TypeLiteralNode, private typechecker: ts.TypeChecker) {
    this.traverse(inode);
  }

  public stringify(): string {
    let members = "";
    for (const k in this.body) {
      members += k + ":" + this.body.stringifg();
    }
    return "{" + members + "}";
  }

  private traverse(node: ts.Node) {
    // BUG: infinite recursive loop when interfaces makes self-references.
    return;

    // if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
    //   const inode = node as ts.InterfaceDeclaration;
    //   inode.members.forEach((member) => {
    //     if (member.kind === ts.SyntaxKind.PropertySignature) {
    //       console.error(node.getText());
    //       const sign = member as ts.PropertySignature;
    //       this.body[sign.name.getText()] = new Type(sign.type || {kind: ts.SyntaxKind.AnyKeyword} as ts.KeywordTypeNode, this.typechecker);
    //     } else {
    //       console.error(member.kind);
    //     }
    //   });
    // }
  }
}
