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
            // if (cl.name && cl.heritageClauses) {
            // console.log(cl.name.text);
            // console.log(cl.heritageClauses.map((v) => v.getText()));
            // }
            this.classes.push(new class_1.Class(cl, this.typechecker));
        }
        else if (node.kind === ts.SyntaxKind.ImportDeclaration) {
            const impn = node;
            // Path: console.log(imp.moduleSpecifier.getText());
            // console.log(impn.getText());
        }
        else if (node.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
            const impn = node;
            // Path console.log((impn.moduleReference as ts.ExternalModuleReference).expression);
        }
        ts.forEachChild(node, this.traverse.bind(this));
    }
}
exports.SourceFile = SourceFile;
//# sourceMappingURL=sourcefile.js.map