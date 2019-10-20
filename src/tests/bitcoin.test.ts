import { bitcoin } from '../services/bitcoin'
import { ChainInfo } from '../types/bitcoin'

let blockChainInfo: ChainInfo

beforeAll(async () => {
  blockChainInfo = await bitcoin('getblockchaininfo')
})

test('should connect to bitcoind', async () => {
  expect(blockChainInfo).not.toBe(null)
})

test('initialblockdownload should be false', async () => {
  expect(blockChainInfo.initialblockdownload).toBe(false)
})

test('pruned should be false', async () => {
  expect(blockChainInfo.pruned).toBe(false)
})
