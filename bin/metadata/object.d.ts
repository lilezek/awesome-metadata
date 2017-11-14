import { Metadata } from "./metadata";
export declare class MetadataObject extends Metadata {
    protected internal: any;
    constructor(internal: any);
    toJavascript(): string;
    private pToJavascript(x);
}
