"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const identifiable_1 = require("./identifiable");
class Class extends identifiable_1.Identifiable {
    constructor(cl, typechecker) {
        super();
        this.cl = cl;
        this.typechecker = typechecker;
        this.members = [];
        this.implements = [];
        this.traverse(cl);
    }
    getName() {
        return this.name;
    }
    getAbsolutePath() {
        return this.cl.getSourceFile().fileName;
    }
    toJSONString() {
        return `{
      constructor: ${this.name}
    }`;
    }
    toMetadataArray() {
        let body = "";
        this.members.forEach((member) => {
            body += `${member.name}: {type: ${member.type.stringify()}, visibility: ${member.visibility}, optional: ${member.optional}},`;
        });
        return [{
                name: "atm:body",
                value: `{${body}}`,
            }];
    }
    traverse(node) {
    }
}
exports.Class = Class;
//# sourceMappingURL=class.js.map