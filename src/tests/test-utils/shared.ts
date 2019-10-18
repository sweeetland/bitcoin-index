import { Connection } from 'typeorm'

import OPReturn from '../../entities/OPReturn'
import db from '../../database'

let connection: Connection

export const inputData = {
  body: 'testestestestest',
  txhash: 'txhashtxhashtxhash',
  blockhash: 'blockhashblockhashblockhash',
  blockheight: 1
}

export const setupDatabase = async () => {
  connection = await db.setup()

  await OPReturn.clear()

  await OPReturn.insert(inputData)
}

export const shutdownDatabase = async () => await connection.close()
