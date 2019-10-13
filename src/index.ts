import app from './app';
import connectDatabase from './database/connect';
import { PORT } from './config/env';

(async () => {
  try {
    const connection = await connectDatabase();
    console.log('connected to db: ', connection.options.database);

    app.listen(PORT, () => {
      console.log(`🚀 server started: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
