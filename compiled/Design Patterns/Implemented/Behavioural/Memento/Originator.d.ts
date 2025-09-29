import { IMemento } from "./IMemento";
export declare class Originator {
    private state;
    constructor(initial: string);
    doSomething(): void;
    getState(): string;
    setState(next: string): void;
    save(): IMemento;
    restore(memento: IMemento): void;
}
//# sourceMappingURL=Originator.d.ts.map