"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ClassInjector_1 = require("../injector/ClassInjector");
const body_1 = require("../metadata/body");
const type_1 = require("../metadata/type");
const parsed_1 = require("./parsed");
const pool_1 = require("./pool");
/**
 * Class that represent a parsed ClassDeclaration and contains
 * all the needed data to generate metadata.
 */
class ParsedClass extends parsed_1.Parsed {
    static calculateId(cl) {
        // Question? What happens if the class is anonymous.
        const name = (cl.getName() ? cl.getName() : this.calculateAnonClassName(cl));
        return cl.getSourceFile().getFilePath() + "#" + name;
    }
    static calculateAnonClassName(cl) {
        return "anon@" + cl.getStart();
    }
    constructor(cl) {
        super(cl);
        this.metadataBody = new body_1.MetadataBody();
        this.traverse(cl);
        ClassInjector_1.InjectMetadataAsFirstDecorator(cl, this.metadataBody);
    }
    get id() {
        return this.getId();
    }
    getId() {
        return ParsedClass.calculateId(this.internal);
    }
    isInjected() {
        // TODO: return whether or not is injected.
        // Useful to know if a class is from an external package.
        // If it is from an external package with no metadata defined,
        // we should offer a mechanism to inject the metadata somewhere.
        return true;
    }
    traverse(node) {
        if (node.getKind() === ts.SyntaxKind.ClassDeclaration) {
            // TODO: Parse class declarations
        }
        else if (node.getKind() === ts.SyntaxKind.InterfaceDeclaration) {
            // TODO: Parse interface declarations
        }
        else if (node.getKind() === ts.SyntaxKind.PropertyDeclaration) {
            const prop = node;
            const memberName = prop.getName();
            const member = new type_1.MetadataType(prop.getType());
            member.visibility = body_1.EVisibility.PROTECTED;
            member.optional = prop.getQuestionTokenNode() !== undefined;
            const modifiers = prop.getModifiers();
            modifiers.forEach((element) => {
                if (element.getKind() === ts.SyntaxKind.PublicKeyword) {
                    member.visibility = body_1.EVisibility.PUBLIC;
                }
                else if (element.getKind() === ts.SyntaxKind.PrivateKeyword) {
                    member.visibility = body_1.EVisibility.PRIVATE;
                }
            });
            this.metadataBody.body[memberName] = member;
        }
        else if (node.getKind() === ts.SyntaxKind.Constructor) {
            const constructor = node;
            constructor.getParameters().forEach((parameter) => {
                const memberName = parameter.getName();
                const member = new type_1.MetadataType(parameter.getType());
                member.visibility = body_1.EVisibility.NONE;
                parameter.getModifiers().forEach((modifier) => {
                    if (modifier.getKind() === ts.SyntaxKind.PrivateKeyword) {
                        member.visibility = body_1.EVisibility.PRIVATE;
                    }
                    else if (modifier.getKind() === ts.SyntaxKind.PublicKeyword) {
                        member.visibility = body_1.EVisibility.PUBLIC;
                    }
                    else if (modifier.getKind() === ts.SyntaxKind.ProtectedKeyword) {
                        member.visibility = body_1.EVisibility.PROTECTED;
                    }
                });
                member.optional = parameter.isOptional();
                this.metadataBody.body[memberName] = member;
            });
        }
        else if (node.getKind() === ts.SyntaxKind.MethodDeclaration) {
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
        node.getChildren().forEach((child) => this.traverse(child));
    }
}
exports.ParsedClass = ParsedClass;
// tslint:disable-next-line:max-classes-per-file
class ClassPool extends pool_1.AbstractPool {
    static get singleton() {
        return this.pSingleton || (this.pSingleton = new ClassPool());
    }
    fromClassDeclaration(cl) {
        return this.pool.get(ParsedClass.calculateId(cl));
    }
}
exports.ClassPool = ClassPool;
//# sourceMappingURL=classPool.js.map