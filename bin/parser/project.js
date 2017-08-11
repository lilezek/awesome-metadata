"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const glob = require("glob");
const ts = require("typescript");
const sourcefile_1 = require("./sourcefile");
class TypeScriptProject {
    static create(tsconfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const tsproj = new TypeScriptProject(tsconfig);
            yield tsproj.findProjectfiles();
            tsproj.loadSourceFiles();
            tsproj.traverseSourceFiles();
            return tsproj;
        });
    }
    constructor(tsconfig) {
        // TODO If no config file given, use this:
        // ts.findConfigFile
        // Parse tsconfig.json
        const projectFile = ts.readConfigFile(tsconfig, (path) => {
            return fs_1.readFileSync(path).toString();
        });
        // TODO: Check for errors
        this.configuration = projectFile.config;
        // let sourceFile = ts.createSourceFile(fileName, readFileSync(fileName).toString(), ts.ScriptTarget.ES6, /*setParentNodes */ true);
        // delint it
        // delint(sourceFile);
    }
    // public JSONSerial(): UMLClassDiagram {
    //   // console.log(this.program.getSourceFiles()[0].)
    //   return {
    //     classes: this.traversedSourceFiles.map((v) => {
    //       return v.getClasses().map((v2) => {
    //         return v2.toUMLSerial();
    //       });
    //     }).reduce((acum, val) => {
    //       return acum.concat(val);
    //     }),
    //     rels: this.traversedSourceFiles.map((v) => {
    //       return v.getClasses().map((v2) => {
    //         return v2.getRelationships();
    //       });
    //     }).reduce((acum, val) => {
    //       return acum.concat(val);
    //     }).reduce((acum, val) => {
    //       return acum.concat(val);
    //     }),
    //   };
    // }
    findProjectfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let expression = this.configuration.compilerOptions.rootDir || ".";
                expression += "/**/*.+(ts|tsx)";
                glob(expression, (err, files) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        this.filePaths = files;
                        resolve();
                    }
                });
            });
        });
    }
    loadSourceFiles() {
        this.program = ts.createProgram(this.filePaths, this.configuration.compilerOptions);
        this.typechecker = this.program.getTypeChecker();
    }
    traverseSourceFiles() {
        this.traversedSourceFiles = this.program.getSourceFiles().filter((v) => {
            return /node_modules/.exec(v.fileName) === null &&
                /\.d\.ts$/.exec(v.fileName) === null;
        }).map((v) => sourcefile_1.SourceFile.create(v, this.typechecker));
    }
}
exports.TypeScriptProject = TypeScriptProject;
//# sourceMappingURL=project.js.map