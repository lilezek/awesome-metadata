"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
var EVisibility;
(function (EVisibility) {
    EVisibility[EVisibility["NONE"] = 0] = "NONE";
    EVisibility[EVisibility["PUBLIC"] = 1] = "PUBLIC";
    EVisibility[EVisibility["PRIVATE"] = 2] = "PRIVATE";
    EVisibility[EVisibility["PROTECTED"] = 3] = "PROTECTED";
})(EVisibility || (EVisibility = {}));
class Class {
    constructor(cl, typechecker) {
        this.cl = cl;
        this.typechecker = typechecker;
        this.members = [];
        this.implements = [];
        this.traverse(cl);
    }
    getId() {
        return this.cl.getSourceFile().fileName + "#" + this.name;
    }
    getName() {
        return this.name;
    }
    getAbsolutePath() {
        return this.cl.getSourceFile().fileName;
    }
    toMetadataArray() {
        const body = {};
        this.members.forEach((member) => {
            body[member.name] = {
                type: member.type.chorizo,
                visibility: member.visibility,
            };
        });
        return [{
                name: "atm:body",
                value: body,
            }];
    }
    traverse(node) {
        if (node.kind === ts.SyntaxKind.ClassDeclaration || node.kind === ts.SyntaxKind.InterfaceDeclaration) {
            const cl = node;
            if (cl.name) {
                this.name = cl.name.getText();
                this.anon = false;
            }
            else {
                this.anon = true;
                return;
            }
            if (cl.heritageClauses) {
                // For each heritage clause
                cl.heritageClauses.forEach((heritageClause) => {
                    // Of this type
                    const isImplements = heritageClause.token === ts.SyntaxKind.ImplementsKeyword;
                    // For each type in clause
                    heritageClause.types.forEach((types) => {
                        const symbol = this.typechecker.getSymbolAtLocation(types.expression);
                        const type = this.typechecker.getTypeOfSymbolAtLocation(symbol, types.expression);
                        const decls = symbol.getDeclarations();
                        // Get declaration
                        decls.forEach((vclass) => {
                            if (!vclass.name) {
                                // TODO: do something with anonclass extensions:
                            }
                            else {
                                if (!isImplements) {
                                    this.inherits = new Class(vclass, this.typechecker);
                                }
                            }
                        });
                    });
                });
            }
        }
        else if (node.kind === ts.SyntaxKind.PropertyDeclaration) {
            const member = {};
            const prop = node;
            member.visibility = EVisibility.PROTECTED;
            if (prop.modifiers) {
                prop.modifiers.forEach((element) => {
                    if (element.kind === ts.SyntaxKind.PublicKeyword) {
                        member.visibility = EVisibility.PUBLIC;
                    }
                    else if (element.kind === ts.SyntaxKind.PrivateKeyword) {
                        member.visibility = EVisibility.PRIVATE;
                    }
                });
            }
            member.name = prop.name.getText();
            // TODO: Use a better form of obtaining the type
            member.type = {
                chorizo: (prop.type ? prop.type.getText() : ""),
            };
            this.members.push(member);
        }
        else if (node.kind === ts.SyntaxKind.Constructor) {
            const constructor = node;
            constructor.parameters.forEach((parameter) => {
                if (parameter.modifiers) {
                    let visibility = EVisibility.NONE;
                    parameter.modifiers.forEach((modifier) => {
                        if (modifier.kind === ts.SyntaxKind.PrivateKeyword) {
                            visibility = EVisibility.PRIVATE;
                        }
                        else if (modifier.kind === ts.SyntaxKind.PublicKeyword) {
                            visibility = EVisibility.PUBLIC;
                        }
                        else if (modifier.kind === ts.SyntaxKind.ProtectedKeyword) {
                            visibility = EVisibility.PROTECTED;
                        }
                    });
                    if (visibility !== EVisibility.NONE) {
                        this.members.push({
                            visibility,
                            name: parameter.name.getText(),
                            type: { chorizo: (parameter.type ? parameter.type.getText() : "any") },
                        });
                    }
                }
            });
        }
        else if (node.kind === ts.SyntaxKind.MethodDeclaration) {
            // TODO: do something with methods.
            // const method = node as ts.MethodDeclaration;
            // let visibility = ts.ModifierFlags.Private;
            // if (method.modifiers) {
            //   method.modifiers.forEach((element) => {
            //     if (element.kind === ts.SyntaxKind.PublicKeyword) {
            //       visibility = ts.ModifierFlags.Public;
            //     } else if (element.kind === ts.SyntaxKind.PrivateKeyword) {
            //       visibility = ts.ModifierFlags.Private;
            //     }
            //   });
            // }
            // const parameters = [] as Serial.UMLClassProperty[];
            // method.parameters.forEach((el) => {
            //   parameters.push({
            //     name: (el.name ? el.name.getText() : ""),
            //     type: (el.type ? el.type.getText() : ""),
            //     default: (el.initializer ? el.getText() : undefined),
            //   });
            // });
            // const signature = this.typechecker.getSignatureFromDeclaration(method) as ts.Signature;
            // const type = this.typechecker.getReturnTypeOfSignature(signature);
            // const stringType = this.typechecker.typeToString(type);
            // // TODO: use visibility
            // if (visibility as ts.ModifierFlags === ts.ModifierFlags.Public) {
            //   this.methods.push({
            //     name: method.name.getText(),
            //     type: (stringType === "void" ? "" : stringType),
            //     arguments: parameters,
            //   });
            // }
        }
        ts.forEachChild(node, this.traverse.bind(this));
    }
}
exports.Class = Class;
//# sourceMappingURL=class.js.map