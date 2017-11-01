// import { EmitterFile } from "./emitter/EmitterFile";
// import { TypeScriptProject } from "./parser/project";
import Ast from "ts-simple-ast";
import { InjectMetadataAsFirstDecorator } from "./injector/ClassInjector";

function main() {
  // const project = await TypeScriptProject.create("tsconfig.json");
  // const emitter = new EmitterFile(project.configuration);
  // project.traversedSourceFiles.forEach((sf) => {
  //   sf.getClasses().forEach((cl) => {
  //     emitter.addSymbol(cl);
  //   });
  // });
  // console.log(emitter.generateFileString());

  const ast = new Ast({ tsConfigFilePath: "tsconfig.json" });
  // HACK: adding manually these files:
  const sourceRoot = ast.getCompilerOptions().rootDir || ast.getCompilerOptions().sourceRoot || ".";
  ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.ts");
  ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.tsx");
  ast.addSourceFiles(ast.getCompilerOptions().rootDir + "/**/*.d.ts");

  const emitterClass = ast.getSourceFileOrThrow("EmitterFile.ts").getClassOrThrow("EmitterFile");
  // Test injector with the emitterClass:
  InjectMetadataAsFirstDecorator(emitterClass, {foo: "bar"});

  ast.emit();
}

main();
