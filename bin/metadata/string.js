"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const literal_1 = require("./literal");
class MetadataString extends literal_1.MetadataLiteral {
    constructor(s) {
        // TODO: Does this escapes correctly?
        super(`"${s.replace(`"`, `\"`)}"`);
    }
}
exports.MetadataString = MetadataString;
//# sourceMappingURL=string.js.map