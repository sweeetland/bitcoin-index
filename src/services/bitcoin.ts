import { createBitcoinRpc } from '@carnesen/bitcoin-rpc'

import { RPC_PASSWORD, RPC_USERNAME, RPC_PORT } from '../config/env'
import { Block, ChainInfo } from '../types/bitcoin'

class Bitcoin {
  rpc: any
  constructor(url: string) {
    this.rpc = createBitcoinRpc(url)
  }
  async getBlockChainInfo(): Promise<ChainInfo> {
    return await this.rpc('getblockchaininfo')
  }
  async getBlock(hash: string, verbosity: number): Promise<Block> {
    return await this.rpc('getblock', [hash, verbosity])
  }
  async getBlockHash(blockheight: number): Promise<string> {
    return await this.rpc('getblockhash', [blockheight])
  }
}

export const bitcoin = new Bitcoin(
  `http://${RPC_USERNAME}:${RPC_PASSWORD}@127.0.0.1:${RPC_PORT}/`
)
