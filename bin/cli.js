"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_simple_ast_1 = require("ts-simple-ast");
const classPool_1 = require("./parser/classPool");
function main() {
    // Configure project:
    const ast = new ts_simple_ast_1.default({ tsConfigFilePath: "tsconfig.json" });
    // TODO: do not add manually the files.
    const sourceRoot = ast.getCompilerOptions().rootDir || ast.getCompilerOptions().sourceRoot || ".";
    ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.ts");
    ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.tsx");
    ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.d.ts");
    // Get class pool:
    const classPool = classPool_1.ClassPool.singleton;
    for (const file of ast.getSourceFiles()) {
        for (const cl of file.getClasses()) {
            const injected = classPool.parseClass(cl);
        }
    }
    ast.emit();
}
main();
//# sourceMappingURL=cli.js.map