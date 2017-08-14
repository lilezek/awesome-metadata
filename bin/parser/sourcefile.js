"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const class_1 = require("./class");
class SourceFile {
    constructor(sourceFile, typechecker) {
        this.sourceFile = sourceFile;
        this.typechecker = typechecker;
        this.classes = [];
        this.imports = [];
        this.traverse(sourceFile);
    }
    static create(sourceFile, typechecker) {
        return new SourceFile(sourceFile, typechecker);
    }
    getClasses() {
        return this.classes;
    }
    traverse(node) {
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            const cl = node;
            this.classes.push(new class_1.Class(cl, this.typechecker));
        }
        else if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
            // TODO: Do something with interfaces.
        }
        ts.forEachChild(node, this.traverse.bind(this));
    }
}
exports.SourceFile = SourceFile;
//# sourceMappingURL=sourcefile.js.map