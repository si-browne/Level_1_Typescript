// GOOD USE CASES FOR SINGLETON:
// Feature Flags
// Configuration
// Global Variables
// HTTP Client

export enum LogLevel {
    DEBUG = 10,
    INFO = 20,
    WARN = 30,
    ERROR = 40,
}

export class Logger {
    // The single, lazily-created instance
    private static _instance: Logger | null = null;

    // Keep constructor private so nobody can `new Logger()`
    private constructor(private level: LogLevel) {
        console.log(`Logger: created (level=${LogLevel[this.level]})`);
    }

    // The only way to get the instance
    public static getInstance(level: LogLevel = LogLevel.INFO): Logger {
        if (!Logger._instance) {
            Logger._instance = new Logger(level); // create on first ask
        }
        return Logger._instance;
    }

    public setLevel(level: LogLevel): void {
        this.level = level;
        console.log(`Logger: level -> ${LogLevel[this.level]}`);
    }

    public log(level: LogLevel, msg: string): void {
        if (level >= this.level) {
            const stamp = new Date().toISOString();
            console.log(`[${stamp}] ${LogLevel[level]}: ${msg}`);
        }
    }   

    public debug(msg: string) { this.log(LogLevel.DEBUG, msg); }
    public info(msg: string)  { this.log(LogLevel.INFO, msg); }
    public warn(msg: string)  { this.log(LogLevel.WARN, msg); }
    public error(msg: string) { this.log(LogLevel.ERROR, msg); }
}



/* NOTES

class LogMessage {

    private logMessage: string;

    constructor(message: string) {
        this.logMessage = message;
    }

    logMessageToConsole() {

    }
}

    a true singleton will only have the values in it to begin with sealed from the start
    a static object - pretty useless actually

class Logger {

    private static _instance: Logger = new Logger();

    public static instance = Logger._instance;

    public timestamp: Number;

    private constructor() {

        this.timestamp = Date.now();
    }

}

console.log("my singleton is: " + Logger.instance.timestamp);
*/