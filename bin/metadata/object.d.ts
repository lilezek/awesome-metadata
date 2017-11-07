import { Metadata } from "./metadata";
export declare class MetadataObject extends Metadata {
    protected internal: any;
    __metadataDummyMethod(): void;
    constructor(internal: any);
    toJavascript(): string;
    private pToJavascript(x);
}
