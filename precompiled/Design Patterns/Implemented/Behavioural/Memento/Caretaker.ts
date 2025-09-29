// Caretaker.ts
import { IMemento } from "./IMemento";
import { Originator } from "./Originator";

export class Caretaker {
    private history: IMemento[] = [];
    constructor(private readonly originator: Originator) {}
    backup(): void { this.history.push(this.originator.save()); }
    undo(): void {
        const m = this.history.pop();
        if (m) this.originator.restore(m);
    }
    showHistory(): void { this.history.forEach(m => console.log(m.getName())); }
}