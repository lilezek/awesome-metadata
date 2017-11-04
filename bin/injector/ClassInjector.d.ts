import "reflect-metadata";
import { ClassDeclaration } from "ts-simple-ast/dist/main";
import { Metadata } from "../metadata/metadata";
export declare function InjectMetadataAsFirstDecorator(cl: ClassDeclaration, metadata: Metadata, dummyMethod?: string): void;
/**
 * This function should not be used inside this project. It is defined here to be imported by
 * the projects which uses metadatas.
 * @param metadataKey The metadata key to be defined.
 * @param metadata The metadata to be injected.
 */
export declare function DecoratorInjectMetadata(metadataKey: string, metadata: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
