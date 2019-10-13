import { createBitcoinRpc } from '@carnesen/bitcoin-rpc';

import { RPC_PASSWORD, RPC_USERNAME, RPC_PORT } from '../config/env';

const bitcoin = createBitcoinRpc(
  `http://${RPC_USERNAME}:${RPC_PASSWORD}@127.0.0.1:${RPC_PORT}/`
);

export { bitcoin as default };
