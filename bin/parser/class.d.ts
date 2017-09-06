import * as ts from "typescript";
import { Type } from "./type";
export interface IInterface {
}
export interface IDeclaration {
    name: string;
    type: Type;
    optional: boolean;
}
export declare enum EVisibility {
    NONE = 0,
    PUBLIC = 1,
    PRIVATE = 2,
    PROTECTED = 3,
}
export interface IVisibility {
    visibility: EVisibility;
}
export interface IClass {
    name: string;
    inherits?: IClass;
    implements: IInterface[];
    members: Array<IDeclaration & IVisibility>;
    file: string;
}
export declare class Class implements IClass {
    private cl;
    private typechecker;
    members: Array<IDeclaration & IVisibility>;
    file: string;
    inherits?: IClass;
    implements: IInterface[];
    name: string;
    /**
     * Anonymous class
     */
    anon: boolean;
    constructor(cl: ts.ClassDeclaration, typechecker: ts.TypeChecker);
    getId(): string;
    getName(): string;
    getAbsolutePath(): string;
    toJSONString(): string;
    toMetadataArray(): {
        name: string;
        value: string;
    }[];
    private traverse(node);
}
