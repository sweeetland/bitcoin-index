import * as Bitcoin from 'bitcoin-core';

import { ClientConstructorOption } from '../types/bitcoin';
import {
  RPC_NETWORK,
  RPC_PASSWORD,
  RPC_USERNAME,
  RPC_PORT
} from '../config/env';

const bitcoin = new Bitcoin({
  network: RPC_NETWORK,
  username: RPC_USERNAME,
  password: RPC_PASSWORD,
  port: RPC_PORT
} as ClientConstructorOption);

export { bitcoin as default };
