// This file should only be ran as a script in package.json

import connectDb from './connect';
import bitcoin from '../services/bitcoin';
import { OPReturn } from '../entities/OPReturn';
import { getOPReturnsFromBlock } from './shared';
import { Block } from '../types/bitcoin';

(async () => {
  try {
    const connection = await connectDb();

    await OPReturn.clear();

    console.log('seeding database: ', connection.options.database);

    const blockChainInfo = await bitcoin.getBlockchainInfo();

    await copyOPReturnsToDB(blockChainInfo.bestblockhash);
  } catch (error) {
    console.error(error);
  }
})();

async function copyOPReturnsToDB(
  blockHash: string,
  opReturns = []
): Promise<void> {
  try {
    const block: Block = await bitcoin.getBlock(blockHash, 2);

    if (block.height === 0) {
      await OPReturn.insert(opReturns);
      return;
    }

    if (Buffer.from(opReturns).byteLength > 100) {
      await OPReturn.insert(opReturns);
      return; // <-- only taking first chunk of data because i've had to prune local blockchain
    }

    opReturns = getOPReturnsFromBlock(block, opReturns);

    copyOPReturnsToDB(block.previousblockhash, opReturns);
  } catch (error) {
    console.error(error);
  }
}
