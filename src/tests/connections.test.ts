import connectDatabase from '../database/connect';
import bitcoin from '../services/bitcoin';

test('should connect to database', async () => {
  const connection = await connectDatabase();
  expect(connection.isConnected).toBe(true);
});

test('should connect to bitcoind', async () => {
  const blockChainInfo = await bitcoin.getBlockchainInfo();
  expect(blockChainInfo).not.toBe(null);
});
