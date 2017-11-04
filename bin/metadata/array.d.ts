import { Metadata } from "./metadata";
export declare class MetadataArray<T> extends Metadata {
    private internal;
    constructor(arr?: T[]);
    toJavascript(): string;
    push(t: T): number;
    get(i: number): T;
    set(i: number, t: T): void;
}
