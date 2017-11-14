"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const body_1 = require("../metadata/body");
const type_1 = require("../metadata/type");
const parsed_1 = require("./parsed");
const pool_1 = require("./pool");
/**
 * Class that represent a parsed InterfaceDeclaration and contains
 * all the needed data to generate metadata.
 */
class ParsedInterface extends parsed_1.Parsed {
    static calculateId(iface) {
        // Question? What happens if the class is anonymous.
        const name = (iface.getName() ? iface.getName() : this.calculateAnonInterfaceName(iface));
        return iface.getSourceFile().getFilePath() + "#" + name;
    }
    static calculateAnonInterfaceName(iface) {
        return "anon@" + iface.getStart();
    }
    constructor(iface) {
        super(iface);
        this.metadataBody = new body_1.MetadataBody();
        this.traverse(iface);
    }
    get id() {
        return this.getId();
    }
    getId() {
        return ParsedInterface.calculateId(this.internal);
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
exports.ParsedInterface = ParsedInterface;
// tslint:disable-next-line:max-classes-per-file
class InterfacePool extends pool_1.AbstractPool {
    static get singleton() {
        return this.pSingleton || (this.pSingleton = new InterfacePool());
    }
    /**
     * Parses an interface if it is not already parsed. If it is already parsed, it just returns the parsed copy interface.
     * @param iface Interface declaration to parse.
     */
    parseInterface(iface) {
        let parsed = this.fromInterfaceDeclaration(iface);
        if (parsed) {
            return parsed;
        }
        else {
            // Call protected constructor.
            parsed = new ParsedInterface(iface);
            this.add(parsed);
            return parsed;
        }
    }
    fromInterfaceDeclaration(iface) {
        return this.pool.get(ParsedInterface.calculateId(iface));
    }
}
exports.InterfacePool = InterfacePool;
//# sourceMappingURL=interfacePool.js.map