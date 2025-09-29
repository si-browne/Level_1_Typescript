import { Originator } from "./Originator";
export declare class Caretaker {
    private readonly originator;
    private history;
    constructor(originator: Originator);
    backup(): void;
    undo(): void;
    showHistory(): void;
}
//# sourceMappingURL=Caretaker.d.ts.map