// 1) Product interface
interface Transport {
    deliver(): string;
}

// 2) Concrete products
class Truck implements Transport {
    deliver(): string {
        return "Delivering by road in a box truck";
    }
}

class Ship implements Transport {
    deliver(): string {
        return "Delivering by sea in a cargo ship";
    }
}

class Drone implements Transport {
    deliver(): string {
        return "Delivering by air with a quadcopter drone";
    }
}

export type TransportKind = "truck" | "ship" | "drone";

export class TransportFactory {
    static create(kind: TransportKind): Transport {
        switch (kind) {
        case "truck":
            return new Truck();
        case "ship":
            return new Ship();
        case "drone":
            return new Drone();
        default: {
            const _exhaustive: never = kind;
            throw new Error(`Unsupported transport: ${_exhaustive}`);
        }
        }
    }
}