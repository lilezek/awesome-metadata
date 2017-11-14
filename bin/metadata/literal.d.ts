import { Metadata } from "./metadata";
export declare class MetadataLiteral extends Metadata {
    private internal;
    constructor(internal: string);
    toJavascript(): string;
}
