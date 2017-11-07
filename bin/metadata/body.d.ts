import { MetadataObject } from "./object";
import { MetadataType } from "./type";
export declare enum EVisibility {
    NONE = 0,
    PUBLIC = 1,
    PRIVATE = 2,
    PROTECTED = 3,
}
export interface IVisibility {
    visibility: EVisibility;
}
export interface IOptionality {
    optional: boolean;
}
export declare type BodyMember = MetadataType & IVisibility & IOptionality;
/**
 * In order to use this metadata, just define the body member.
 */
export declare class MetadataBody extends MetadataObject {
    __metadataDummyMethod(): void;
    body: {
        [key: string]: BodyMember;
    };
    constructor();
    toJavascript(): string;
}
