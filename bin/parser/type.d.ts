import * as ts from "typescript";
import { Interface } from "./interface";
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
    generics?: IType[];
}
export interface IUnionType extends IType {
    kind: ETypes.UNION;
    /**
     * If true, the union type is an AND type. Otherwise, its an OR union type.
     */
    and: boolean;
    left: IType;
    right: IType;
}
export interface IPrimitiveType extends IType {
    kind: ETypes.PRIMITIVE;
    primitive: string;
}
export interface IInterfaceType extends IGenericType {
    kind: ETypes.INTERFACE;
    body: {
        [key: string]: IType;
    };
}
export interface IClassType extends IGenericType {
    kind: ETypes.CLASS;
    ctor: string;
    path?: string;
}
export declare type anyType = IClassType | IInterfaceType | IPrimitiveType | IUnionType;
export declare class Type {
    private tnode;
    private typechecker;
    private kind;
    private ctor?;
    private and?;
    private left?;
    private right?;
    private body?;
    private primitive?;
    private generics?;
    private path?;
    private optional;
    constructor(tnode: ts.TypeNode | ts.BindingName | ts.PropertyName, typechecker: ts.TypeChecker);
    toType(): {
        kind: ETypes;
        ctor: string | undefined;
        and: boolean | undefined;
        left: Type | undefined;
        right: Type | undefined;
        body: Interface | undefined;
        primitive: string | undefined;
        generics: Type[] | undefined;
    };
    stringify(): string;
    private traverse(node);
}
