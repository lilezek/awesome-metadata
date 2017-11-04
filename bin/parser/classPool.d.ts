import { ClassDeclaration } from "ts-simple-ast";
import { Parsed } from "./parsed";
import { AbstractPool } from "./pool";
/**
 * Class that represent a parsed ClassDeclaration and contains
 * all the needed data to generate metadata.
 */
export declare class ParsedClass extends Parsed<ClassDeclaration> {
    static calculateId(cl: ClassDeclaration): string;
    static calculateAnonClassName(cl: ClassDeclaration): string;
    private metadataBody;
    constructor(cl: ClassDeclaration);
    readonly id: string;
    getId(): string;
    isInjected(): boolean;
    private traverse(node);
}
export declare class ClassPool extends AbstractPool<ParsedClass> {
    private static pSingleton;
    static readonly singleton: ClassPool;
    fromClassDeclaration(cl: ClassDeclaration): ParsedClass | undefined;
}
