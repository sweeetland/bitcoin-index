// app instance is separate from index for testing purposes (supertest)

import 'reflect-metadata';
import * as express from 'express';

import api from './routes/api';

const app = express();

app.use('/api', api);

export { app as default };
