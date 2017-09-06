import { SourceFile } from "./sourcefile";
export declare class TypeScriptProject {
    static create(tsconfig: string): Promise<TypeScriptProject>;
    traversedSourceFiles: SourceFile[];
    configuration: any;
    private typechecker;
    private filePaths;
    private program;
    private ls;
    private constructor();
    private findProjectfiles();
    private loadSourceFiles();
    private traverseSourceFiles();
}
