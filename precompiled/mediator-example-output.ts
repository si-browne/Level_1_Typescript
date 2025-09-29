
import { ChatRoom } from './Design Patterns/Implemented/Behavioural/Mediator/Chatroom';
import { Participant } from './Design Patterns/Implemented/Behavioural/Mediator/Participant';


// --- Demo / console execution ---
function main() {
    console.log("\n=== Mediator pattern demo: ChatRoom ===");
    const room = new ChatRoom();

    const alice = new Participant("alice", room);
    const bob   = new Participant("bob", room);
    const cara  = new Participant("cara", room);

    alice.sendAll("Hi everyone 👋");
    bob.sendDM("alice", "Hey Alice! Want to pair later?");
    cara.sendDM("dan", "Are you joining?"); // DM fails (not online)

    // Rename via mediator and continue chatting without direct references
    alice.rename("ally");
    bob.sendDM("ally", "Nice new handle!");
    cara.sendAll("Standup in 10 minutes.");

    // Leave and try messaging again
    bob.leave();
    alice.sendDM("bob", "Ping when you're back?"); // will fail
    cara.sendAll("See you at standup.");

    console.log("=== End ===\n");
}

main();