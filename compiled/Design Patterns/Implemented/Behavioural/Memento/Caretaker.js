"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caretaker = void 0;
class Caretaker {
    constructor(originator) {
        this.originator = originator;
        this.history = [];
    }
    backup() { this.history.push(this.originator.save()); }
    undo() {
        const m = this.history.pop();
        if (m)
            this.originator.restore(m);
    }
    showHistory() { this.history.forEach(m => console.log(m.getName())); }
}
exports.Caretaker = Caretaker;
//# sourceMappingURL=Caretaker.js.map