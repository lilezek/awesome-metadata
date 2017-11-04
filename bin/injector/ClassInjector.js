"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function InjectMetadataAsFirstDecorator(cl, metadata, dummyMethod = "__metadataDummyMethod") {
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
        Reflect.defineMetadata(metadataKey, metadata, target.body);
    };
}
exports.DecoratorInjectMetadata = DecoratorInjectMetadata;
//# sourceMappingURL=ClassInjector.js.map