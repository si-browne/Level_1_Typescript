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