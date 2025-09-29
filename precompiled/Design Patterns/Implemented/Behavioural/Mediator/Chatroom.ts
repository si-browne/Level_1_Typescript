import { Participant } from './Participant';
import { IMediator } from './IMediator';

type ChatEvent = "dm" | "broadcast" | "rename" | "leave";

export class ChatRoom implements IMediator {
    private users = new Map<string, Participant>();

    register(user: Participant): void {
        const name = user.getName();
        if (this.users.has(name)) {
        // Auto-uniquify just for demo purposes
        let i = 2;
        let candidate = `${name}${i}`;
        while (this.users.has(candidate)) { i++; candidate = `${name}${i}`; }
        console.log(`[room] name "${name}" is taken, renaming to "${candidate}"`);
        user.setName(candidate);
        }
        this.users.set(user.getName(), user);
        console.log(`[room] ${user.getName()} joined (members: ${this.users.size})`);
    }

    notify(sender: Participant, event: ChatEvent, payload: Record<string, unknown> = {}): void {
        switch (event) {
        case "dm": {
            const to = String(payload.to);
            const msg = String(payload.msg);
            const recipient = this.users.get(to);
            if (!recipient) {
            console.log(`[room] DM failed: "${to}" is not online`);
            return;
            }
            recipient.receive(sender.getName(), msg);
            break;
        }
        case "broadcast": {
            const msg = String(payload.msg);
            for (const u of this.users.values()) {
            if (u !== sender) u.receive(sender.getName(), msg);
            }
            break;
        }
        case "rename": {
            const newName = String(payload.newName);
            if (!newName || this.users.has(newName)) {
            console.log(`[room] rename denied for ${sender.getName()} -> "${newName}"`);
            return;
            }
            this.users.delete(sender.getName());
            sender.setName(newName);
            this.users.set(newName, sender);
            console.log(`[room] rename ok: now "${newName}"`);
            break;
        }
        case "leave": {
            this.users.delete(sender.getName());
            console.log(`[room] ${sender.getName()} left (members: ${this.users.size})`);
            break;
        }
        }
    }
}