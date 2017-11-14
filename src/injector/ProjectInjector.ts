import Ast, { SourceFile } from "ts-simple-ast";
import { ClassPool } from "../parser/classPool";
import { InjectMetadataAsFirstDecorator } from "./ClassInjector";

export class ProjectInjector {
  private filesInjected: {
    [key: string]: boolean;
  };

  constructor(public ast: Ast) {

  }

  public injectMetadataInSourceFile(file: SourceFile) {
    // TODO: Control some options.
    const classPool = ClassPool.singleton;
    let addImports = true;
    for (const cl of file.getClasses()) {
      const parsed = classPool.parseClass(cl);
      InjectMetadataAsFirstDecorator(cl, parsed.getMetadata(), addImports);
      addImports = false;
    }
  }

  public isFileInjected(path: string) {
    return path in this.filesInjected;
  }
}
