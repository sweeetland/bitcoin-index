import bitcoin from '../services/bitcoin';
import OPReturn from '../entities/OPReturn';
import { getOPReturnsFromBlock } from '../helpers/index';
import { Block } from '../types/bitcoin';
import db from '../database';

(async () => {
  try {
    const connection = await db.connect();

    await OPReturn.clear();

    console.log('seeding database: ', connection.options.database);

    const blockChainInfo = await bitcoin('getblockchaininfo');

    await searchBlock(blockChainInfo.bestblockhash);
  } catch (error) {
    console.error(error);
  }
})();

async function searchBlock(
  blockHash: string,
  opReturns: OPReturn[] = []
): Promise<void> {
  try {
    const block: Block = await bitcoin('getblock', [blockHash, 2]);

    if (block.height === 0) {
      await OPReturn.insert(opReturns);
      return;
    }

    if (opReturns.length > 1000) {
      await OPReturn.insert(opReturns);
      return; // <-- only taking first chunk of data because i've had to prune local blockchain
    }

    opReturns = getOPReturnsFromBlock(block, opReturns);

    searchBlock(block.previousblockhash, opReturns);
  } catch (error) {
    console.error(error);
  }
}
