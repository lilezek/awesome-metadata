import Ast from "ts-simple-ast";
import { InjectMetadataAsFirstDecorator } from "./injector/ClassInjector";
import { ProjectInjector } from "./injector/ProjectInjector";
import { ClassPool, ParsedClass } from "./parser/classPool";

function main() {
  // Configure project:
  const ast = new Ast({ tsConfigFilePath: "tsconfig.json" });
  // TODO: do not add manually the files.
  const sourceRoot = ast.getCompilerOptions().rootDir || ast.getCompilerOptions().sourceRoot || ".";
  ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.ts");
  ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.tsx");
  ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.d.ts");

  // Inject metadata in project:
  const metadata = new ProjectInjector(ast);
  for (const file of ast.getSourceFiles()) {
    metadata.injectMetadataInSourceFile(file);
  }
  ast.emit();
}

main();
