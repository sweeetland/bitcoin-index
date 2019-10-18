import bitcoin from '../services/bitcoin'
import OPReturn from '../entities/OPReturn'
import findOPReturns from '../utils/findOPReturns'
import { Block, ChainInfo } from '../types/bitcoin'
import db from '../database'
import chunk from '../utils/chunk'

async function* traverseBlockchain() {
  const genesisBlockhash: string = await bitcoin('getblockhash', [0])

  const blockChainInfo: ChainInfo = await bitcoin('getblockchaininfo')

  let blockhash = blockChainInfo.bestblockhash

  while (blockhash !== genesisBlockhash) {
    const block: Block = await bitcoin('getblock', [blockhash, 2])

    blockhash = block.previousblockhash

    yield block
  }
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

      if (numberOfRecords > 10000) {
        const batches = chunk(opReturns, 5000)

        for (const batch of batches) {
          console.log(`saving ${batch.length} records to db...`)

          await OPReturn.insert(batch)
        }

        opReturns = []
      } else if (numberOfRecords > 5000) {
        console.log(`saving ${numberOfRecords} records to db...`)

        await OPReturn.insert(opReturns)

        opReturns = []
      }
    }
  } catch (error) {
    console.error(error)
  }
})()
