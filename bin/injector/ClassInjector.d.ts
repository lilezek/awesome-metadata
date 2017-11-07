import "reflect-metadata";
import { ClassDeclaration } from "ts-simple-ast/dist/main";
import { Metadata } from "../metadata/metadata";
/**
 * Adds a dummy method, and a decorator to that method, in order to get that decorator called before any other decorator.
 * The decorator called is DecoratorInjectMetadata, with the metadata to inject.
 * @param cl The class to inject the metadata.
 * @param metadata The metadata to be injected.
 * @param dummyMethod The name of the dummy method.
 */
export declare function InjectMetadataAsFirstDecorator(cl: ClassDeclaration, metadata: Metadata, dummyMethod?: string): void;
/**
 * This function should not be used inside this project. It is defined here to be imported by
 * the projects which uses metadatas.
 * @param metadataKey The metadata key to be defined.
 * @param metadata The metadata to be injected.
 */
export declare function DecoratorInjectMetadata(metadataKey: string, metadata: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
