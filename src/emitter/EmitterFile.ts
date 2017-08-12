import path = require("path");
import { IType } from "../parser/type";

interface IMetadata {
  name: string;
  value: string;
}

interface ISymbol {
  getName(): string;
  getAbsolutePath(): string;
  toMetadataArray(): IMetadata[];
}

export class EmitterFile {
  private symbols: ISymbol[] = [];

  constructor(private tsconfig: any) {

  }

  public addSymbol(symbol: ISymbol) {
    this.symbols.push(symbol);
  }

  public generateFileString() {

    // Generate imports array

    const imports = [] as Array<{ path: string, names: string[] }>;
    const importsMap = {} as any;
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
    const metadatas = [] as Array<IMetadata & {target: string}>;

    this.symbols.forEach((symbol) => {
      symbol.toMetadataArray().forEach((metadata) => {
        metadatas.push(Object.assign({target: symbol.getName()}, metadata));
      });
    });

    return `// tslint:disable\nimport "reflect-metadata";\n` +
      imports.map((s) => `import {${s.names.reduce((a, b) => a + ", " + b)}} from "${s.path}";\n`).reduce((a, b) => a + b) +
      metadatas.map((metadata) => `Reflect.defineMetadata("${metadata.name}", ${metadata.value}, ${metadata.target});\n`).reduce((a, b) => a + b, "");
  }
}
