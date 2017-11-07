import { Type } from "ts-simple-ast";
import { MetadataArray } from "./array";
import { BodyMember } from "./body";
import { MetadataLiteral } from "./literal";
import { MetadataObject } from "./object";
import { MetadataString } from "./string";
export declare enum ETypes {
    PRIMITIVE = 0,
    INTERFACE = 1,
    CLASS = 2,
    UNION = 3,
}
export interface IType {
    kind: ETypes;
}
export interface IGenericType extends IType {
    generics?: MetadataArray<MetadataType>;
}
export interface IUnionType extends IType {
    kind: ETypes.UNION;
    /**
     * If true, the union type is an AND type. Otherwise, its an OR union type.
     */
    and: boolean;
    left: MetadataType;
    right: MetadataType;
}
export interface IPrimitiveType extends IType {
    kind: ETypes.PRIMITIVE;
    primitive: MetadataString;
}
/**
 * This represents a type which might be anon.
 */
export interface ILiteralType extends IGenericType {
    kind: ETypes.INTERFACE;
    body: {
        [key: string]: BodyMember;
    };
}
export interface IClassType extends IGenericType {
    kind: ETypes.CLASS;
    ctor: MetadataLiteral;
}
export declare type anyType = (IClassType | ILiteralType | IPrimitiveType | IUnionType);
export declare class MetadataType extends MetadataObject {
    __metadataDummyMethod(): void;
    protected internal: anyType;
    constructor(type: Type);
}
