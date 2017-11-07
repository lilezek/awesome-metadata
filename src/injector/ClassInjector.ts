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
export function InjectMetadataAsFirstDecorator(cl: ClassDeclaration, metadata: Metadata, dummyMethod = "__metadataDummyMethod") {
  // Get the class' file, to import the decorator.
  const sourceFile = cl.getSourceFile();
  sourceFile.addImport({
    namedImports: [{
      name: "DecoratorInjectMetadata",
    }],
    moduleSpecifier: "awesome-metadata",
  });

  // Inject the dummy method.
  const method = cl.insertMethod(0, {
    name: dummyMethod,
  });

  // Then add the injection as decorator.
  method.addDecorator({
    name: "DecoratorInjectMetadata",
    arguments: [`"atm:body"`, metadata.toJavascript()],
  });
}

/**
 * This function should not be used inside this project. It is defined here to be imported by
 * the projects which uses metadatas.
 * @param metadataKey The metadata key to be defined.
 * @param metadata The metadata to be injected.
 */
export function DecoratorInjectMetadata(metadataKey: string, metadata: any) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(metadataKey, metadata, target.body);
  };
}
