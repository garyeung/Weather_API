import { createClient } from "redis";

const reditClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
})

reditClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await reditClient.connect();
})();

export default reditClient;