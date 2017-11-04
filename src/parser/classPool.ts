import Ast, { ClassDeclaration, ConstructorDeclaration, InterfaceDeclaration, Node as AstNode, PropertyDeclaration, TypeChecker } from "ts-simple-ast";
import * as ts from "typescript";
import { InjectMetadataAsFirstDecorator } from "../injector/ClassInjector";
import { BodyMember, EVisibility, MetadataBody } from "../metadata/body";
import { MetadataType } from "../metadata/type";
import { Parsed } from "./parsed";
import { AbstractPool } from "./pool";

/**
 * Class that represent a parsed ClassDeclaration and contains
 * all the needed data to generate metadata.
 */
export class ParsedClass extends Parsed<ClassDeclaration> {
  public static calculateId(cl: ClassDeclaration) {
    // Question? What happens if the class is anonymous.
    const name = (cl.getName() ? cl.getName() : this.calculateAnonClassName(cl));
    return cl.getSourceFile().getFilePath() + "#" + name;
  }

  public static calculateAnonClassName(cl: ClassDeclaration) {
    return "anon@" + cl.getStart();
  }

  private metadataBody: MetadataBody;

  constructor(cl: ClassDeclaration) {
    super(cl);
    this.metadataBody = new MetadataBody();
    this.traverse(cl);
    InjectMetadataAsFirstDecorator(cl, this.metadataBody);
  }

  public get id() {
    return this.getId();
  }

  public getId() {
    return ParsedClass.calculateId(this.internal);
  }

  public isInjected() {
    // TODO: return whether or not is injected.
    // Useful to know if a class is from an external package.
    // If it is from an external package with no metadata defined,
    // we should offer a mechanism to inject the metadata somewhere.
    return true;
  }

  private traverse(node: AstNode) {
    if (node.getKind() === ts.SyntaxKind.ClassDeclaration) {
      // TODO: Parse class declarations
    } else if (node.getKind() === ts.SyntaxKind.InterfaceDeclaration) {
      // TODO: Parse interface declarations
    } else if (node.getKind() === ts.SyntaxKind.PropertyDeclaration) {
      const prop = node as PropertyDeclaration;
      const memberName = prop.getName();
      const member = new MetadataType(prop.getType()) as BodyMember;
      member.visibility = EVisibility.PROTECTED;
      member.optional = prop.getQuestionTokenNode() !== undefined;
      const modifiers = prop.getModifiers();
      modifiers.forEach((element) => {
        if (element.getKind() === ts.SyntaxKind.PublicKeyword) {
          member.visibility = EVisibility.PUBLIC;
        } else if (element.getKind() === ts.SyntaxKind.PrivateKeyword) {
          member.visibility = EVisibility.PRIVATE;
        }
      });
      this.metadataBody.body[memberName] = member;
    } else if (node.getKind() === ts.SyntaxKind.Constructor) {
      const constructor = node as ConstructorDeclaration;
      constructor.getParameters().forEach((parameter) => {
        const memberName = parameter.getName() as string;
        const member = new MetadataType(parameter.getType()) as BodyMember;
        member.visibility = EVisibility.NONE;
        parameter.getModifiers().forEach((modifier) => {
          if (modifier.getKind() === ts.SyntaxKind.PrivateKeyword) {
            member.visibility = EVisibility.PRIVATE;
          } else if (modifier.getKind() === ts.SyntaxKind.PublicKeyword) {
            member.visibility = EVisibility.PUBLIC;
          } else if (modifier.getKind() === ts.SyntaxKind.ProtectedKeyword) {
            member.visibility = EVisibility.PROTECTED;
          }
        });
        member.optional = parameter.isOptional();
        this.metadataBody.body[memberName] = member;
      });
    } else if (node.getKind() === ts.SyntaxKind.MethodDeclaration) {
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

// tslint:disable-next-line:max-classes-per-file
export class ClassPool extends AbstractPool<ParsedClass> {
  // tslint:disable-next-line:variable-name
  private static pSingleton: ClassPool;

  static get singleton() {
    return this.pSingleton || (this.pSingleton = new ClassPool());
  }

  public fromClassDeclaration(cl: ClassDeclaration) {
    return this.pool.get(ParsedClass.calculateId(cl));
  }
}
