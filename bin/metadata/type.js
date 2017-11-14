"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_simple_ast_1 = require("ts-simple-ast");
const ts = require("typescript");
const array_1 = require("./array");
const literal_1 = require("./literal");
const object_1 = require("./object");
const string_1 = require("./string");
var ETypes;
(function (ETypes) {
    ETypes[ETypes["PRIMITIVE"] = 0] = "PRIMITIVE";
    ETypes[ETypes["INTERFACE"] = 1] = "INTERFACE";
    ETypes[ETypes["CLASS"] = 2] = "CLASS";
    ETypes[ETypes["UNION"] = 3] = "UNION";
})(ETypes = exports.ETypes || (exports.ETypes = {}));
function TypeIsClass(type) {
    // TODO: This function fails for classes like Map.
    if (type.getObjectFlags() & ts.ObjectFlags.Class) {
        return true;
    }
    else {
        if (type.getConstructSignatures().length > 0) {
            return true;
        }
        else {
            const symbol = type.getSymbol();
            if (symbol) {
                for (const declaration of symbol.getDeclarations()) {
                    if (ts_simple_ast_1.TypeGuards.isClassDeclaration(declaration)) {
                        return true;
                    }
                    if (ts_simple_ast_1.TypeGuards.isVariableDeclaration(declaration) && declaration.getType().getConstructSignatures().length > 0) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
class MetadataType extends object_1.MetadataObject {
    constructor(type) {
        super({});
        if (type.isAnonymousType()) {
            // TODO: Process this anonymous type.
            this.internal.kind = ETypes.INTERFACE;
        }
        else if (type.isArrayType()) {
            const classType = this.internal;
            classType.kind = ETypes.CLASS;
            classType.ctor = new literal_1.MetadataLiteral("Array");
            classType.generics = new array_1.MetadataArray(type.getTypeArguments().map((t) => new MetadataType(t)));
        }
        else if (type.isEnumType()) {
            const primitiveType = this.internal;
            primitiveType.kind = ETypes.PRIMITIVE;
            // TODO: Enumerations might be strings with latest TypeScript versions.
            primitiveType.primitive = new string_1.MetadataString("number");
        }
        else if (type.isBooleanType()) {
            const primitiveType = this.internal;
            primitiveType.kind = ETypes.PRIMITIVE;
            primitiveType.primitive = new string_1.MetadataString("boolean");
        }
        else if (type.isUndefinedType()) {
            const primitiveType = this.internal;
            primitiveType.kind = ETypes.PRIMITIVE;
            primitiveType.primitive = new string_1.MetadataString("undefined");
        }
        else if (type.isUnionType()) {
            const unionType = this.internal;
            unionType.kind = ETypes.UNION;
            unionType.and = false;
            unionType.left = new MetadataType(type.getUnionTypes()[0]);
            unionType.right = new MetadataType(type.getUnionTypes()[1]);
        }
        else if (type.isIntersectionType()) {
            const unionType = this.internal;
            unionType.kind = ETypes.UNION;
            unionType.and = true;
            unionType.left = new MetadataType(type.getIntersectionTypes()[0]);
            unionType.right = new MetadataType(type.getIntersectionTypes()[1]);
        }
        else if (type.isObjectType()) {
            const objectFlags = type.getObjectFlags();
            if (TypeIsClass(type)) {
                const classType = this.internal;
                classType.kind = ETypes.CLASS;
                classType.ctor = new literal_1.MetadataLiteral(type.getSymbol().getName());
                classType.generics = new array_1.MetadataArray(type.getTypeArguments().map((t) => new MetadataType(t)));
            }
            else if (objectFlags & ts.ObjectFlags.Interface) {
                // TODO: Interface marshalling not trivial an not implemented yet.
                const interfaceType = this.internal;
                interfaceType.kind = ETypes.INTERFACE;
                interfaceType.generics = new array_1.MetadataArray();
                interfaceType.body = {};
            }
            else {
                console.log("Constructors: " + type.getConstructSignatures().length);
                console.log("Object not parsed: " + objectFlags);
                console.log("Object's name: " + type.getSymbol().getName());
            }
        }
        else if (type.getFlags() & ts.TypeFlags.Any) {
            const primitiveType = this.internal;
            primitiveType.kind = ETypes.PRIMITIVE;
            primitiveType.primitive = new string_1.MetadataString("any");
        }
        else if (type.getFlags() & ts.TypeFlags.String) {
            const primitiveType = this.internal;
            primitiveType.kind = ETypes.PRIMITIVE;
            primitiveType.primitive = new string_1.MetadataString("string");
        }
        else if (type.getFlags() & ts.TypeFlags.Number) {
            const primitiveType = this.internal;
            primitiveType.kind = ETypes.PRIMITIVE;
            primitiveType.primitive = new string_1.MetadataString("number");
        }
        else {
            console.log("Type not parsed: " + type.getFlags());
        }
    }
}
exports.MetadataType = MetadataType;
//# sourceMappingURL=type.js.map