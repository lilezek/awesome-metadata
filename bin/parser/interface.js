"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Interface {
    constructor(inode, typechecker) {
        this.inode = inode;
        this.typechecker = typechecker;
        this.body = {};
        this.traverse(inode);
    }
    stringify() {
        let members = "";
        for (const k in this.body) {
            members += k + ":" + this.body.stringifg();
        }
        return "{" + members + "}";
    }
    traverse(node) {
        // BUG: infinite recursive loop when interfaces makes self-references.
        return;
        // if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
        //   const inode = node as ts.InterfaceDeclaration;
        //   inode.members.forEach((member) => {
        //     if (member.kind === ts.SyntaxKind.PropertySignature) {
        //       console.error(node.getText());
        //       const sign = member as ts.PropertySignature;
        //       this.body[sign.name.getText()] = new Type(sign.type || {kind: ts.SyntaxKind.AnyKeyword} as ts.KeywordTypeNode, this.typechecker);
        //     } else {
        //       console.error(member.kind);
        //     }
        //   });
        // }
    }
}
exports.Interface = Interface;
//# sourceMappingURL=interface.js.map