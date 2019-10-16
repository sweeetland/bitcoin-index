export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = Number(process.env.PORT) || 4000;

export const RPC_NETWORK = process.env.RPC_NETWORK || 'testnet';
export const RPC_USERNAME = process.env.RPC_USERNAME;
export const RPC_PASSWORD = process.env.RPC_PASSWORD;
export const RPC_PORT = Number(process.env.RPC_PORT) || 18332;

export const DB_USER = process.env.DB_USER;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = Number(process.env.DB_PORT) || 5432;

export const ZMQ_URL = process.env.ZMQ_URL || 'tcp://127.0.0.1:3000';

export const BLOCKHEIGHT_INDEX =
  Number(process.env.BLOCKHEIGHT_INDEX) || 1000000;
