"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
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
    }
    getMetadata() {
        return this.metadataBody;
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
    /**
     * Parses a class if it is not already parsed. If it is already parsed, it just returns the parsed copy class.
     * @param cl Class declaration to parse.
     */
    parseClass(cl) {
        let parsed = this.fromClassDeclaration(cl);
        if (parsed) {
            return parsed;
        }
        else {
            // Call protected constructor.
            parsed = new ParsedClass(cl);
            this.add(parsed);
            return parsed;
        }
    }
    fromClassDeclaration(cl) {
        return this.pool.get(ParsedClass.calculateId(cl));
    }
}
exports.ClassPool = ClassPool;
//# sourceMappingURL=classPool.js.map