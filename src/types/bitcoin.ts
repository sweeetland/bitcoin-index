// types copied from this PR: https://github.com/ruimarinho/bitcoin-core/pull/65

export interface ClientConstructorOption {
  agentOptions?: any;
  headers?: boolean;
  host?: string;
  logger?: Function;
  network?: 'mainnet' | 'regtest' | 'testnet';
  password?: string;
  port?: string | number;
  ssl?: any;
  timeout?: number;
  username?: string;
  version?: string;
}

export type ChainInfo = {
  chain: string;
  blocks: number;
  headers: number;
  bestblockchash: number;
  difficulty: number;
  mediantime: number;
  verificationprogress: number;
  initialblockdownload: boolean;
  chainwork: string;
  size_on_disk: number;
  pruned: boolean;
  pruneheight: number;
  automatic_pruning: boolean;
  prune_target_size: number;
  softforks: { id: string; version: number; reject: { status: boolean } }[];
  bip9_softforks: {
    [key: string]: {
      status: 'defined' | 'started' | 'locked_in' | 'active' | 'failed';
    };
  }[];
  warnings: string;
};

export type Block = {
  hash: string;
  confirmations: number;
  strippedsize: number;
  size: number;
  weight: number;
  height: number;
  version: number;
  verxionHex: string;
  merkleroot: string;
  tx: Transaction[];
  hex: string;
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  previousblockhash: string;
  nextblockchash: string;
};

export type Transaction = {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  locktime: number;
  vin: TxIn[];
  vout: TxOut[];
  blockhash?: string;
};

type TxIn = {
  txid: string;
  vout: number;
  scriptSig: {
    asm: string;
    hex: string;
  };
  sequence: number;
};

export type TxOut = {
  value: number;
  n: number;
  scriptPubKey: {
    asm: string;
    hex: string;
    reqSigs: number;
    type: scriptPubkeyType;
    addresses: string[];
  };
};

type scriptPubkeyType =
  | 'pubkey'
  | 'pubkeyhash'
  | 'scripthash'
  | 'witnesspubkeyhash'
  | 'witnessscripthash'
  | 'witnesscommitment'
  | 'nonstandard';
