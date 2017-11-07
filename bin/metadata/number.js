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
const literal_1 = require("./literal");
const awesome_metadata_1 = require("awesome-metadata");
class MetadataNumber extends literal_1.MetadataLiteral {
    constructor(n) {
        super("" + n);
    }
    __metadataDummyMethod() {
    }
}
__decorate([
    awesome_metadata_1.DecoratorInjectMetadata("atm:body", { n: { kind: 0, primitive: "number" } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetadataNumber.prototype, "__metadataDummyMethod", null);
exports.MetadataNumber = MetadataNumber;
//# sourceMappingURL=number.js.map