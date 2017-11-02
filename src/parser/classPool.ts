import Ast, { ClassDeclaration } from "ts-simple-ast";
import { Parsed } from "./parsed";
import { AbstractPool } from "./pool";

/**
 * Class that represent a parsed ClassDeclaration and contains
 * all the needed data to generate metadata.
 */
class ParsedClass extends Parsed<ClassDeclaration> {

  public static calculateId(cl: ClassDeclaration) {
    // Question? What happens if the class is anonymous.
    const name = (cl.getName() ? cl.getName() : this.calculateAnonClassName(cl));
    return cl.getSourceFile().getFilePath() + "#" + name;
  }

  public static calculateAnonClassName(cl: ClassDeclaration) {
    return "anon@" + cl.getStart();
  }

  private metadata: {
    
  }

  constructor(cl: ClassDeclaration) {
    super(cl);
  }

  public get id() {
    return this.getId();
  }

  public getId() {
    return ParsedClass.calculateId(this.internal);
  }
}

// tslint:disable-next-line:max-classes-per-file
class ClassPool extends AbstractPool<ParsedClass> {
  // tslint:disable-next-line:variable-name
  private static pSingleton: ClassPool;

  static get singleton() {
    return this.pSingleton || (this.pSingleton = new ClassPool());
  }

  public fromClassDeclaration(cl: ClassDeclaration) {
    return this.pool.get(ParsedClass.calculateId(cl));
  }
}
