import { ClassDeclaration } from "ts-simple-ast/dist/main";

export function InjectMetadataAsFirstDecorator(cl: ClassDeclaration, metadata: any, dummyMethod = "__metadataDummyMethod") {
  const method = cl.insertMethod(0, {
    name: dummyMethod,
  });

  const sourceFile = cl.getSourceFile();
  sourceFile.addImport({
    namedImports: [{
      name: "DecoratorInjectMetadata",
    }],
    moduleSpecifier: "awesome-metadata",
  });

  method.addDecorator({
    name: "DecoratorInjectMetadata",
    arguments: ["atm:body", JSON.stringify(metadata)],
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
