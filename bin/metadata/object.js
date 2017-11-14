"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("./metadata");
class MetadataObject extends metadata_1.Metadata {
    constructor(internal) {
        super();
        this.internal = internal;
    }
    toJavascript() {
        return this.pToJavascript(this.internal);
    }
    pToJavascript(x) {
        const strings = ["{"];
        let first = true;
        for (const k in x) {
            if (!first) {
                strings.push(",");
            }
            first = false;
            strings.push(k);
            strings.push(":");
            if (x.hasOwnProperty(k)) {
                const v = x[k];
                if (v instanceof metadata_1.Metadata) {
                    strings.push(v.toJavascript());
                }
                else {
                    strings.push(JSON.stringify(v));
                }
            }
        }
        strings.push("}");
        return strings.join("");
    }
}
exports.MetadataObject = MetadataObject;
//# sourceMappingURL=object.js.map