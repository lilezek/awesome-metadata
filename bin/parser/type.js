"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
var ETypes;
(function (ETypes) {
    ETypes[ETypes["PRIMITIVE"] = 0] = "PRIMITIVE";
    ETypes[ETypes["INTERFACE"] = 1] = "INTERFACE";
    ETypes[ETypes["CLASS"] = 2] = "CLASS";
    ETypes[ETypes["UNION"] = 3] = "UNION";
})(ETypes = exports.ETypes || (exports.ETypes = {}));
function map(obj, fn) {
    const result = {};
    for (const k in obj) {
        result[k] = fn(k, obj[k]);
    }
    return result;
}
class Type {
    constructor(tnode, typechecker) {
        this.tnode = tnode;
        this.typechecker = typechecker;
        this.traverse(tnode);
    }
    toType() {
        return {
            kind: this.kind,
            ctor: this.ctor,
            and: this.and,
            left: this.left,
            right: this.right,
            body: this.body,
            primitive: this.primitive,
            generics: this.generics,
        };
    }
    stringify() {
        return "{" +
            "kind:" + this.kind +
            (this.ctor ? ",ctor:" + this.ctor : "") +
            (this.and ? ",and:" + this.and : "") +
            (this.left ? ",left:" + this.left.stringify() : "") +
            (this.right ? ",right:" + this.right.stringify() : "") +
            (this.primitive ? ",primitive: \"" + this.primitive + "\"" : "") +
            (this.generics && this.generics.length ? ",generics: [" + this.generics.map((v) => v.stringify()).reduce((a, b) => a + "," + b) + "]" : "") +
            "}";
        // TODO: Add body
        // ${this.body ? ",body:" + map(this.body, (key, value) => value.stringify()) : ""},
    }
    traverse(node) {
        if (!node) {
            this.kind = ETypes.PRIMITIVE;
            this.primitive = "any";
        }
        else if (node.kind === ts.SyntaxKind.ArrayType) {
            const anode = node;
            this.kind = ETypes.CLASS;
            this.ctor = "Array";
            this.generics = [new Type(anode.elementType, this.typechecker)];
        }
        else if (node.kind === ts.SyntaxKind.TypeReference) {
            const anode = node;
            // TODO: Extract path of reference
            this.path = "";
            // TODO: Check if it is either a class or interface
            this.kind = ETypes.CLASS;
            // TODO: Do not use getText, resolve the type instead.
            this.ctor = anode.typeName.getText();
        }
    }
}
exports.Type = Type;
//# sourceMappingURL=type.js.map