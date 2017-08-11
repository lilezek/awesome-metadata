"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class EmitterFile {
    constructor(tsconfig) {
        this.tsconfig = tsconfig;
        this.symbols = [];
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
            metadatas.map((metadata) => `Reflect.defineMetadata("${metadata.name}", ${JSON.stringify(metadata.value)}, ${metadata.target});\n`).reduce((a, b) => a + b, "");
    }
}
exports.EmitterFile = EmitterFile;
