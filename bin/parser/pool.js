"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractPool {
    constructor() {
        this.pool = new Map();
    }
    add(t) {
        this.pool.set(t.id, t);
        return this;
    }
    find(s) {
        return this.pool.get(s);
    }
}
exports.AbstractPool = AbstractPool;
//# sourceMappingURL=pool.js.map