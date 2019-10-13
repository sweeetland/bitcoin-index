import * as zmq from 'zeromq';

import bitcoin from '../services/bitcoin';
import { getOPReturnsFromBlock } from './shared';
import { Block, Transaction } from '../types/bitcoin';
import { OPReturn } from '../entities/OPReturn';
import { ZMQ_URL } from '../config/env';

const syncDatabaseWithBitcoind = async (): Promise<void> => {
  try {
    const socket = zmq.socket('sub');
    const address = ZMQ_URL;

    socket.connect(address);

    socket.subscribe('hash');

    console.log('listening for updates from bitcoind...');

    socket.on('message', async (topic, message) => {
      const messageType = topic.toString();
      const hash = message.toString('hex');

      if (messageType === 'hashblock') {
        console.log('message received: new block');
        const block: Block = await bitcoin('getblock', [hash, 2]);

        let opReturns: OPReturn[] = [];
        opReturns = getOPReturnsFromBlock(block, opReturns);

        await OPReturn.save(opReturns);
      }

      if (messageType === 'hashtx') {
        // getrawtransaction will only work for transactions that your wallet is indexing
        // by default it only indexes transactions that affect your wallet or in the mempool of your node
        // occasionally this call fails gracefully but you will see errors in console
        const tx: Transaction = await bitcoin('getrawtransaction', [
          hash,
          true
        ]);

        // tx.blockhash is only available with bitcoind -txindex enabled
        // this requires the full blockchain to be saved on disk (not in prune mode)
        const blockhash = tx.blockhash;
        let blockheight: number;
        if (blockhash) {
          const block: Block = await bitcoin('getblock', [hash, 2]);
          blockheight = block.height;
        }

        tx.vout.forEach(vout => {
          const asm = vout.scriptPubKey.asm;
          if (asm.includes('OP_RETURN')) {
            console.log('message received: new tx with opreturn');
            OPReturn.save(
              new OPReturn({
                body: asm,
                txhash: tx.hash,
                blockhash,
                blockheight
              })
            );
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export { syncDatabaseWithBitcoind as default };
