import { Participant } from './Participant';

type ChatEvent = "dm" | "broadcast" | "rename" | "leave";

export interface IMediator {
    register(user: Participant): void;
    notify(sender: Participant, event: ChatEvent, payload?: Record<string, unknown>): void;
}