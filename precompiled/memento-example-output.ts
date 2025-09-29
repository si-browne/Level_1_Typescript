import type { IMemento } from './Design Patterns/Implemented/Behavioural/Memento/IMemento';
import { Originator } from './Design Patterns/Implemented/Behavioural/Memento/Originator';
import { Caretaker } from './Design Patterns/Implemented/Behavioural/Memento/Caretaker';

// --- Your existing console test for a plain IMemento ---
const m: IMemento = {
    getName: () => "State #1",
    getDate: () => new Date().toISOString(),
};
const test = m.getName();
console.log("Plain IMemento test ->", test);

// --- Helpers for readable console output ---
const dash = (label: string) => console.log(`\n==== ${label} ====`);

// --- Use Case 1: Basic time-travel with automatic snapshots ---
dash("Use Case 1: Basic time-travel (save, mutate, undo)");
const originator = new Originator("v1.0");
const caretaker = new Caretaker(originator);

// Save initial state
caretaker.backup();

// Simulate a few domain operations with snapshots
originator.doSomething();
caretaker.backup();
originator.doSomething();
caretaker.backup();
originator.doSomething();
caretaker.backup();

console.log("Current state:", originator.getState());
console.log("History:");
caretaker.showHistory();

// Undo last two mutations
console.log("\nUndo #1");
caretaker.undo();
console.log("State after undo #1:", originator.getState());

console.log("\nUndo #2");
caretaker.undo();
console.log("State after undo #2:", originator.getState());

// --- Use Case 2: Manual set + snapshot, then revert ---
dash("Use Case 2: Manual set + snapshot, revert to previous");
originator.setState("release-candidate");
caretaker.backup();
console.log("State after manual set:", originator.getState());

console.log("Undo to previous snapshot");
caretaker.undo();
console.log("State after revert:", originator.getState());

// --- Use Case 3: Restoring a specific earlier snapshot ---
// For this, we’ll create a few more snapshots and keep one aside.
dash("Use Case 3: Restore a specific earlier snapshot");
originator.setState("alpha");
caretaker.backup();

originator.setState("beta");
const pin: IMemento = originator.save(); // keep a pinned snapshot without pushing to history
console.log("Pinned snapshot name:", pin.getName());

// Continue evolving and saving via caretaker
originator.setState("beta.1");
caretaker.backup();

originator.setState("beta.2");
caretaker.backup();

console.log("State before targeted restore:", originator.getState());

// Now restore to the pinned snapshot explicitly
console.log("Restoring to pinned snapshot...");
originator.restore(pin);
console.log("State after targeted restore:", originator.getState());

// --- Use Case 4 (Optional): Demonstrate why only Originator-created mementos should be used ---
dash("Use Case 4 (Optional): Foreign memento misuse (caught)");
const foreignMemento: IMemento = {
    getName: () => "Totally-not-safe",
    getDate: () => new Date().toISOString(),
    // Note: This object lacks the hidden getState() contract expected by Originator.restore()
};
try {
    console.log("Attempting to restore from a foreign memento...");
    // ts-expect-error runtime demonstration: this will throw at runtime
    originator.restore(foreignMemento);
} catch (err) {
    console.log("Caught error (as expected):", (err as Error)?.message ?? err);
}

// Final history view (whatever remains in caretaker)
dash("Final History");
caretaker.showHistory();

console.log("\nDone.");