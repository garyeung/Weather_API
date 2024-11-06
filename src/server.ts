import express from 'express';
import queringWeather from './qeuringWeather';
import { config } from 'dotenv';
import { limiter } from './rateLimit';

config();
const port = process.env.PORT || 3000;
const server = express();
server.use(express.json());

server.use("/weather",limiter);
server.get("/weather", queringWeather);


server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})