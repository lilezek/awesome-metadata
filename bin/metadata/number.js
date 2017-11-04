"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const literal_1 = require("./literal");
class MetadataNumber extends literal_1.MetadataLiteral {
    constructor(n) {
        super("" + n);
    }
}
exports.MetadataNumber = MetadataNumber;
//# sourceMappingURL=number.js.map