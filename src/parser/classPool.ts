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

  protected constructor(cl: ClassDeclaration) {
    super(cl);
    this.metadataBody = new MetadataBody();
    this.traverse(cl);
  }

  public getMetadata() {
    return this.metadataBody;
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
    }
    node.getChildren().forEach((child) => this.traverse(child));
  }
}

// tslint:disable-next-line:max-classes-per-file
export class ClassPool extends AbstractPool<ParsedClass> {
  private static pSingleton: ClassPool;

  static get singleton() {
    return this.pSingleton || (this.pSingleton = new ClassPool());
  }

  /**
   * Parses a class if it is not already parsed. If it is already parsed, it just returns the parsed copy class.
   * @param cl Class declaration to parse.
   */
  public parseClass(cl: ClassDeclaration) {
    let parsed = this.fromClassDeclaration(cl);
    if (parsed) {
      return parsed;
    } else {
      // Call protected constructor.
      parsed = new (ParsedClass as any)(cl) as ParsedClass;
      this.add(parsed);
      return parsed;
    }
  }

  public fromClassDeclaration(cl: ClassDeclaration) {
    return this.pool.get(ParsedClass.calculateId(cl));
  }
}
