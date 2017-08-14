import { readFile, readFileSync } from "fs";
import glob = require("glob");
import * as ts from "typescript";

import * as async from "ts-modern-async";
import { SourceFile } from "./sourcefile";

export class TypeScriptProject {
  public static async create(tsconfig: string) {
    const tsproj = new TypeScriptProject(tsconfig);
    await tsproj.findProjectfiles();
    tsproj.loadSourceFiles();
    tsproj.traverseSourceFiles();
    return tsproj;
  }

  public traversedSourceFiles: SourceFile[];
  public configuration: any;

  private typechecker: ts.TypeChecker;
  private filePaths: string[];
  private program: ts.Program;
  private ls: ts.LanguageService;

  private constructor(tsconfig: string) {
    // TODO If no config file given, use this:
    // ts.findConfigFile

    // Parse tsconfig.json
    const projectFile = ts.readConfigFile(tsconfig, (path) => {
      return readFileSync(path).toString();
    });
    // TODO: Check for errors
    this.configuration = projectFile.config;
  }

  private async findProjectfiles() {
    return new Promise<TypeScriptProject>((resolve, reject) => {
      let expression = this.configuration.compilerOptions.rootDir || ".";
      expression += "/**/*.+(ts|tsx)";
      glob(expression, (err, files) => {
        if (err) {
          reject(err);
        } else {
          this.filePaths = files;
          resolve();
        }
      });
    });
  }

  private loadSourceFiles() {
    this.program = ts.createProgram(this.filePaths, this.configuration.compilerOptions);
    this.typechecker = this.program.getTypeChecker();
  }

  private traverseSourceFiles() {
    this.traversedSourceFiles = this.program.getSourceFiles().filter((v) => {
      return /node_modules/.exec(v.fileName) === null &&
        /\.d\.ts$/.exec(v.fileName) === null;
    }).map((v) => SourceFile.create(v, this.typechecker));
  }

}
