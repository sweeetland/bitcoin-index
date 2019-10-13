import { Connection } from 'typeorm';

import { OPReturn } from '../../entities/OPReturn';
import connectDatabase from '../../database/connect';

let connection: Connection;

export const inputData = {
  body: 'OP_RETURN testtestest',
  txhash: 'txhashtxhashtxhash',
  blockhash: 'blockhashblockhashblockhash',
  blockheight: 1
};

export const setupDatabase = async () => {
  connection = await connectDatabase();
  console.log('connected db: ', connection.options.database);

  await OPReturn.clear();

  await OPReturn.insert(inputData);
};

export const shutdownDatabase = async () => await connection.close();
