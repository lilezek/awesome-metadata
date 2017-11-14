"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classPool_1 = require("../parser/classPool");
const ClassInjector_1 = require("./ClassInjector");
class ProjectInjector {
    constructor(ast) {
        this.ast = ast;
    }
    injectMetadataInSourceFile(file) {
        // TODO: Control some options.
        const classPool = classPool_1.ClassPool.singleton;
        let addImports = true;
        for (const cl of file.getClasses()) {
            const parsed = classPool.parseClass(cl);
            ClassInjector_1.InjectMetadataAsFirstDecorator(cl, parsed.getMetadata(), addImports);
            addImports = false;
        }
    }
    isFileInjected(path) {
        return path in this.filesInjected;
    }
}
exports.ProjectInjector = ProjectInjector;
//# sourceMappingURL=ProjectInjector.js.map