"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Originator = void 0;
class OriginatorMemento {
    constructor(state) {
        this.state = state;
        this.timestamp = new Date().toISOString();
    }
    getState() {
        return this.state;
    }
    getDate() {
        return this.timestamp;
    }
    getName() {
        // keep it short & informative
        const preview = this.state.length > 12 ? this.state.slice(0, 12) + "…" : this.state;
        return `${this.timestamp} | ${preview}`;
    }
}
class Originator {
    constructor(initial) {
        this.state = initial;
        console.log(`Originator: initial = "${this.state}"`);
    }
    doSomething() {
        // demo transition (replace with real domain logic)
        const rand = Math.random().toString(36).slice(2, 7);
        this.state = `${this.state}-${rand}`;
        console.log(`Originator: state -> "${this.state}"`);
    }
    getState() {
        return this.state;
    }
    setState(next) {
        this.state = next;
        console.log(`Originator: state set -> "${this.state}"`);
    }
    save() {
        console.log("Originator: saving snapshot…");
        return new OriginatorMemento(this.state);
    }
    restore(memento) {
        console.log("Originator: restoring snapshot…");
        // Downcast to the internal wide interface we control.
        const wide = memento;
        this.state = wide.getState();
        console.log(`Originator: restored -> "${this.state}"`);
    }
}
exports.Originator = Originator;
//# sourceMappingURL=Originator.js.map