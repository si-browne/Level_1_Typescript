
import { TransportFactory, TransportKind } from './Design Patterns/Implemented/Creational/Factory/TransportFactory';

const kinds: TransportKind[] = ["truck", "ship", "drone"];

for (const k of kinds) {
    const t = TransportFactory.create(k);
    console.log(`[${k}] ->`, t.deliver());
}