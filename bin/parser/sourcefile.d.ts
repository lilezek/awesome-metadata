import * as ts from "typescript";
export declare class SourceFile {
    private sourceFile;
    private typechecker;
    static create(sourceFile: ts.SourceFile, typechecker: ts.TypeChecker): SourceFile;
    private classes;
    private imports;
    constructor(sourceFile: ts.SourceFile, typechecker: ts.TypeChecker);
    getClasses(): any[];
    private traverse(node);
}
