import Ast, { SourceFile } from "ts-simple-ast";
export declare class ProjectInjector {
    ast: Ast;
    private filesInjected;
    constructor(ast: Ast);
    injectMetadataInSourceFile(file: SourceFile): void;
    isFileInjected(path: string): boolean;
}
