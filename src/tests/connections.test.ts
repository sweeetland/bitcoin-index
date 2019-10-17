import db from '../database/'
import bitcoin from '../services/bitcoin'
import { ChainInfo } from '../types/bitcoin'

test('should connect to database', async () => {
  const connection = await db.setup()
  expect(connection.isConnected).toBe(true)
})

test('should connect to bitcoind', async () => {
  const blockChainInfo: ChainInfo = await bitcoin('getblockchaininfo')
  expect(blockChainInfo).not.toBe(null)
})
