// tslint:disable
import "reflect-metadata";
import {Type} from "./parser/type";
import {EmitterFile} from "./emitter/EmitterFile";
import {Class} from "./parser/class";
import {SourceFile} from "./parser/sourcefile";
import {TypeScriptProject} from "./parser/project";
Reflect.defineMetadata("atm:body", {kind: {type: {kind:2,ctor:ETypes}, visibility: 2},ctor: {type: {kind:undefined}, visibility: 2},and: {type: {kind:undefined}, visibility: 2},left: {type: {kind:2,ctor:Type}, visibility: 2},right: {type: {kind:2,ctor:Type}, visibility: 2},body: {type: {kind:undefined}, visibility: 2},primitive: {type: {kind:undefined}, visibility: 2},generics: {type: {kind:2,ctor:Array,generics: [{kind:2,ctor:Type}]}, visibility: 2},path: {type: {kind:undefined}, visibility: 2},tnode: {type: {kind:undefined}, visibility: 2},typechecker: {type: {kind:2,ctor:ts.TypeChecker}, visibility: 2},}, Type);
Reflect.defineMetadata("atm:body", {symbols: {type: {kind:2,ctor:Array,generics: [{kind:2,ctor:ISymbol}]}, visibility: 2},tsconfig: {type: {kind:undefined}, visibility: 2},}, EmitterFile);
Reflect.defineMetadata("atm:body", {members: {type: {kind:2,ctor:Array}, visibility: 1},file: {type: {kind:undefined}, visibility: 1},inherits: {type: {kind:2,ctor:IClass}, visibility: 1},implements: {type: {kind:2,ctor:Array,generics: [{kind:2,ctor:IInterface}]}, visibility: 1},name: {type: {kind:undefined}, visibility: 1},anon: {type: {kind:undefined}, visibility: 1},cl: {type: {kind:2,ctor:ts.ClassDeclaration}, visibility: 2},typechecker: {type: {kind:2,ctor:ts.TypeChecker}, visibility: 2},}, Class);
Reflect.defineMetadata("atm:body", {classes: {type: {kind:2,ctor:Array,generics: [{kind:2,ctor:Class}]}, visibility: 2},imports: {type: {kind:2,ctor:Array}, visibility: 2},sourceFile: {type: {kind:2,ctor:ts.SourceFile}, visibility: 2},typechecker: {type: {kind:2,ctor:ts.TypeChecker}, visibility: 2},}, SourceFile);
Reflect.defineMetadata("atm:body", {traversedSourceFiles: {type: {kind:2,ctor:Array,generics: [{kind:2,ctor:SourceFile}]}, visibility: 1},configuration: {type: {kind:undefined}, visibility: 1},typechecker: {type: {kind:2,ctor:ts.TypeChecker}, visibility: 2},filePaths: {type: {kind:2,ctor:Array,generics: [{kind:undefined}]}, visibility: 2},program: {type: {kind:2,ctor:ts.Program}, visibility: 2},ls: {type: {kind:2,ctor:ts.LanguageService}, visibility: 2},}, TypeScriptProject);

