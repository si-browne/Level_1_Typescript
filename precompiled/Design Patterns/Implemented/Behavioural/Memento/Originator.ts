// Originator.ts
import { IMemento } from "./IMemento";

// Not exported: only Originator knows the real memento shape.
interface IMementoWithState extends IMemento {
    getState(): string;
}

class OriginatorMemento implements IMementoWithState {
    private readonly state: string;
    private readonly timestamp: string;

    constructor(state: string) {
        this.state = state;
        this.timestamp = new Date().toISOString();
    }

    public getState(): string {
        return this.state;
    }

    public getDate(): string {
        return this.timestamp;
    }

    public getName(): string {
        // keep it short & informative
        const preview = this.state.length > 12 ? this.state.slice(0, 12) + "…" : this.state;
        return `${this.timestamp} | ${preview}`;
    }
}

export class Originator {
    private state: string;

    constructor(initial: string) {
        this.state = initial;
        console.log(`Originator: initial = "${this.state}"`);
    }

    public doSomething(): void {
        // demo transition (replace with real domain logic)
        const rand = Math.random().toString(36).slice(2, 7);
        this.state = `${this.state}-${rand}`;
        console.log(`Originator: state -> "${this.state}"`);
    }

    public getState(): string {
        return this.state;
    }

    public setState(next: string): void {
        this.state = next;
        console.log(`Originator: state set -> "${this.state}"`);
    }

    public save(): IMemento {
        console.log("Originator: saving snapshot…");
        return new OriginatorMemento(this.state);
    }

    public restore(memento: IMemento): void {
        console.log("Originator: restoring snapshot…");
        // Downcast to the internal wide interface we control.
        const wide = memento as IMementoWithState;
        this.state = wide.getState();
        console.log(`Originator: restored -> "${this.state}"`);
    }
}