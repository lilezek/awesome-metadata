"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_simple_ast_1 = require("ts-simple-ast");
const ProjectInjector_1 = require("./injector/ProjectInjector");
function main() {
    // Configure project:
    const ast = new ts_simple_ast_1.default({ tsConfigFilePath: "tsconfig.json" });
    // TODO: do not add manually the files.
    const sourceRoot = ast.getCompilerOptions().rootDir || ast.getCompilerOptions().sourceRoot || ".";
    ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.ts");
    ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.tsx");
    ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.d.ts");
    // Inject metadata in project:
    const metadata = new ProjectInjector_1.ProjectInjector(ast);
    for (const file of ast.getSourceFiles()) {
        metadata.injectMetadataInSourceFile(file);
    }
    ast.emit();
}
main();
//# sourceMappingURL=cli.js.map