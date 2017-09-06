import * as ts from "typescript";
export declare class Interface {
    private inode;
    private typechecker;
    body: any;
    constructor(inode: ts.InterfaceDeclaration | ts.TypeLiteralNode, typechecker: ts.TypeChecker);
    stringify(): string;
    private traverse(node);
}
