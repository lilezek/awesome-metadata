import * as ts from "typescript";
import { Class } from "./class";
export declare class SourceFile {
    private sourceFile;
    private typechecker;
    static create(sourceFile: ts.SourceFile, typechecker: ts.TypeChecker): SourceFile;
    private classes;
    private imports;
    constructor(sourceFile: ts.SourceFile, typechecker: ts.TypeChecker);
    getClasses(): Class[];
    private traverse(node);
}
