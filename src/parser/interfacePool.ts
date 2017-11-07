import { ClassDeclaration, ConstructorDeclaration, InterfaceDeclaration, Node as AstNode, PropertyDeclaration } from "ts-simple-ast";
import * as ts from "typescript";
import { BodyMember, EVisibility, MetadataBody } from "../metadata/body";
import { MetadataType } from "../metadata/type";
import { Parsed } from "./parsed";
import { AbstractPool } from "./pool";

/**
 * Class that represent a parsed InterfaceDeclaration and contains
 * all the needed data to generate metadata.
 */
export class ParsedInterface extends Parsed<InterfaceDeclaration> {
  public static calculateId(iface: InterfaceDeclaration) {
    // Question? What happens if the class is anonymous.
    const name = (iface.getName() ? iface.getName() : this.calculateAnonInterfaceName(iface));
    return iface.getSourceFile().getFilePath() + "#" + name;
  }

  public static calculateAnonInterfaceName(iface: InterfaceDeclaration) {
    return "anon@" + iface.getStart();
  }

  private metadataBody: MetadataBody;

  protected constructor(iface: InterfaceDeclaration) {
    super(iface);
    this.metadataBody = new MetadataBody();
    this.traverse(iface);
  }

  public get id() {
    return this.getId();
  }

  public getId() {
    return ParsedInterface.calculateId(this.internal);
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
export class InterfacePool extends AbstractPool<ParsedInterface> {
  private static pSingleton: InterfacePool;

  static get singleton() {
    return this.pSingleton || (this.pSingleton = new InterfacePool());
  }

  /**
   * Parses an interface if it is not already parsed. If it is already parsed, it just returns the parsed copy interface.
   * @param iface Interface declaration to parse.
   */
  public parseInterface(iface: InterfaceDeclaration) {
    let parsed = this.fromInterfaceDeclaration(iface);
    if (parsed) {
      return parsed;
    } else {
      // Call protected constructor.
      parsed = new (ParsedInterface as any)(iface) as ParsedInterface;
      this.add(parsed);
      return parsed;
    }
  }

  public fromInterfaceDeclaration(iface: InterfaceDeclaration) {
    return this.pool.get(ParsedInterface.calculateId(iface));
  }
}