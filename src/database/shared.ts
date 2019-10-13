import { Block } from '../types/bitcoin';
import { Transaction } from '../types/bitcoin';

export const getOPReturnsFromBlock = (
  block: Block,
  opReturns: any[]
): any[] => {
  console.log(`searching block #:${block.height}...`);
  block.tx.forEach((tx: Transaction) => {
    tx.vout.forEach(vout => {
      const asm = vout.scriptPubKey.asm;
      if (asm.includes('OP_RETURN')) {
        opReturns.push({
          body: asm,
          txhash: tx.hash,
          blockhash: block.hash,
          blockheight: block.height
        });
      }
    });
  });

  return opReturns;
};
