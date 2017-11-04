"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            console.log(type.getUnionTypes());
            unionType.left = new MetadataType(type.getUnionTypes()[0]);
            unionType.right = new MetadataType(type.getUnionTypes()[1]);
        }
        else if (type.isIntersectionType()) {
            const unionType = this.internal;
            unionType.kind = ETypes.UNION;
            unionType.and = true;
            console.log(type.getIntersectionTypes());
            unionType.left = new MetadataType(type.getIntersectionTypes()[0]);
            unionType.right = new MetadataType(type.getIntersectionTypes()[1]);
        }
        else if (type.isObjectType()) {
            // TODO: Interface marshalling not trivial an not implemented yet.
            const interfaceType = this.internal;
            interfaceType.kind = ETypes.INTERFACE;
            interfaceType.generics = new array_1.MetadataArray();
            interfaceType.body = {};
        }
        else if (type.getFlags() & ts.TypeFlags.Any) {
            const primitiveType = this.internal;
            primitiveType.kind = ETypes.PRIMITIVE;
            primitiveType.primitive = new string_1.MetadataString("any");
        }
    }
}
exports.MetadataType = MetadataType;
//# sourceMappingURL=type.js.map