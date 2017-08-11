// tslint:disable
import "reflect-metadata";
import {EmitterFile} from "./emitter/EmitterFile";
import {Class} from "./parser/class";
import {SourceFile} from "./parser/sourcefile";
import {TypeScriptProject} from "./parser/project";

Reflect.defineMetadata("atm:body", {"symbols":{"type":"ISymbol[]","visibility":1}}, EmitterFile);
Reflect.defineMetadata("atm:body", {"members":{"type":"Array<IDeclaration & IVisibility>","visibility":0},"file":{"type":"string","visibility":0},"inherits":{"type":"IClass","visibility":0},"implements":{"type":"IInterface[]","visibility":0},"name":{"type":"string","visibility":0},"anon":{"type":"boolean","visibility":0}}, Class);
Reflect.defineMetadata("atm:body", {"classes":{"type":"Class[]","visibility":1},"imports":{"type":"Array<{\r\n    original: string,\r\n    alias?: string,\r\n    path?: string,\r\n    module?: string,\r\n  }>","visibility":1}}, SourceFile);
Reflect.defineMetadata("atm:body", {"traversedSourceFiles":{"type":"SourceFile[]","visibility":0},"configuration":{"type":"any","visibility":0},"typechecker":{"type":"ts.TypeChecker","visibility":1},"filePaths":{"type":"string[]","visibility":1},"program":{"type":"ts.Program","visibility":1},"ls":{"type":"ts.LanguageService","visibility":1}}, TypeScriptProject);
