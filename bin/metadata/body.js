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
const object_1 = require("./object");
const awesome_metadata_1 = require("awesome-metadata");
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
    __metadataDummyMethod() {
    }
    toJavascript() {
        this.internal = this.body;
        return super.toJavascript();
    }
}
__decorate([
    awesome_metadata_1.DecoratorInjectMetadata("atm:body", { body: { kind: 1 } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetadataBody.prototype, "__metadataDummyMethod", null);
exports.MetadataBody = MetadataBody;
//# sourceMappingURL=body.js.map