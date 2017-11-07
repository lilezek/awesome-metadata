import { ClassDeclaration } from "ts-simple-ast";
import { Parsed } from "./parsed";
import { AbstractPool } from "./pool";
/**
 * Class that represent a parsed ClassDeclaration and contains
 * all the needed data to generate metadata.
 */
export declare class ParsedClass extends Parsed<ClassDeclaration> {
    __metadataDummyMethod(): void;
    static calculateId(cl: ClassDeclaration): string;
    static calculateAnonClassName(cl: ClassDeclaration): string;
    private metadataBody;
    protected constructor(cl: ClassDeclaration);
    readonly id: string;
    getId(): string;
    isInjected(): boolean;
    private traverse(node);
}
export declare class ClassPool extends AbstractPool<ParsedClass> {
    __metadataDummyMethod(): void;
    private static pSingleton;
    static readonly singleton: ClassPool;
    /**
     * Parses a class if it is not already parsed. If it is already parsed, it just returns the parsed copy class.
     * @param cl Class declaration to parse.
     */
    parseClass(cl: ClassDeclaration): ParsedClass;
    fromClassDeclaration(cl: ClassDeclaration): ParsedClass | undefined;
}
