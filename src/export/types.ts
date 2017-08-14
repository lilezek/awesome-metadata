import { ETypes } from "../parser/type";

export { ETypes };

export interface IType {
  kind: ETypes;
}

export interface IGenericType extends IType {
  generics?: Array<IClassType|IInterfaceType|IPrimitiveType|IUnionType>;
}

export interface IUnionType extends IType {
  kind: ETypes.UNION;
  /**
   * If true, the union type is an AND type. Otherwise, its an OR union type.
   */
  and: boolean;

  left: IClassType|IInterfaceType|IPrimitiveType|IUnionType;
  right: IClassType|IInterfaceType|IPrimitiveType|IUnionType;
}

export interface IPrimitiveType extends IType {
  kind: ETypes.PRIMITIVE;
  primitive: string;
}

export interface IInterfaceType extends IGenericType {
  kind: ETypes.INTERFACE;
  body: {
    [key: string]: IClassType|IInterfaceType|IPrimitiveType|IUnionType;
  };
}

export interface IConstructor<T> {
  prototype: any;
  new(...args: any[]): T;
}

export interface IClassType<T = any> extends IGenericType {
  kind: ETypes.CLASS;
  ctor: IConstructor<T>;
  path?: string;
}

export interface IElement {
  type: IClassType|IInterfaceType|IPrimitiveType|IUnionType;
  visibility: number;
  optional: boolean;
}

export interface IBody {
  [key: string]: IElement;
}
