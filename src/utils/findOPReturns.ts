import { StringDecoder } from 'string_decoder'

import { Block } from '../types/bitcoin'
import { Transaction } from '../types/bitcoin'
import { OPReturn } from '../entities/OPReturn'

const decoder = new StringDecoder('utf8')

const decode = (str: string): string =>
  decoder.write(Buffer.from(str, 'hex')).replace(/[^\x20-\x7E]+/g, '')

export const findOPReturns = (
  block: Block,
  opReturns: OPReturn[]
): OPReturn[] => {
  console.log(`searching block #:${block.height}...`)

  block.tx.forEach((tx: Transaction) => {
    tx.vout.forEach(vout => {
      const asm = vout.scriptPubKey.asm

      if (asm.includes('OP_RETURN')) {
        opReturns.push(
          new OPReturn({
            body: decode(vout.scriptPubKey.hex.slice(2)),
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
