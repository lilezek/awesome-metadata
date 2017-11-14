"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
/**
 * Adds a dummy method, and a decorator to that method, in order to get that decorator called before any other decorator.
 * The decorator called is DecoratorInjectMetadata, with the metadata to inject.
 * @param cl The class to inject the metadata.
 * @param metadata The metadata to be injected.
 * @param dummyMethod The name of the dummy method.
 */
function InjectMetadataAsFirstDecorator(cl, metadata, addImport = true, dummyMethod = "__metadataDummyMethod") {
    // Get the class' file, to import the decorator.
    const sourceFile = cl.getSourceFile();
    if (addImport) {
        sourceFile.addImport({
            namedImports: [{
                    name: "DecoratorInjectMetadata",
                }],
            moduleSpecifier: "awesome-metadata",
        });
    }
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
exports.InjectMetadataAsFirstDecorator = InjectMetadataAsFirstDecorator;
/**
 * This function should not be used inside this project. It is defined here to be imported by
 * the projects which uses metadatas.
 * @param metadataKey The metadata key to be defined.
 * @param metadata The metadata to be injected.
 */
function DecoratorInjectMetadata(metadataKey, metadata) {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(metadataKey, metadata, target.constructor);
    };
}
exports.DecoratorInjectMetadata = DecoratorInjectMetadata;
//# sourceMappingURL=ClassInjector.js.map