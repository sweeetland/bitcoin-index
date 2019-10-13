import app from './app';
import connectDatabase from './database/connect';
import { PORT, NODE_ENV } from './config/env';
import syncDatabaseWithBitcoind from './database/sync';

(async () => {
  try {
    const connection = await connectDatabase();
    console.log('connected to db: ', connection.options.database);

    if (NODE_ENV !== 'test') syncDatabaseWithBitcoind();

    app.listen(PORT, () => {
      console.log(`🚀 server started: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
