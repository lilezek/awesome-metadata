"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
var EVisibility;
(function (EVisibility) {
    EVisibility[EVisibility["NONE"] = 0] = "NONE";
    EVisibility[EVisibility["PUBLIC"] = 1] = "PUBLIC";
    EVisibility[EVisibility["PRIVATE"] = 2] = "PRIVATE";
    EVisibility[EVisibility["PROTECTED"] = 3] = "PROTECTED";
})(EVisibility = exports.EVisibility || (exports.EVisibility = {}));
/**
 * In order to use this metadata, just define the body member.
 */
class MetadataBody extends object_1.MetadataObject {
    constructor() {
        super({});
        this.body = {};
    }
    toJavascript() {
        this.internal = this.body;
        return super.toJavascript();
    }
}
exports.MetadataBody = MetadataBody;
//# sourceMappingURL=body.js.map