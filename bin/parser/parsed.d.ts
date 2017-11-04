export declare abstract class Parsed<T> {
    protected internal: T;
    constructor(toParse: T);
    getInternal(): T;
}
