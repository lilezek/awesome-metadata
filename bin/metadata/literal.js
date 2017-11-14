"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("./metadata");
class MetadataLiteral extends metadata_1.Metadata {
    constructor(internal) {
        super();
        this.internal = internal;
    }
    toJavascript() {
        return this.internal;
    }
}
exports.MetadataLiteral = MetadataLiteral;
//# sourceMappingURL=literal.js.map