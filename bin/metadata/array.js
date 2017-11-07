"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("./metadata");
const awesome_metadata_1 = require("awesome-metadata");
class MetadataArray extends metadata_1.Metadata {
    constructor(arr) {
        super();
        this.internal = arr || [];
    }
    __metadataDummyMethod() {
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
__decorate([
    awesome_metadata_1.DecoratorInjectMetadata("atm:body", { internal: { kind: 2, ctor: Array, generics: [{}] }, arr: { kind: 3, and: false, left: { kind: 0, primitive: "undefined" }, right: { kind: 2, ctor: Array, generics: [{}] } } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetadataArray.prototype, "__metadataDummyMethod", null);
exports.MetadataArray = MetadataArray;
//# sourceMappingURL=array.js.map