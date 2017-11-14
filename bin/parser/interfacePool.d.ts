import { InterfaceDeclaration } from "ts-simple-ast";
import { Parsed } from "./parsed";
import { AbstractPool } from "./pool";
/**
 * Class that represent a parsed InterfaceDeclaration and contains
 * all the needed data to generate metadata.
 */
export declare class ParsedInterface extends Parsed<InterfaceDeclaration> {
    static calculateId(iface: InterfaceDeclaration): string;
    static calculateAnonInterfaceName(iface: InterfaceDeclaration): string;
    private metadataBody;
    protected constructor(iface: InterfaceDeclaration);
    readonly id: string;
    getId(): string;
    isInjected(): boolean;
    private traverse(node);
}
export declare class InterfacePool extends AbstractPool<ParsedInterface> {
    private static pSingleton;
    static readonly singleton: InterfacePool;
    /**
     * Parses an interface if it is not already parsed. If it is already parsed, it just returns the parsed copy interface.
     * @param iface Interface declaration to parse.
     */
    parseInterface(iface: InterfaceDeclaration): ParsedInterface;
    fromInterfaceDeclaration(iface: InterfaceDeclaration): ParsedInterface | undefined;
}
