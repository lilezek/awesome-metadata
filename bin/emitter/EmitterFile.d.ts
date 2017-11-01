export interface IMetadata {
    name: string;
    value: string;
}
export interface ISymbol {
    getName(): string;
    getAbsolutePath(): string;
    toMetadataArray(): IMetadata[];
}
export declare class EmitterFile {
    private tsconfig;
    __metadataDummyMethod(): void;
    private symbols;
    constructor(tsconfig: any);
    addSymbol(symbol: ISymbol): void;
    generateFileString(): string;
}
