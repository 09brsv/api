import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import router from './routes/routes';
import { errorHandler } from './middlewares/ErrorHandler';

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);
server.use(errorHandler);

export { server };
