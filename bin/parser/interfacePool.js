"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_simple_ast_1 = require("ts-simple-ast");
const ts = require("typescript");
const body_1 = require("../metadata/body");
const type_1 = require("../metadata/type");
const parsed_1 = require("./parsed");
const pool_1 = require("./pool");
const awesome_metadata_1 = require("awesome-metadata");
/**
 * Class that represent a parsed InterfaceDeclaration and contains
 * all the needed data to generate metadata.
 */
class ParsedInterface extends parsed_1.Parsed {
    constructor(iface) {
        super(iface);
        this.metadataBody = new body_1.MetadataBody();
        this.traverse(iface);
    }
    __metadataDummyMethod() {
    }
    static calculateId(iface) {
        // Question? What happens if the class is anonymous.
        const name = (iface.getName() ? iface.getName() : this.calculateAnonInterfaceName(iface));
        return iface.getSourceFile().getFilePath() + "#" + name;
    }
    static calculateAnonInterfaceName(iface) {
        return "anon@" + iface.getStart();
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
__decorate([
    awesome_metadata_1.DecoratorInjectMetadata("atm:body", { metadataBody: { kind: 2, ctor: body_1.MetadataBody, generics: [] }, iface: { kind: 2, ctor: ts_simple_ast_1.InterfaceDeclaration, generics: [] } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParsedInterface.prototype, "__metadataDummyMethod", null);
exports.ParsedInterface = ParsedInterface;
// tslint:disable-next-line:max-classes-per-file
class InterfacePool extends pool_1.AbstractPool {
    __metadataDummyMethod() {
    }
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
__decorate([
    awesome_metadata_1.DecoratorInjectMetadata("atm:body", { pSingleton: { kind: 2, ctor: InterfacePool, generics: [] } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InterfacePool.prototype, "__metadataDummyMethod", null);
exports.InterfacePool = InterfacePool;
//# sourceMappingURL=interfacePool.js.map