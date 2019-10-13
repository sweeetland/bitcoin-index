import { createConnection } from 'typeorm';
import { DB_PORT, DB_USER, DB_NAME, NODE_ENV } from '../config/env';

const connectDatabase = async () =>
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: DB_PORT,
    username: DB_USER,
    password: '',
    database: DB_NAME,
    synchronize: true,
    logging: NODE_ENV === 'development',
    dropSchema: NODE_ENV === 'test',
    entities: ['src/entities/*.*']
  });

export { connectDatabase as default };
