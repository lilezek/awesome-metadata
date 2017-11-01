import { ClassDeclaration } from "ts-simple-ast/dist/main";
export declare function InjectMetadataAsFirstDecorator(cl: ClassDeclaration, metadata: any, dummyMethod?: string): void;
/**
 * This function should not be used inside this project. It is defined here to be imported by
 * the projects which uses metadatas.
 * @param metadataKey The metadata key to be defined.
 * @param metadata The metadata to be injected.
 */
export declare function DecoratorInjectMetadata(metadataKey: string, metadata: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
