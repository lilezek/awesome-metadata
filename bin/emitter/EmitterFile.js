"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const awesome_metadata_1 = require("awesome-metadata");
class EmitterFile {
    constructor(tsconfig) {
        this.tsconfig = tsconfig;
        this.symbols = [];
    }
    __metadataDummyMethod() {
    }
    addSymbol(symbol) {
        this.symbols.push(symbol);
    }
    generateFileString() {
        // Generate imports array
        const imports = [];
        const importsMap = {};
        this.symbols.forEach((s) => {
            const p = ("./" + path.relative(path.resolve(process.cwd(), this.tsconfig.compilerOptions.rootDir || ""), s.getAbsolutePath())).replace(/\.[^/.]+$/, "");
            if (!(p in importsMap)) {
                imports.push(importsMap[p] = {
                    path: p,
                    names: [],
                });
            }
            importsMap[p].names.push(s.getName());
        });
        // Generate metadatas array
        const metadatas = [];
        this.symbols.forEach((symbol) => {
            symbol.toMetadataArray().forEach((metadata) => {
                metadatas.push(Object.assign({ target: symbol.getName() }, metadata));
            });
        });
        return `// tslint:disable\nimport "reflect-metadata";\n` +
            imports.map((s) => `import {${s.names.reduce((a, b) => a + ", " + b)}} from "${s.path}";\n`).reduce((a, b) => a + b) +
            metadatas.map((metadata) => `Reflect.defineMetadata("${metadata.name}", ${metadata.value}, ${metadata.target});\n`).reduce((a, b) => a + b, "");
    }
}
__decorate([
    awesome_metadata_1.DecoratorInjectMetadata({ "foo": "bar" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmitterFile.prototype, "__metadataDummyMethod", null);
exports.EmitterFile = EmitterFile;
//# sourceMappingURL=EmitterFile.js.map