"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable
require("reflect-metadata");
const interface_1 = require("./parser/interface");
const type_1 = require("./parser/type");
const EmitterFile_1 = require("./emitter/EmitterFile");
const class_1 = require("./parser/class");
const sourcefile_1 = require("./parser/sourcefile");
const project_1 = require("./parser/project");
Reflect.defineMetadata("atm:body", { body: { type: { kind: 0, primitive: "any" }, visibility: 1, optional: false }, inode: { type: { kind: 3, left: { kind: 1, body: {} }, right: { kind: 1, body: {} } }, visibility: 2, optional: false }, typechecker: { type: { kind: 1, body: {} }, visibility: 2, optional: false }, }, interface_1.Interface);
Reflect.defineMetadata("atm:body", { kind: { type: { kind: 0, primitive: "number" }, visibility: 2, optional: false }, ctor: { type: { kind: 0, primitive: "string" }, visibility: 2, optional: true }, and: { type: { kind: 0, primitive: "boolean" }, visibility: 2, optional: true }, left: { type: { kind: 2, ctor: type_1.Type }, visibility: 2, optional: true }, right: { type: { kind: 2, ctor: type_1.Type }, visibility: 2, optional: true }, body: { type: { kind: 2, ctor: interface_1.Interface }, visibility: 2, optional: true }, primitive: { type: { kind: 0, primitive: "string" }, visibility: 2, optional: true }, generics: { type: { kind: 2, ctor: Array, generics: [{ kind: 2, ctor: type_1.Type }] }, visibility: 2, optional: true }, path: { type: { kind: 0, primitive: "string" }, visibility: 2, optional: true }, optional: { type: { kind: 0, primitive: "boolean" }, visibility: 2, optional: false }, tnode: { type: { kind: 3, left: { kind: 1, body: {} }, right: { kind: 3, left: { kind: 1, body: {} }, right: { kind: 3, left: { kind: 1, body: {} }, right: { kind: 1, body: {} } } } }, visibility: 2, optional: false }, typechecker: { type: { kind: 1, body: {} }, visibility: 2, optional: false }, }, type_1.Type);
Reflect.defineMetadata("atm:body", { symbols: { type: { kind: 2, ctor: Array, generics: [{ kind: 1, body: {} }] }, visibility: 2, optional: false }, tsconfig: { type: { kind: 0, primitive: "any" }, visibility: 2, optional: false }, }, EmitterFile_1.EmitterFile);
Reflect.defineMetadata("atm:body", { members: { type: { kind: 1, body: {} }, visibility: 1, optional: false }, file: { type: { kind: 0, primitive: "string" }, visibility: 1, optional: false }, inherits: { type: { kind: 1, body: {} }, visibility: 1, optional: true }, implements: { type: { kind: 2, ctor: Array, generics: [{ kind: 1, body: {} }] }, visibility: 1, optional: false }, name: { type: { kind: 0, primitive: "string" }, visibility: 1, optional: false }, anon: { type: { kind: 0, primitive: "boolean" }, visibility: 1, optional: false }, cl: { type: { kind: 1, body: {} }, visibility: 2, optional: false }, typechecker: { type: { kind: 1, body: {} }, visibility: 2, optional: false }, }, class_1.Class);
Reflect.defineMetadata("atm:body", { classes: { type: { kind: 2, ctor: Array, generics: [{ kind: 2, ctor: class_1.Class }] }, visibility: 2, optional: false }, imports: { type: { kind: 1, body: {} }, visibility: 2, optional: false }, sourceFile: { type: { kind: 1, body: {} }, visibility: 2, optional: false }, typechecker: { type: { kind: 1, body: {} }, visibility: 2, optional: false }, }, sourcefile_1.SourceFile);
Reflect.defineMetadata("atm:body", { traversedSourceFiles: { type: { kind: 2, ctor: Array, generics: [{ kind: 2, ctor: sourcefile_1.SourceFile }] }, visibility: 1, optional: false }, configuration: { type: { kind: 0, primitive: "any" }, visibility: 1, optional: false }, typechecker: { type: { kind: 1, body: {} }, visibility: 2, optional: false }, filePaths: { type: { kind: 2, ctor: Array, generics: [{ kind: 0, primitive: "string" }] }, visibility: 2, optional: false }, program: { type: { kind: 1, body: {} }, visibility: 2, optional: false }, ls: { type: { kind: 1, body: {} }, visibility: 2, optional: false }, }, project_1.TypeScriptProject);
//# sourceMappingURL=metadata.js.map