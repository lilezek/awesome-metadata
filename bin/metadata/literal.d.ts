import { Metadata } from "./metadata";
export declare class MetadataLiteral extends Metadata {
    private internal;
    __metadataDummyMethod(): void;
    constructor(internal: string);
    toJavascript(): string;
}
