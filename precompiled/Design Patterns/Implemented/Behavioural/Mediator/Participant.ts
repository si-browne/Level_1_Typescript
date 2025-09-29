
import { IMediator } from './IMediator'


// --- Colleague (participant) ---
export class Participant {
    private name: string;

    constructor(name: string, private mediator: IMediator) {
        this.name = name;
        this.mediator.register(this);
    }

    public getName(): string { return this.name; }
    public setName(n: string): void { this.name = n; }

    // Actions the user can take (they all go through the mediator)
    public sendDM(to: string, msg: string): void {
        console.log(`[${this.name}] -> @${to}: ${msg}`);
        this.mediator.notify(this, "dm", { to, msg });
    }

    public sendAll(msg: string): void {
        console.log(`[${this.name}] -> all: ${msg}`);
        this.mediator.notify(this, "broadcast", { msg });
    }

    public rename(newName: string): void {
        console.log(`[${this.name}] requests rename -> ${newName}`);
        this.mediator.notify(this, "rename", { newName });
    }

    public leave(): void {
        console.log(`[${this.name}] leaves the room`);
        this.mediator.notify(this, "leave");
    }

    // Messages the mediator delivers
    public receive(from: string, msg: string): void {
        console.log(`[${this.name}] <- ${from}: ${msg}`);
    }
}
