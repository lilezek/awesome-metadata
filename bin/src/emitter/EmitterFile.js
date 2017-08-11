"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmitterFile {
    constructor() {
        this.symbols = [];
    }
    addSymbol(symbol) {
        this.symbols.push(symbol);
    }
    generateFileString() {
        const imports = [];
        const importsMap = {};
        this.symbols.forEach((s) => {
            const path = s.getRelativePath();
            if (!(path in importsMap)) {
                imports.push(importsMap[path] = {
                    path,
                    names: [],
                });
            }
            importsMap[path].names.push(s.getName());
        });
        return `import "reflect-metadata";\n` +
            imports.map((s) => `import {${s.names.reduce((a, b) => a + ", " + b)}} from "${s.path}";\n`).reduce((a, b) => a + b);
    }
}
exports.EmitterFile = EmitterFile;
