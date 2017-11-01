"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const interface_1 = require("./interface");
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
/**
 * HACK: Hardcoded list of names that are classes and not interfaces.
 * A real solution should check all the declarations to determine if class or not.
 */
const hardcodedClasses = {
    String: {
        path: "",
    },
    Boolean: {
        path: "",
    },
    Number: {
        path: "",
    },
    Date: {
        path: "",
    },
    Object: {
        path: "",
    },
};
class Type {
    constructor(tnode, typechecker) {
        this.tnode = tnode;
        this.typechecker = typechecker;
        this.optional = false;
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
            (this.body ? ",body: " + this.body.stringify() : "") +
            (this.generics && this.generics.length ? ",generics: [" + this.generics.map((v) => v.stringify()).reduce((a, b) => a + "," + b) + "]" : "") +
            "}";
    }
    traverse(node) {
        if (node.kind === ts.SyntaxKind.ArrayType) {
            const anode = node;
            this.kind = ETypes.CLASS;
            this.ctor = "Array";
            this.generics = [new Type(anode.elementType, this.typechecker)];
        }
        else if (node.kind === ts.SyntaxKind.TypeReference) {
            const anode = node;
            const type = this.typechecker.getTypeAtLocation(anode);
            const symbol = type.symbol || type.aliasSymbol;
            if (type && symbol) {
                const decls = symbol.getDeclarations();
                // TODO: parse all declarations, not only the first
                const decl = decls[0];
                if (decl.kind === ts.SyntaxKind.EnumDeclaration) {
                    this.kind = ETypes.PRIMITIVE;
                    this.primitive = "number";
                }
                else if (decl.kind === ts.SyntaxKind.ClassDeclaration) {
                    this.kind = ETypes.CLASS;
                    this.ctor = anode.getText();
                    this.path = decl.getSourceFile().fileName;
                }
                else if (decl.kind === ts.SyntaxKind.InterfaceDeclaration) {
                    const interfaceName = anode.typeName.getText();
                    if (hardcodedClasses.hasOwnProperty(interfaceName)) {
                        this.kind = ETypes.CLASS;
                        this.ctor = anode.getText();
                        this.path = hardcodedClasses[interfaceName].path;
                    }
                    else {
                        this.kind = ETypes.INTERFACE;
                        this.body = new interface_1.Interface(decl, this.typechecker);
                    }
                }
                else if (decl.kind === ts.SyntaxKind.TypeAliasDeclaration) {
                    const alias = decl;
                    this.traverse(alias.type);
                }
                else {
                    console.error(decl.kind);
                }
            }
            else {
                throw new Error("This AST contains a TypeReference without declaration");
            }
        }
        else if (node.kind === ts.SyntaxKind.StringKeyword) {
            this.kind = ETypes.PRIMITIVE;
            this.primitive = "string";
        }
        else if (node.kind === ts.SyntaxKind.BooleanKeyword) {
            this.kind = ETypes.PRIMITIVE;
            this.primitive = "boolean";
        }
        else if (node.kind === ts.SyntaxKind.AnyKeyword) {
            this.kind = ETypes.PRIMITIVE;
            this.primitive = "any";
        }
        else if (node.kind === ts.SyntaxKind.NumberKeyword) {
            this.kind = ETypes.PRIMITIVE;
            this.primitive = "number";
        }
        else if (node.kind === ts.SyntaxKind.UndefinedKeyword) {
            this.kind = ETypes.PRIMITIVE;
            this.primitive = "undefined";
        }
        else if (node.kind === ts.SyntaxKind.NullKeyword) {
            this.kind = ETypes.PRIMITIVE;
            this.primitive = "null";
        }
        else if (node.kind === ts.SyntaxKind.ObjectKeyword) {
            this.kind = ETypes.PRIMITIVE;
            this.primitive = "object";
        }
        else if (node.kind === ts.SyntaxKind.TypeLiteral) {
            this.kind = ETypes.INTERFACE;
            this.body = new interface_1.Interface(node, this.typechecker);
        }
        else if (node.kind === ts.SyntaxKind.Identifier) {
            const type = this.typechecker.getTypeAtLocation(node);
            const symbol = type.symbol || type.aliasSymbol;
            if (type && symbol) {
                const decls = symbol.getDeclarations();
                // TODO: parse all declarations, not only the first
                const decl = decls[0];
                if (decl.kind === ts.SyntaxKind.EnumDeclaration) {
                    this.kind = ETypes.PRIMITIVE;
                    this.primitive = "number";
                }
                else if (decl.kind === ts.SyntaxKind.ClassDeclaration) {
                    this.kind = ETypes.CLASS;
                    this.ctor = node.getText();
                    this.path = decl.getSourceFile().fileName;
                }
                else if (decl.kind === ts.SyntaxKind.InterfaceDeclaration) {
                    this.kind = ETypes.INTERFACE;
                    this.body = new interface_1.Interface(decl, this.typechecker);
                }
                else if (decl.kind === ts.SyntaxKind.TypeAliasDeclaration) {
                    const alias = decl;
                    this.traverse(alias.type);
                }
                else {
                    console.error(decl.kind);
                }
            }
            else if (type.intrinsicName) {
                this.kind = ETypes.PRIMITIVE;
                this.primitive = type.intrinsicName;
            }
            else {
                throw new Error("This AST contains a TypeReference without declaration");
            }
        }
        else if (node.kind === ts.SyntaxKind.UnionType) {
            const union = node;
            this.kind = ETypes.UNION;
            this.and = false;
            this.left = new Type(union.types[0], this.typechecker);
            this.right = new Type(union.types[1], this.typechecker);
        }
        else {
            console.error(node.kind);
        }
    }
}
exports.Type = Type;
//# sourceMappingURL=type.js.map