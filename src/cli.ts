import Ast from "ts-simple-ast";
import { InjectMetadataAsFirstDecorator } from "./injector/ClassInjector";
import { ClassPool, ParsedClass } from "./parser/classPool";

function main() {
  // Configure project:
  const ast = new Ast({ tsConfigFilePath: "tsconfig.json" });
  // TODO: do not add manually the files.
  const sourceRoot = ast.getCompilerOptions().rootDir || ast.getCompilerOptions().sourceRoot || ".";
  ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.ts");
  ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.tsx");
  ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.d.ts");

  // Get class pool:
  const classPool = ClassPool.singleton;
  for (const file of ast.getSourceFiles()) {
    for (const cl of file.getClasses()) {
      const injected = classPool.parseClass(cl);
    }
  }
  ast.emit();
}

main();
