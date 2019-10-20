import { bitcoin } from '../services/bitcoin'
import { OPReturn } from '../entities/OPReturn'
import { findOPReturns } from '../utils/findOPReturns'
import { db } from '../database'

async function* traverseBlockchain() {
  const genesisBlockhash = await bitcoin.getBlockHash(0)

  const blockChainInfo = await bitcoin.getBlockChainInfo()

  let blockhash = blockChainInfo.bestblockhash

  while (blockhash !== genesisBlockhash) {
    const block = await bitcoin.getBlock(blockhash, 2)

    blockhash = block.previousblockhash

    yield block
  }
  return
}

;(async () => {
  try {
    console.log('seeding database...')

    await db.setup()

    await OPReturn.clear()

    let opReturns: OPReturn[] = []

    for await (const block of traverseBlockchain()) {
      opReturns = findOPReturns(block, opReturns)

      const numberOfRecords = opReturns.length

      if (numberOfRecords > 5000) {
        console.log(`saving ${numberOfRecords} records to db...`)

        await OPReturn.insert(opReturns)

        opReturns = []
      }
    }

    await OPReturn.insert(opReturns)

    console.log('seeding finished. 🎈')
  } catch (error) {
    console.error(error)
  }
})()
