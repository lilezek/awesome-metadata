import { Identifiable } from "./identifiable";
export declare class AbstractPool<T extends Identifiable> {
    protected pool: Map<string, T>;
    add(t: T): this;
    find(s: string): T;
}
