"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { EmitterFile } from "./emitter/EmitterFile";
// import { TypeScriptProject } from "./parser/project";
const ts_simple_ast_1 = require("ts-simple-ast");
const classPool_1 = require("./parser/classPool");
function main() {
    // const project = await TypeScriptProject.create("tsconfig.json");
    // const emitter = new EmitterFile(project.configuration);
    // project.traversedSourceFiles.forEach((sf) => {
    //   sf.getClasses().forEach((cl) => {
    //     emitter.addSymbol(cl);
    //   });
    // });
    // console.log(emitter.generateFileString());
    const ast = new ts_simple_ast_1.default({ tsConfigFilePath: "tsconfig.json" });
    // HACK: adding manually these files:
    const sourceRoot = ast.getCompilerOptions().rootDir || ast.getCompilerOptions().sourceRoot || ".";
    ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.ts");
    ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.tsx");
    ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.d.ts");
    const emitterClass = ast.getSourceFileOrThrow("EmitterFile.ts").getClassOrThrow("EmitterFile");
    // Test injector with the emitterClass:
    const injected = new classPool_1.ParsedClass(emitterClass);
    ast.emit();
}
main();
//# sourceMappingURL=cli.js.map