import { Logger, LogLevel } from './Design Patterns/Implemented/Creational/Singleton/Singleton';

// 2) Example execution (console demo)
function main() {
    console.log("\n=== Singleton demo ===");

    // First call creates the instance
    const a = Logger.getInstance(LogLevel.DEBUG);
    a.debug("Bootstrapping…");
    a.info("Service started");

    // Second call returns the *same* instance
    const b = Logger.getInstance();
    console.log("Same instance?", a === b); // true

    // Mutating via one reference affects the other (because it's the same object)
    b.warn("Caution: low disk space");
    a.setLevel(LogLevel.ERROR);
    a.info("This will NOT show because level is ERROR");
    b.error("This WILL show");

    // Attempting to do `new Logger(...)` would be a compile-time error:
    // const bad = new Logger(LogLevel.DEBUG); // ❌ Constructor of class 'Logger' is private
}

main();