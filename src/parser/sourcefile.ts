import * as ts from "typescript";
import { Class } from "./class";

export class SourceFile {
  public static create(sourceFile: ts.SourceFile, typechecker: ts.TypeChecker) {
    return new SourceFile(sourceFile, typechecker);
  }

  private classes: Class[] = [];
  private imports: Array<{
    original: string,
    alias?: string,
    path?: string,
    module?: string,
  }> = [];

  constructor(private sourceFile: ts.SourceFile, private typechecker: ts.TypeChecker) {
    this.traverse(sourceFile);
  }

  public getClasses() {
    return this.classes;
  }

  private traverse(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      const cl = node as ts.ClassDeclaration;
      // if (cl.name && cl.heritageClauses) {
        // console.log(cl.name.text);
        // console.log(cl.heritageClauses.map((v) => v.getText()));
      // }
      this.classes.push(new Class(cl, this.typechecker));
    } else if (node.kind === ts.SyntaxKind.ImportDeclaration) {
      const impn = node as ts.ImportDeclaration;
      // Path: console.log(imp.moduleSpecifier.getText());
      // console.log(impn.getText());
    } else if (node.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
      const impn = node as ts.ImportEqualsDeclaration;
      // Path console.log((impn.moduleReference as ts.ExternalModuleReference).expression);
    }
    ts.forEachChild(node, this.traverse.bind(this));
  }
}
