"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable
require("reflect-metadata");
const EmitterFile_1 = require("./emitter/EmitterFile");
const class_1 = require("./parser/class");
const sourcefile_1 = require("./parser/sourcefile");
const project_1 = require("./parser/project");
Reflect.defineMetadata("atm:body", { "symbols": { "type": "ISymbol[]", "visibility": 1 } }, EmitterFile_1.EmitterFile);
Reflect.defineMetadata("atm:body", { "members": { "type": "Array<IDeclaration & IVisibility>", "visibility": 0 }, "file": { "type": "string", "visibility": 0 }, "inherits": { "type": "IClass", "visibility": 0 }, "implements": { "type": "IInterface[]", "visibility": 0 }, "name": { "type": "string", "visibility": 0 }, "anon": { "type": "boolean", "visibility": 0 } }, class_1.Class);
Reflect.defineMetadata("atm:body", { "classes": { "type": "Class[]", "visibility": 1 }, "imports": { "type": "Array<{\r\n    original: string,\r\n    alias?: string,\r\n    path?: string,\r\n    module?: string,\r\n  }>", "visibility": 1 } }, sourcefile_1.SourceFile);
Reflect.defineMetadata("atm:body", { "traversedSourceFiles": { "type": "SourceFile[]", "visibility": 0 }, "configuration": { "type": "any", "visibility": 0 }, "typechecker": { "type": "ts.TypeChecker", "visibility": 1 }, "filePaths": { "type": "string[]", "visibility": 1 }, "program": { "type": "ts.Program", "visibility": 1 }, "ls": { "type": "ts.LanguageService", "visibility": 1 } }, project_1.TypeScriptProject);
