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
const EmitterFile_1 = require("./emitter/EmitterFile");
const project_1 = require("./parser/project");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const project = yield project_1.TypeScriptProject.create("tsconfig.json");
        const emitter = new EmitterFile_1.EmitterFile(project.configuration);
        project.traversedSourceFiles.forEach((sf) => {
            sf.getClasses().forEach((cl) => {
                emitter.addSymbol(cl);
            });
        });
        console.log(emitter.generateFileString());
    });
}
main();
