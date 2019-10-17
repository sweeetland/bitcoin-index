import { Block } from '../types/bitcoin'
import { Transaction } from '../types/bitcoin'
import OPReturn from '../entities/OPReturn'

const findOPReturns = (block: Block, opReturns: OPReturn[]): OPReturn[] => {
  console.log(`searching block #:${block.height}...`)
  block.tx.forEach((tx: Transaction) => {
    tx.vout.forEach(vout => {
      const asm = vout.scriptPubKey.asm
      if (asm.includes('OP_RETURN')) {
        opReturns.push(
          new OPReturn({
            body: vout.scriptPubKey.hex,
            txhash: tx.hash,
            blockhash: block.hash,
            blockheight: block.height
          })
        )
      }
    })
  })

  return opReturns
}

export { findOPReturns as default }