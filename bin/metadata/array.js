"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("./metadata");
class MetadataArray extends metadata_1.Metadata {
    constructor(arr) {
        super();
        this.internal = arr || [];
    }
    toJavascript() {
        const strings = [];
        for (const v of this.internal) {
            if (v instanceof metadata_1.Metadata) {
                strings.push(v.toJavascript());
            }
            else {
                strings.push(JSON.stringify(v));
            }
        }
        return "[" + strings.join(",") + "]";
    }
    push(t) {
        return this.internal.push(t);
    }
    get(i) {
        return this.internal[i];
    }
    set(i, t) {
        this.internal[i] = t;
    }
}
exports.MetadataArray = MetadataArray;
//# sourceMappingURL=array.js.map