import app from './app';
import db from './database';
import { PORT, NODE_ENV } from './config/env';

(async () => {
  try {
    const connection = await db.connect();
    console.log('connected to db: ', connection.options.database);

    if (NODE_ENV !== 'test') db.syncWithBitcoind();

    app.listen(PORT, () => {
      console.log(`🚀 server started: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
