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
      this.classes.push(new Class(cl, this.typechecker));
    } else if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
      // TODO: Do something with interfaces.
    }
    ts.forEachChild(node, this.traverse.bind(this));
  }
}
