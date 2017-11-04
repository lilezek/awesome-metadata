import { ETypes } from "../metadata/type";
export { ETypes };
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
export declare type BodyMember = anyType & IVisibility & IOptionality;
export interface IType {
    kind: ETypes;
}
export interface IGenericType extends IType {
    generics?: anyType[];
}
export interface IUnionType extends IType {
    kind: ETypes.UNION;
    /**
     * If true, the union type is an AND type. Otherwise, its an OR union type.
     */
    and: boolean;
    left: anyType;
    right: anyType;
}
export interface IPrimitiveType extends IType {
    kind: ETypes.PRIMITIVE;
    primitive: string;
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
    ctor: any;
}
export declare type anyType = (IClassType | ILiteralType | IPrimitiveType | IUnionType);
